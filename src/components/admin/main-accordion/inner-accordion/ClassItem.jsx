import React, { useState } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ShiftItemModal from "./ShiftItemModal";

// helper functions that populates dateArray
// ##########################################################
const addDates = (datesArray, date) => {
  if (!datesArray.includes(date)) {
    datesArray.push(date);
  }
  return datesArray;
};

const addIndex = (bootcampData, datesArray, date) => {
  if (!datesArray.includes(bootcampData.indexOf(date))) {
    datesArray.push(bootcampData.indexOf(date));
  }
  return datesArray;
};
// ############################################################

function ClassItem({
  setBootcampData,
  section,
  bootcampData,
  classType,
  sectionType,
  item,
  dayIndex,
  classIndex,
}) {
  // toggle visibility of buttons
  const [modalShow, setModalShow] = useState(false);
  // object shift item is initialised with keys direction and dates to store data that will be passed into the nect component
  const [shiftItem, setShiftItem] = useState({
    direction: null,
    dates: [],
  });

  // function that handles moving data from one day to another
  const handleShift = (direction, dayIndex, classIndex) => {
    // array that contains all the dates either before or after a selected date depending on direction chosen by user
    let datesArray = [];

    // item is being moved backwards in the schedule
    if (direction === "up") {
      // if bootcampData either an object or an array depending on wether the user is editing the main or individual schedule files, and needs to be processed accordingly
      bootcampData.constructor === Object
        ? Object.keys(bootcampData)
            .filter(
              (date) =>
                bootcampData[date].courseDay < dayIndex + 1 &&
                bootcampData[date].courseDay !== null
            )
            .map((date) => {
              datesArray = addDates(datesArray, date);
            })
        : bootcampData
            .filter((date) => bootcampData.indexOf(date) < dayIndex)
            .map((date) => {
              datesArray = addIndex(bootcampData, datesArray, date);
            });

      // data is put into object shift item
      setShiftItem({
        ...shiftItem,
        direction: "up",
        dates: datesArray,
      });
      // modal that takes user input to move item is shown
      setModalShow(true);
      // item is being moved forward in the schedule
    } else if (direction === "down") {
      bootcampData.constructor === Object
        ? Object.keys(bootcampData)
            .filter(
              (date) =>
                bootcampData[date].courseDay > dayIndex + 1 &&
                bootcampData[date].courseDay !== null
            )
            .map((date) => {
              datesArray = addDates(datesArray, date);
            })
        : bootcampData
            .filter((date) => bootcampData.indexOf(date) > dayIndex)
            .map((date) => {
              datesArray = addIndex(bootcampData, datesArray, date);
            });

      setShiftItem({
        ...shiftItem,
        direction: "down",
        dates: datesArray,
      });

      setModalShow(true);
    } else {
      // here the item is being deleted from the schedule
      sectionType[classType].items.splice(classIndex, 1);
      setBootcampData({ ...bootcampData });
    }
  };

  return (
    <div>
      <div
        className="class-item"
      >
        {item.name}
        
          <div>
            {/* remove item  */}
            <button className="trash-can" onClick={() => handleShift("delete", dayIndex, classIndex)}>
              <DeleteOutlinedIcon />
            </button>
            {/* move item backwards in the schedule  */}
            <button onClick={() => handleShift("up", dayIndex, classIndex)}>
              <ExpandLessIcon />
            </button>
            {/* move item forward in the schedule  */}
            <button onClick={() => handleShift("down", dayIndex, classIndex)}>
              <ExpandMoreIcon />
            </button>
          </div>
        
        {modalShow && (
          // modal that is shown when the user clicks either of the above buttons
          <ShiftItemModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            shiftitem={shiftItem}
            bootcampdata={bootcampData}
            setbootcampdata={setBootcampData}
            sectiontype={sectionType}
            classtype={classType}
            classindex={classIndex}
            section={section}
          />
        )}
      </div>
    </div>
  );
}

export default ClassItem;
