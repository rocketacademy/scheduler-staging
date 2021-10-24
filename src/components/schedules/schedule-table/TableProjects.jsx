import React from 'react';
import GenerateNotifications from '../GenerateNotifications';

// renders projects section of table
function TableProjects({ day }) {
    // this may be a holiday without a projects key
    if( day.dateTypes.projects === undefined ){
      return (
          <div className="table-projects">
          </div>
      )
    }
    const projectdue = day.dateTypes.projects.projectDue;
    const projectstart = day.dateTypes.projects.projectStart;
    const ipdue = day.dateTypes.ip.ipDue;

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
