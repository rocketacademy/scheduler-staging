import React from 'react';
import GenerateNotifications from '../GenerateNotifications';

// renders projects section of table
function TableProjects({ day }) {
    const projectdue = day.dateTypes.projects.projectDue;
    const projectstart = day.dateTypes.projects.projectStart;
    const cpdue = day.dateTypes.cp.cpDue;

    return (
        <div className="table-projects">
            <GenerateNotifications status={projectdue} 
                               cpdue={cpdue} 
                               projectdue={projectdue} 
                               projectstart={projectstart} 
                               day={day}
                               />
            <GenerateNotifications status={projectstart} 
                               cpdue={cpdue} 
                               projectdue={projectdue} 
                               projectstart={projectstart} 
                               day={day}
                               />
        </div>
    )
}

export default TableProjects
