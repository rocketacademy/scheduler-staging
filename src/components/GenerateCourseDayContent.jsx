 import React from 'react';
 import GenerateNotifications from './GenerateNotifications';
 import GenerateDatetypeSections from './GenerateDatetypeSections';

 // generates the content and section headings for each course day
 const GenerateCourseDayContent = ({ day }) => {
    const projectdue = day.dateTypes.projects.projectDue;
    const projectstart = day.dateTypes.projects.projectStart;
    const cpdue = day.dateTypes.cp.cpDue;
    
    return (
        <>
        <GenerateNotifications
                            status={projectdue} 
                            cpdue={cpdue} 
                            projectdue={projectdue} 
                            projectstart={projectstart} 
                            day={day}
                            />
        <GenerateNotifications
                            status={cpdue} 
                            cpdue={cpdue} 
                            projectdue={projectdue} 
                            projectstart={projectstart} 
                            day={day}
                            />
        <GenerateDatetypeSections 
                                datetype={day.dateTypes} 
                                classType="preClass" 
                                day={day}
                                />
        <GenerateDatetypeSections 
                                datetype={day.dateTypes} 
                                classType="inClass" 
                                day={day}
                                />
        <GenerateDatetypeSections 
                                datetype={day.dateTypes} 
                                classType="postClass" 
                                day={day}
                                />
        <GenerateNotifications 
                            status={projectstart} 
                            cpdue={cpdue} 
                            projectdue={projectdue} 
                            projectstart={projectstart} 
                            day={day}
                            />
        </>
    )
}
   
export default GenerateCourseDayContent;