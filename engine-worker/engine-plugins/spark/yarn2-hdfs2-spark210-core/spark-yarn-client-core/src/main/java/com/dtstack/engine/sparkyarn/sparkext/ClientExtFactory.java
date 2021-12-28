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

package com.dtstack.engine.sparkyarn.sparkext;

import com.dtstack.engine.base.filesystem.FilesystemManager;
import org.apache.hadoop.conf.Configuration;
import org.apache.spark.SparkConf;
import org.apache.spark.deploy.yarn.ClientArguments;


/**
 * Reason:
 * Date: 2019/1/21
 * Company: www.dtstack.com
 * @author xuchao
 */

public class ClientExtFactory {

    public static ClientExt getClientExt(FilesystemManager filesystemManager,
                                         ClientArguments args,
                                         Configuration hadoopConf,
                                         SparkConf sparkConf,
                                         boolean isCarbondata){

        if(!isCarbondata){
            return new ClientExt(filesystemManager, args, hadoopConf, sparkConf);
        }else{
            return new CarbondataClientExt(filesystemManager, args, hadoopConf, sparkConf);
        }
    }
}