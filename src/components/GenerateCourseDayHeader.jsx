import React from 'react';
import { DateTime } from 'luxon';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { scroller } from 'react-scroll';

// helper function that generates course day header for a normal course day
const NormalCourseDay = ({ 
                        day, 
                        timeZoneSet
                        }) => {
    localDate = DateTime.fromISO(day.meetingDateTimeUTC, { zone: timeZoneSet });
    formattedDate = localDate.toFormat('EEE d MMM');
    meetingTime = localDate.toFormat('t');
    timeOffset = localDate.toFormat('ZZZZ');
    timeZone = localDate.toFormat('z');

        return (
        <>
            {timeZone === timeZoneSet && (
            <>
            <div className="main-header">
            <h3 className="day-header">{formattedDate}, Week {day.courseWeek}, Course Day {day.courseDay}</h3>
            <div  onClick={() => scroller.scrollTo( 'top', {
                                    smooth: true,
                                    offset: -70,
                                    duration: 100,
                                })}>
            <ExpandLessIcon />
            </div>
            </div>
            {/* luxon does not provide abbreviated localised timezones */}
            <p>Meeting Time: {meetingTime} SGT ({timeOffset})</p>
            <p>{day.dateTypes.module}</p>
            </>
            )}
        </>
        )
}

// helper function that generates courseday header for a holiday
const HolidayCourseDay = ({ day, timeZoneSet }) => {
    localDate = DateTime.fromFormat(day.courseDate, 'dd-MM-yyyy');
    formattedDate = localDate.toFormat('EEE d MMM');
    timeZone = localDate.toFormat('z');
    // depending on if the holiday is a public/company holiday, 
    // a different output will be rendered
    if (day.dateTypes.holidayType === 'public holiday') {
        holiday = `Public Holiday (${day.dateTypes.name})`;
    } else {
        holiday = `Company Holiday (${day.dateTypes.name})`;
    }
    
    return (
        <>
        {timeZone === timeZoneSet && (
        <h2>{formattedDate}: {day.dateTypes.location} {holiday}</h2>
        )}
        </>
    )
}

let localDate;
let formattedDate;
let meetingTime;
let timeZone;
let timeOffset;
let holiday;

// ######################################################
// ######################################################

// function that generates the header for each course day
const GenerateCourseDayHeader = ({ day }) => {
    // this is the timezone of the area we are in 
    const timeZoneSet = 'Asia/Singapore';

    if (day.meetingDateTimeUTC) {
        return <NormalCourseDay 
                            day={day} 
                            timeZoneSet={timeZoneSet} 
                            />
    } else {
        return <HolidayCourseDay 
                            day={day} 
                            timeZoneSet={timeZoneSet} 
                            />
    }
}

export default GenerateCourseDayHeader;
