
const generateTableData = (scheduleData, coursetype, weekNumbers, tableData, setWeekNumbers, setTableData, today ) => {
  let firstDay;
  let moveDate;
  let lastDay;
  // let previousDay;
  // let nextDay;
  let firstDayMonth;
  let lastDayMonth;
  let moveDateMonth;
  weekNumbers = [];
  // shows current month for part time bootcamp
  firstDayMonth = today.startOf("month");
  lastDayMonth = today.endOf("month");

  // shows current week for full time bootcamp
  firstDay = today.startOf("week");
  lastDay = today.endOf("week");

  moveDate = firstDay;
  const weekDatesArray = [];
  // getting all the dates between first day and last day of week inclusive and storing them in an array
  while (moveDate <= lastDay) {
    weekDatesArray.push(moveDate.toFormat("dd-MM-yyyy"));
    moveDate = moveDate.plus({ days: 1 });
  }

  moveDateMonth = firstDayMonth;

  const monthDatesArray = [];
  if (coursetype === "pt") {
    // getting all the dates between first day and last day of week inclusive and storing them in an array
    while (moveDateMonth <= lastDayMonth) {
      monthDatesArray.push(moveDateMonth.toFormat("dd-MM-yyyy"));
      moveDateMonth = moveDateMonth.plus({ days: 1 });
    }
  }
  console.log(monthDatesArray);

  // // finds previous course day
  // previousDay = findPreviousDay(scheduleData, today, coursetype);

  // // find the next day if current day is not a course day
  // nextDay = findNextDay(scheduleData, today, coursetype);

  // getting the data objects that correspond to the dates in weekDatesArray and storing them in an array
  const currentWeekData = [];
  const currentMonthData = [];

  for (let i = 0; i < weekDatesArray.length; i += 1) {
    Object.keys(scheduleData).map((day) => {
      if (day === weekDatesArray[i]) {
        currentWeekData.push(scheduleData[day]);
      }
    });
  }

  if (coursetype === "pt") {
    for (let i = 0; i < monthDatesArray.length; i += 1) {
      Object.keys(scheduleData).map((day) => {
        if (day === monthDatesArray[i]) {
          currentMonthData.push(scheduleData[day]);
        }
      });
    }
  }

  if (coursetype === "pt") {
    setTableData(currentMonthData);
  } else {
    setTableData(currentWeekData);
  }
  // getting the week's courseWeek that the indicator will point to
  weekDatesArray.forEach((date) => {
    if (
      scheduleData[date] &&
      !weekNumbers.includes(scheduleData[date].courseWeek)
    ) {
      weekNumbers.push(scheduleData[date].courseWeek);
    }
  });
  setWeekNumbers(weekNumbers);

  console.log('week numbers', weekNumbers);
  console.log('table data', tableData);

  // // indicates whether or not courseweek and course day is shown on the courseday header
  // const todaySectionHeader = true;

  // // creating ids for scrollTo function for top section
  // const currentDayId = `${coursetype}-week-${scheduleData[nextDay].courseWeek}-day-${scheduleData[nextDay].dayNumber}`;
  // const previousDayId = `${coursetype}-week-${scheduleData[previousDay].courseWeek}-day-${scheduleData[previousDay].dayNumber}`;

}

export default generateTableData;