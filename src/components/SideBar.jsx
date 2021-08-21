import React from 'react';
import CourseWeeks from './CourseWeeks';
import Modules from './Modules';

function SideBar({ scheduleData }) {
    
    return (
        <div className="sidebar">
            <CourseWeeks scheduleData={scheduleData} />
            <Modules scheduleData={scheduleData} />
        </div>
    )
}

export default SideBar
