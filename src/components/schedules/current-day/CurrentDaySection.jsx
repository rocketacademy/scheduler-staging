import React from "react";
import { scroller } from "react-scroll";
import GenerateCourseDayHeader from "../GenerateCourseDayHeader";
import GenerateCourseDayContent from "../GenerateCourseDayContent";
import GenerateDatetypeSections from "../GenerateDatetypeSections";

// helper function that finds previous course day
const findPreviousDay = (scheduleData, today, coursetype) => {
  let dayBefore;

  if (coursetype === "ft") {
    if (today.weekday === 1) {
      dayBefore = today.plus({ days: -3 }).toFormat("dd-MM-yyyy");
    } else if (today.weekday === 7) {
      dayBefore = today.plus({ days: -2 }).toFormat("dd-MM-yyyy");
    } else {
      dayBefore = today.plus({ days: -1 }).toFormat('dd-MM-yyyy');
    }
  } else if (coursetype === "pt") {
    if (today.weekday === 1) {
      dayBefore = today
        .plus({ weeks: -1 })
        .set({ weekday: 6 })
        .toFormat("dd-MM-yyyy");
    } else if (today.weekday > 1 && today.weekday <= 6) {
      dayBefore = today.set({ weekday: 1 }).toFormat("dd-MM-yyyy");
    } else {
      dayBefore = today.set({ weekday: 6 }).toFormat("dd-MM-yyyy");
    }
  }

  if (scheduleData[dayBefore].dateTypes.holidayType) {
    dayBefore = findPreviousDay(scheduleData, dayBefore, coursetype);
  }

  return dayBefore;
};

//helper funcyion that finds next course day
const findNextDay = (scheduleData, today, coursetype) => {
  let nextDay;

  if (coursetype === "ft") {
    console.log(today.weekday);
    if (today.weekday === 6) {
      nextDay = today.plus({ days: 2 }).toFormat("dd-MM-yyyy");
    } else if (today.weekday === 7) {
      nextDay = today.plus({ days: 1}).toFormat('dd-MM-yyyy');
    } else {
      nextDay = today.toFormat("dd-MM-yyyy");
    }
  } else if (coursetype === "pt") {
    if (today.weekday <= 6) {
      nextDay = today.set({ weekday: 6 }).toFormat("dd-MM-yyyy");
    } else {
      nextDay = today.plus({ days: 1 }).toFormat("dd-MM-yyyy");
    }
  }

  console.log('next day', nextDay);
  console.log(scheduleData[nextDay]);
  if (scheduleData[nextDay].dateTypes.holidayType) {
    nextDay = findNextDay(scheduleData, nextDay, coursetype);
  }

  return nextDay;
};
// ##############################################################################

function CurrentDaySection({ scheduleData, coursetype, today }) {
  // indicates whether or not courseweek and course day is shown on the courseday header
  const todaySectionHeader = true;
  let previousDay;
  let nextDay;

  // finds previous course day
  previousDay = findPreviousDay(scheduleData, today, coursetype);

  // find the next day if current day is not a course day
  nextDay = findNextDay(scheduleData, today, coursetype);

  // creating ids for scrollTo function for top section
  const currentDayId = `${coursetype}-week-${scheduleData[nextDay].courseWeek}-day-${scheduleData[nextDay].dayNumber}`;
  const previousDayId = `${coursetype}-week-${scheduleData[previousDay].courseWeek}-day-${scheduleData[previousDay].dayNumber}`;

  return (
    <div>
      <div className="today-date">
        {nextDay && previousDay && (
          <>
            <div>
              <GenerateCourseDayHeader
                todaySectionHeader={todaySectionHeader}
                day={scheduleData[nextDay]}
                coursetype={coursetype}
              />
            </div>
            <div className="main-header-course-day">
              <h5>
                Current Course Day:{" "}
                {/* shows either today's content or next course day's content depending on if today's content exists  */}
                {scheduleData[today.toFormat("dd-MM-yyyy")] ? (
                  <span>
                    {scheduleData[today.toFormat("dd-MM-yyyy")].courseDay}
                  </span>
                ) : (
                  <span> {scheduleData[nextDay].courseDay}</span>
                )}
              </h5>
            </div>
            <div className="top-content-container">
              <div className="top-content-section">
                <>
                  <h5
                    className="top-content-day"
                    onClick={() =>
                      scroller.scrollTo(currentDayId, {
                        smooth: true,
                        offset: -70,
                        duration: 100,
                      })
                    }
                  >
                    Current Course Day:
                  </h5>
                  <br></br>
                  <GenerateCourseDayContent day={scheduleData[nextDay]} />
                </>
              </div>
              <div className="top-content-section">
                <>
                  <h5
                    className="top-content-day"
                    onClick={() =>
                      scroller.scrollTo(previousDayId, {
                        smooth: true,
                        offset: -70,
                        duration: 100,
                      })
                    }
                  >
                    Previous Course Day:
                  </h5>
                  <br></br>
                  <GenerateDatetypeSections
                    datetype={scheduleData[previousDay].dateTypes}
                    classType="postClass"
                    day={scheduleData[previousDay]}
                  />
                </>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CurrentDaySection;
