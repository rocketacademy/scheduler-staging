import React from 'react';
import CourseWeeks from './CourseWeeks';
import Modules from './Modules';

// side navbar 
function SideBar({ 
                scheduleData, 
                coursetype
             }) {
    
    return (
        <div className="sidebar">
            <CourseWeeks scheduleData={scheduleData}
                         coursetype={coursetype}
                         />
            {/* <Modules scheduleData={scheduleData} /> */}
        </div>
    )
}

export default SideBar
