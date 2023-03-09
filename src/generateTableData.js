// function that generates data required for rendering schedule table
const generateTableData = (
  scheduleData,
  coursetype,
  weekNumbers,
  setWeekNumbers,
  setTableData,
  today
) => {
  let firstDay;
  let moveDate;
  let lastDay;
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
    weekDatesArray.push(moveDate.toFormat("yyyy-MM-dd"));
    moveDate = moveDate.plus({ days: 1 });
  }

  moveDateMonth = firstDayMonth;

  const monthDatesArray = [];
  if (coursetype === "pt") {
    // getting all the dates between first day and last day of week inclusive and storing them in an array
    while (moveDateMonth <= lastDayMonth) {
      monthDatesArray.push(moveDateMonth.toFormat("yyyy-MM-dd"));
      moveDateMonth = moveDateMonth.plus({ days: 1 });
    }
  }

  const currentWeekData = [];
  const currentMonthData = [];

  // getting the data (object) for each individual day of the month (used for pt schedule table)
  if (coursetype === "pt") {
    for (let i = 0; i < monthDatesArray.length; i += 1) {
      Object.keys(scheduleData).map((day) => {
        if (day === monthDatesArray[i]) {
          currentMonthData.push(scheduleData[day]);
        }
      });
    }
    setTableData(currentMonthData);
  } else {
    // getting the data (object) for each individual day of the week
    for (let i = 0; i < weekDatesArray.length; i += 1) {
      Object.keys(scheduleData).map((day) => {
        if (day === weekDatesArray[i]) {
          currentWeekData.push(scheduleData[day]);
        }
      });
    }
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
};

export default generateTableData;
