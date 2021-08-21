import React from 'react';
import GenerateCourseDayHeader from './GenerateCourseDayHeader';
import GenerateCourseDayContent from './GenerateCourseDayContent';

// generates schedule content for a particular course day
function ScheduleContent({ scheduleData }) {
   
    return (
        <div className="content">
           {Object.keys(scheduleData).map((day) => {
            const id = `week-${scheduleData[day].courseWeek}-day-${scheduleData[day].dayNumber}`;
               return (
                   <div id={id}>
                        <GenerateCourseDayHeader day={scheduleData[day]} />
                        {!scheduleData[day].dateTypes.holidayType && (
                        <GenerateCourseDayContent day={scheduleData[day]} />
                        )}
                   </div>
               )
           })}
        </div>
    )
}

export default ScheduleContent
