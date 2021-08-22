import React, { useState } from 'react';
import ScheduleContent from './ScheduleContent';
import SideBar from './SideBar';
import './BatchSchedule.css';

function BatchSchedule({ data, title }) {
    const [scheduleData, setScheduleData] = useState(JSON.parse(JSON.stringify(data.days)));
    const courseType = data.courseType;

    return (
        <div className="course-schedule">
            <SideBar scheduleData={scheduleData} />
            <ScheduleContent scheduleData={scheduleData} courseType={courseType} title={title} />
        </div>
    )
}

export default BatchSchedule
