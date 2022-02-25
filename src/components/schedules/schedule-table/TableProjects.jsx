import React from 'react';
import GenerateNotifications from '../GenerateNotifications';

// renders projects section of table
function TableProjects({ day }) {
    
    let projectdue;
    let projectstart;
    let ipdue;

    if(!day.dateTypes.holidayType) {
        if (day.dateTypes.projects) {
        projectdue = day.dateTypes.projects.projectDue;
        projectstart = day.dateTypes.projects.projectStart;
        }

        if (day.dateTypes.ip) {
        ipdue = day.dateTypes.ip.ipDue;
        }
    }
    
    return (
        <div className="table-projects">
            {projectdue !== undefined && (
                <GenerateNotifications
                status={projectdue}
                ipdue={ipdue}
                projectdue={projectdue}
                projectstart={projectstart}
                day={day}
            />
            )}
            {projectstart !== undefined && (
                <GenerateNotifications
                status={projectstart}
                ipdue={ipdue}
                projectdue={projectdue}
                projectstart={projectstart}
                day={day}
            />
            )}
        </div>
    )
}

export default TableProjects
