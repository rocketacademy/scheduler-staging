import React, { useEffect, useState } from "react";
import ScheduleTable from "./ScheduleTable";
import generateTableData from "../../../generateTableData";

const ContentTable = ({ scheduleData, coursetype, startDay }) => {
  const [weekNumbers, setWeekNumbers] = useState();
  const [tableData, setTableData] = useState();

  useEffect(() => {
    generateTableData(
      scheduleData,
      coursetype,
      weekNumbers,
      setWeekNumbers,
      setTableData,
      startDay
    );
  }, [scheduleData]);

  return (
    <div className="schedule-table">
      {/* table which displays current week's/ month's content based on course type */}
      {weekNumbers && tableData && (
        <ScheduleTable
          weekNumbers={weekNumbers}
          tableData={tableData}
          coursetype={coursetype}
          today={startDay}
        />
      )}
    </div>
  );
};

export default ContentTable;
