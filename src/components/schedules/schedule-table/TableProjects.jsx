import React from 'react';
import GenerateNotifications from '../GenerateNotifications';

// renders projects section of table
function TableProjects({ day }) {
    
    let projectdue;
    let projectstart;
    let ipdue;

    if(!day.dateTypes.holidayType) {
        projectdue = day.dateTypes.projects.projectDue;
        projectstart = day.dateTypes.projects.projectStart;
        ipdue = day.dateTypes.ip.ipDue;
    }
    
    return (
        <div className="table-projects">
            <GenerateNotifications status={projectdue} 
                               ipdue={ipdue} 
                               projectdue={projectdue} 
                               projectstart={projectstart} 
                               day={day}
                               />
            <GenerateNotifications status={projectstart} 
                               ipdue={ipdue} 
                               projectdue={projectdue} 
                               projectstart={projectstart} 
                               day={day}
                               />
        </div>
    )
}

export default TableProjects
