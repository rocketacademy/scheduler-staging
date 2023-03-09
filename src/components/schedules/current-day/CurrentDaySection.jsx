import React from "react";
import { scroller } from "react-scroll";
import GenerateCourseDayHeader from "../GenerateCourseDayHeader";
import GenerateCourseDayContent from "../GenerateCourseDayContent";
import GenerateDatetypeSections from "../GenerateDatetypeSections";
import { DateTime } from "luxon";

// helper function that finds previous course day
const findPreviousDay = (scheduleData, today, coursetype, firstDayOfCourse) => {
  let dayBeforeStr;

  if (coursetype === "ft" && DateTime.now() > firstDayOfCourse) {
    // Day before Mon is prev Thu
    if (today.weekday === 1) {
      dayBeforeStr = today.plus({ days: -4 }).toFormat("yyyy-MM-dd");
      // Day before Sun is prev Thu
    } else if (today.weekday === 7) {
      dayBeforeStr = today.plus({ days: -3 }).toFormat("yyyy-MM-dd");
      // Day before Sat is prev Thu
    } else if (today.weekday === 6) {
      dayBeforeStr = today.plus({ days: -2 }).toFormat("yyyy-MM-dd");
      // Day before all other days is yesterday
    } else {
      dayBeforeStr = today.plus({ days: -1 }).toFormat("yyyy-MM-dd");
    }

    // If dayBefore is a course day and a holiday, use prev dayBefore
    if (
      scheduleData[dayBeforeStr] &&
      scheduleData[dayBeforeStr].dateTypes.holidayType
    ) {
      const dayBefore = DateTime.fromFormat(dayBeforeStr, "yyyy-MM-dd");

      // If dayBefore is Mon and Mon is PH, set dayBefore to prev Thu
      if (dayBefore.weekday === 1) {
        dayBeforeStr = dayBefore.minus({ days: 4 }).toFormat("yyyy-MM-dd");
        // Else move dayBefore 1 more day back
      } else {
        dayBeforeStr = dayBefore.minus({ days: 1 }).toFormat("yyyy-MM-dd");
      }
    }
  } else if (coursetype === "pt" && DateTime.now() > firstDayOfCourse) {
    // If today is Mon or Tue, set day before to prev Sat
    if (today.weekday === 1 || today.weekday === 2) {
      dayBeforeStr = today
        .plus({ weeks: -1 })
        .set({ weekday: 6 })
        .toFormat("yyyy-MM-dd");
      // If today is Wed-Sat, set day before to prev Tue
    } else if (today.weekday > 2 && today.weekday <= 6) {
      dayBeforeStr = today.set({ weekday: 2 }).toFormat("yyyy-MM-dd");
      // If today is Sun, set day before to prev Sat
    } else {
      dayBeforeStr = today.set({ weekday: 6 }).toFormat("yyyy-MM-dd");
    }

    // If dayBefore is a course day and a holiday, use prev dayBefore
    if (
      scheduleData[dayBeforeStr] &&
      scheduleData[dayBeforeStr].dateTypes.holidayType
    ) {
      const dayBefore = DateTime.fromFormat(dayBeforeStr, "yyyy-MM-dd");
      // If dayBefore is Tue, use the prev Sat as dayBefore
      if (dayBefore.weekday === 2) {
        dayBeforeStr = dayBefore.minus({ days: 3 }).toFormat("yyyy-MM-dd");
        // If dayBefore is Sat, use the prev Tue as dayBefore
      } else if (dayBefore.weekday === 6) {
        dayBeforeStr = dayBefore.minus({ days: 4 }).toFormat("yyyy-MM-dd");
      }
    }
  }

  return dayBeforeStr;
};

//helper function that finds next course day
const findNextDay = (scheduleData, today, coursetype, firstDayOfCourse) => {
  let nextDay;

  if (coursetype === "ft" && DateTime.now() >= firstDayOfCourse) {
    if (today.weekday === 6) {
      nextDay = today.plus({ days: 2 }).toFormat("yyyy-MM-dd");
    } else if (today.weekday === 7) {
      nextDay = today.plus({ days: 1 }).toFormat("yyyy-MM-dd");
    } else {
      nextDay = today.toFormat("yyyy-MM-dd");
    }
  } else if (coursetype === "pt" && DateTime.now() >= firstDayOfCourse) {
    if (today.weekday === 2) {
      nextDay = today.toFormat("yyyy-MM-dd");
    } else if (today.weekday > 2 && today.weekday <= 6) {
      nextDay = today.set({ weekday: 6 }).toFormat("yyyy-MM-dd");
    } else {
      nextDay = today.plus({ days: 1 }).toFormat("yyyy-MM-dd");
    }
  }

  if (scheduleData[nextDay] && scheduleData[nextDay].dateTypes.holidayType) {
    nextDay = DateTime.fromFormat(nextDay, "yyyy-MM-dd")
      .plus({ days: 1 })
      .toFormat("yyyy-MM-dd");
    // console.log('next day', nextDay);
    // nextDay = findNextDay(scheduleData, nextDay, coursetype, firstDayOfCourse);
  }

  return nextDay;
};
// ##############################################################################

function CurrentDaySection({
  scheduleData,
  coursetype,
  today,
  firstDayOfCourse,
}) {
  // indicates whether or not courseweek and course day is shown on the courseday header
  const todaySectionHeader = true;
  let previousDay = null;
  let nextDay;
  let previousDayId;
  let currentDayId;

  // finds previous course day, only applicable if course has already started
  if (DateTime.now() > firstDayOfCourse) {
    previousDay = findPreviousDay(
      scheduleData,
      today,
      coursetype,
      firstDayOfCourse
    );
    nextDay = findNextDay(scheduleData, today, coursetype, firstDayOfCourse);

    if (scheduleData[previousDay]) {
      previousDayId = `${coursetype}-week-${scheduleData[previousDay].courseWeek}-day-${scheduleData[previousDay].dayNumber}`;
    }

    if (scheduleData[nextDay]) {
      currentDayId = `${coursetype}-week-${scheduleData[nextDay].courseWeek}-day-${scheduleData[nextDay].dayNumber}`;
    }
  } else {
    nextDay = firstDayOfCourse.toFormat("yyyy-MM-dd");
  }

  return (
    <div>
      <div className="today-date">
        {scheduleData[nextDay] && (
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
                {scheduleData[today.toFormat("yyyy-MM-dd")] ? (
                  <span>
                    {scheduleData[today.toFormat("yyyy-MM-dd")].courseDay}
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
                  {scheduleData[previousDay] && (
                    <GenerateDatetypeSections
                      datetype={scheduleData[previousDay].dateTypes}
                      classType="postClass"
                      day={scheduleData[previousDay]}
                    />
                  )}
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
