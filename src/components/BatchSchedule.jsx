import React, { useState } from 'react';
import ScheduleContent from './ScheduleContent';
import bootcampSchedule from '../data/testData.json';
import SideBar from './SideBar';
import './BatchSchedule.css';

function BatchSchedule() {
    const [scheduleData, setScheduleData] = useState(JSON.parse(JSON.stringify(bootcampSchedule.days)));

    return (
        <div className="course-schedule">
            <SideBar scheduleData={scheduleData} />
            <ScheduleContent scheduleData={scheduleData} />
        </div>
    )
}

export default BatchSchedule
