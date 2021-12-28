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

package com.dtstack.engine.master.impl;

import com.dtstack.engine.common.enums.EScheduleType;
import com.dtstack.engine.domain.JobGraphTrigger;
import com.dtstack.engine.mapper.JobGraphTriggerDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;

/**
 * company: www.dtstack.com
 * author: toutian
 * create: 2019/10/22
 */
@Component
public class JobGraphTriggerService{

    @Autowired
    private JobGraphTriggerDao jobGraphTriggerDao;

    public JobGraphTrigger getTriggerByDate(Timestamp timestamp, int triggerType){
        return jobGraphTriggerDao.getByTriggerTimeAndTriggerType(timestamp, triggerType);
    }

    public boolean checkHasBuildJobGraph(Timestamp todayTime){
        JobGraphTrigger trigger = getTriggerByDate(todayTime, EScheduleType.NORMAL_SCHEDULE.getType());
        return trigger != null;
    }

    /**
     *
     * @param timestamp 触发时间
     * @param minJobId schedule_job当前批次最小id
     */
    public void addJobTrigger(Timestamp timestamp,Long minJobId){
        JobGraphTrigger jobGraphTrigger = new JobGraphTrigger();
        jobGraphTrigger.setTriggerTime(timestamp);
        jobGraphTrigger.setTriggerType(0);
        jobGraphTrigger.setMinJobId(minJobId);
        //新增jobTrigger
        jobGraphTriggerDao.insert(jobGraphTrigger);
    }

}