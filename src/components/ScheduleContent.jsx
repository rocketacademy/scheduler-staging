import React from 'react';
import GenerateCourseDayHeader from './GenerateCourseDayHeader';
import GenerateCourseDayContent from './GenerateCourseDayContent';
import CurrentContentTable from './CurrentContentTable';

// generates schedule content for a particular course day
function ScheduleContent({ scheduleData, courseType, title }) {
   
    return (
        <div className="content">
            <h1 className="schedule-header">{title}</h1>
            <CurrentContentTable scheduleData={scheduleData} courseType={courseType} />
            <div className="schedule-list">
           {Object.keys(scheduleData).map((day) => {
            const id = `week-${scheduleData[day].courseWeek}-day-${scheduleData[day].dayNumber}`;
               return (
                   <div className="day-class" id={id}>
                        <GenerateCourseDayHeader day={scheduleData[day]} />
                        {!scheduleData[day].dateTypes.holidayType && (
                        <GenerateCourseDayContent day={scheduleData[day]} />
                        )}
                   </div>
               )
           })}
           </div>
        </div>
    )
}

export default ScheduleContent
