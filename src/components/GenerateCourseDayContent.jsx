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
        <GenerateNotifications status={projectdue} cpdue={cpdue} projectdue={projectdue} projectstart={projectstart} />
        <GenerateNotifications status={cpdue} cpdue={cpdue} projectdue={projectdue} projectstart={projectstart} />
        <GenerateDatetypeSections datetype={day.dateTypes} classType="preClass" />
        <GenerateDatetypeSections datetype={day.dateTypes} classType="inClass" />
        <GenerateDatetypeSections datetype={day.dateTypes} classType="postClass" />
        <GenerateNotifications status={projectstart} cpdue={cpdue} projectdue={projectdue} projectstart={projectstart} />
        </>
    )
}
   
export default GenerateCourseDayContent;