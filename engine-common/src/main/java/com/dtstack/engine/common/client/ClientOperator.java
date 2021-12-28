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

package com.dtstack.engine.common.client;

import com.dtstack.engine.pluginapi.client.IClient;
import com.dtstack.engine.pluginapi.pojo.CheckResult;
import com.dtstack.engine.pluginapi.pojo.ClusterResource;
import com.dtstack.engine.pluginapi.pojo.ComponentTestResult;
import com.dtstack.engine.pluginapi.pojo.DtScriptAgentLabel;
import com.dtstack.engine.pluginapi.JobClient;
import com.dtstack.engine.pluginapi.JobIdentifier;
import com.dtstack.engine.pluginapi.constrant.ConfigConstant;
import com.dtstack.engine.pluginapi.enums.RdosTaskStatus;
import com.dtstack.engine.common.exception.ClientAccessException;
import com.dtstack.engine.pluginapi.exception.ExceptionUtil;
import com.dtstack.engine.pluginapi.exception.RdosDefineException;
import com.dtstack.engine.pluginapi.pojo.JobResult;
import com.dtstack.engine.pluginapi.pojo.JudgeResult;
import com.google.common.base.Strings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import java.util.Properties;

/**
 * Reason:
 * Date: 2018/1/11
 * Company: www.dtstack.com
 *
 * @author xuchao
 */
public class ClientOperator {

    private static final Logger LOGGER = LoggerFactory.getLogger(ClientOperator.class);

    private static ClientCache clientCache;

    private static ClientOperator singleton;

    private ClientOperator() {
    }

    public static ClientOperator getInstance(String pluginPath) {
        if (singleton == null) {
            synchronized (ClientOperator.class) {
                if (singleton == null) {
                    clientCache = ClientCache.getInstance(pluginPath);
                    LOGGER.info("init client operator plugin path {}",pluginPath);
                    singleton = new ClientOperator();
                }
            }
        }
        return singleton;
    }

    public RdosTaskStatus getJobStatus(String engineType, String pluginInfo, JobIdentifier jobIdentifier) {
        checkoutOperator(engineType, pluginInfo, jobIdentifier);

        String jobId = jobIdentifier.getEngineJobId();
        if (Strings.isNullOrEmpty(jobId)) {
            throw new RdosDefineException("can't get job of jobId is empty or null!");
        }

        try {
            IClient client = clientCache.getClient(engineType, pluginInfo);
            Object result = client.getJobStatus(jobIdentifier);

            if (result == null) {
                return null;
            }

            return (RdosTaskStatus) result;
        } catch (Exception e) {
            LOGGER.error("getStatus happens error：{}",jobId, e);
            return RdosTaskStatus.NOTFOUND;
        }
    }


    public String getEngineLog(String engineType, String pluginInfo, JobIdentifier jobIdentifier) {
        checkoutOperator(engineType, pluginInfo, jobIdentifier);

        String logInfo;
        try {
            IClient client = clientCache.getClient(engineType, pluginInfo);
            logInfo = client.getJobLog(jobIdentifier);
        } catch (Exception e) {
            logInfo = ExceptionUtil.getErrorMessage(e);
        }

        return logInfo;
    }

    public String getCheckpoints(String engineType, String pluginInfo, JobIdentifier jobIdentifier) {
        checkoutOperator(engineType, pluginInfo, jobIdentifier);
        try {
            IClient client = clientCache.getClient(engineType, pluginInfo);
            return client.getCheckpoints(jobIdentifier);
        } catch (Exception e) {
            throw new RdosDefineException("get job checkpoints:" + jobIdentifier.getEngineJobId() + " exception:" + ExceptionUtil.getErrorMessage(e));
        }
    }


    public JobResult stopJob(JobClient jobClient) throws Exception {
        if(jobClient.getEngineTaskId() == null){
            return JobResult.createSuccessResult(jobClient.getJobId());
        }
        JobIdentifier jobIdentifier = new JobIdentifier(jobClient.getEngineTaskId(), jobClient.getApplicationId(), jobClient.getJobId()
        ,jobClient.getTenantId(),jobClient.getTaskType(),jobClient.getDeployMode(),jobClient.getUserId(),jobClient.getPluginInfo(),jobClient.getComponentVersion());
        jobIdentifier.setForceCancel(jobClient.getForceCancel());
        checkoutOperator(jobClient.getEngineType(), jobClient.getPluginInfo(), jobIdentifier);

        jobIdentifier.setTimeout(getCheckoutTimeout(jobClient));
        IClient client = clientCache.getClient(jobClient.getEngineType(), jobClient.getPluginInfo());
        return client.cancelJob(jobIdentifier);
    }

    public Long getCheckoutTimeout(JobClient jobClient) {
        Long timeout = ConfigConstant.DEFAULT_CHECKPOINT_TIMEOUT;
        Properties taskProps = jobClient.getConfProperties();
        if (taskProps == null || taskProps.size() == 0) {
            return timeout;
        }
        if (taskProps.containsKey(ConfigConstant.SQL_CHECKPOINT_TIMEOUT)) {
            timeout = Long.valueOf(taskProps.getProperty(ConfigConstant.SQL_CHECKPOINT_TIMEOUT));
        } else if (taskProps.containsKey(ConfigConstant.FLINK_CHECKPOINT_TIMEOUT)) {
            timeout = Long.valueOf(taskProps.getProperty(ConfigConstant.FLINK_CHECKPOINT_TIMEOUT));
        }
        return timeout;
    }

    private void checkoutOperator(String engineType, String pluginInfo, JobIdentifier jobIdentifier) {
        if (null == engineType || null == pluginInfo || null == jobIdentifier) {
            throw new IllegalArgumentException("engineType|pluginInfo|jobIdentifier is null.");
        }
    }

    public JudgeResult judgeSlots(JobClient jobClient) throws ClientAccessException {
        IClient clusterClient = clientCache.getClient(jobClient.getEngineType(), jobClient.getPluginInfo());
        return clusterClient.judgeSlots(jobClient);
    }

    public JobResult submitJob(JobClient jobClient) throws ClientAccessException {
        IClient clusterClient = clientCache.getClient(jobClient.getEngineType(), jobClient.getPluginInfo());
        return clusterClient.submitJob(jobClient);
    }

    public ComponentTestResult testConnect(String engineType, String pluginInfo){
        IClient clusterClient = clientCache.getDefaultPlugin(engineType);
        return clusterClient.testConnect(pluginInfo);
    }

    public List<List<Object>> executeQuery(String engineType, String pluginInfo, String sql, String database) throws Exception {
        IClient client = clientCache.getClient(engineType, pluginInfo);
        return client.executeQuery(sql, database);
    }

    public String uploadStringToHdfs(String engineType, String pluginInfo, String bytes, String hdfsPath) throws Exception {
        IClient client = clientCache.getClient(engineType, pluginInfo);
        return client.uploadStringToHdfs(bytes, hdfsPath);
    }

    public ClusterResource getClusterResource(String engineType, String pluginInfo) throws ClientAccessException{
        IClient client = clientCache.getClient(engineType, pluginInfo);
        return client.getClusterResource();
    }
}