/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import molecule from '@dtinsight/molecule/esm';
import type { IStatusBarItem } from '@dtinsight/molecule/esm/model';
import { FileTypes, TreeNodeModel, Float } from '@dtinsight/molecule/esm/model';
import { EggIcon, JarIcon, OtherIcon, PythonIcon, ZipIcon } from '@/components/icon';
import api from '@/api';
import functionManagerService from '@/services/functionManagerService';
import resourceManagerTree from '@/services/resourceManagerService';
import {
	CATELOGUE_TYPE,
	TASK_RUN_ID,
	TASK_STOP_ID,
	TASK_TYPE_ENUM,
	RESOURCE_TYPE,
} from '@/constant';
import type { CatalogueDataProps } from '@/interface';
import { getTenantId, getUserId } from '.';
import { message } from 'antd';

export function resetEditorGroup() {
	molecule.editor.updateActions([
		{ id: TASK_RUN_ID, disabled: true },
		{ id: TASK_STOP_ID, disabled: true },
	]);
}

export function updateStatusBarLanguage(item: IStatusBarItem) {
	const states = molecule.statusBar.getState();
	const languageStatus = states.rightItems.find((i) => i.id === 'language');
	if (languageStatus) {
		molecule.statusBar.update(item);
	} else {
		molecule.statusBar.add(item, Float.right);
	}
}

export function fileIcon(
	type: TASK_TYPE_ENUM | RESOURCE_TYPE,
	source: CATELOGUE_TYPE,
): string | JSX.Element {
	switch (source) {
		case 'task': {
			const iconLists: any = {
				[TASK_TYPE_ENUM.SQL]: 'icon_sparkSQL iconfont',
				[TASK_TYPE_ENUM.SYNC]: 'sync',
			};
			return iconLists[type as TASK_TYPE_ENUM] || 'file';
		}
		case 'resource': {
			const iconLists: any = {
				[RESOURCE_TYPE.OTHER]: <OtherIcon />,
				[RESOURCE_TYPE.JAR]: <JarIcon />,
				[RESOURCE_TYPE.PY]: <PythonIcon />,
				[RESOURCE_TYPE.ZIP]: <ZipIcon />,
				[RESOURCE_TYPE.EGG]: <EggIcon />,
			};
			return iconLists[type as RESOURCE_TYPE] || 'file';
		}
		case 'function':
		default:
			return 'file';
	}
}

/**
 * 异步加载树结点
 * @param node
 * @returns
 */
export async function getCatalogueViaNode(
	node: Partial<CatalogueDataProps>,
): Promise<CatalogueDataProps | undefined> {
	if (!node) throw new Error('[getCatalogueViaNode]: failed to get catelogue');
	const res = await api.getOfflineCatalogue({
		isGetFile: true,
		nodePid: node.id,
		catalogueType: node.catalogueType,
		userId: getUserId(),
		tenantId: getTenantId(),
	});
	if (res.code === 1) {
		return res.data;
	}
	return undefined;
}

/**
 * Transform the catalogue data from back-end to the tree structure
 * @param catalogue
 * @param source
 * @returns
 */
export function transformCatalogueToTree(
	catalogue: CatalogueDataProps | undefined,
	source: CATELOGUE_TYPE,
	isRootFolder: boolean = false,
): TreeNodeModel | undefined {
	const folderType = ['folder', 'catalogue'];
	if (!catalogue) return;
	switch (source) {
		case CATELOGUE_TYPE.TASK:
		case CATELOGUE_TYPE.RESOURCE: {
			const children = (catalogue.children || [])
				.map((child) => transformCatalogueToTree(child, source))
				.filter(Boolean) as TreeNodeModel[];

			const catalogueType = folderType.includes(catalogue.type)
				? FileTypes.Folder
				: FileTypes.File;

			const fileType = isRootFolder ? FileTypes.RootFolder : catalogueType;

			return new TreeNodeModel({
				id: catalogue.id,
				name: catalogue.name,
				location: catalogue.name,
				fileType,
				icon: fileIcon(
					source === CATELOGUE_TYPE.TASK ? catalogue.taskType : catalogue.resourceType,
					source,
				),
				isLeaf: fileType === FileTypes.File,
				data: catalogue,
				children,
			});
		}
		case CATELOGUE_TYPE.FUNCTION: {
			const { id, type, name } = catalogue;
			const children = (catalogue.children || [])
				// there is a system function in the children node of root folder, we'd better to filter it
				.filter((child) => !isRootFolder || child.name !== '系统函数')
				.map((child) => transformCatalogueToTree(child, source))
				.filter(Boolean) as TreeNodeModel[];

			const catalogueType = folderType.includes(type) ? FileTypes.Folder : FileTypes.File;

			const fileType = isRootFolder ? FileTypes.RootFolder : catalogueType;

			// Because of the same id in different levels, so we should set another uniq id for each tree node
			return new TreeNodeModel({
				id: `${id}-${folderType.includes(type) ? 'folder' : 'file'}`,
				name,
				location: name,
				fileType,
				isLeaf: fileType === FileTypes.File,
				data: catalogue,
				icon: fileIcon(catalogue.taskType, source),
				children,
			});
		}

		default:
			return undefined;
	}
}

/**
 * Get the children data in node and save it into Service
 * @param node
 * @param source
 */
export async function loadTreeNode(
	node: CatalogueDataProps,
	source: CATELOGUE_TYPE,
): Promise<TreeNodeModel | null> {
	const data = await getCatalogueViaNode(node);
	const nextNode = transformCatalogueToTree(data, source);
	if (!nextNode) {
		message.error('load tree node failed');
		return null;
	}
	switch (source) {
		case 'task':
			molecule.folderTree.update(nextNode);
			break;
		case 'resource':
			resourceManagerTree.update(nextNode);
			break;
		case 'function':
			functionManagerService.update(nextNode);
			break;
		default:
			break;
	}
	return nextNode;
}
