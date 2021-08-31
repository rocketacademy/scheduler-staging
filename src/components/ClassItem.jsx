import React, { useState } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RemoveIcon from "@material-ui/icons/Remove";
import ShiftItemModal from "./ShiftItemModal";

// helper functions that populates dateArray
// ##########################################################
const addDates = (datesArray, date) => {
  if (!datesArray.includes(date)) {
    datesArray.push(date);
  }
  return datesArray;
};

const addIndex = (bootcampDataCopy, datesArray, date) => {
  if (!datesArray.includes(bootcampDataCopy.indexOf(date))) {
    datesArray.push(bootcampDataCopy.indexOf(date));
  }
  return datesArray;
};
// ############################################################

function ClassItem({
  setBootcampDataCopy,
  section,
  bootcampDataCopy,
  classType,
  sectionType,
  item,
  dayIndex,
  classIndex,
}) {
  // toggle visibility of buttons
  const [buttonsVisible, setButtonsVisible] = useState(false);
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
      // if bootcampDataCopy either an object or an array depending on wether the user is editing the main or individual schedule files, and needs to be processed accordingly
      bootcampDataCopy.constructor === Object
        ? Object.keys(bootcampDataCopy)
            .filter(
              (date) =>
                bootcampDataCopy[date].courseDay < dayIndex + 1 &&
                bootcampDataCopy[date].courseDay !== null
            )
            .map((date) => {
              datesArray = addDates(datesArray, date);
            })
        : bootcampDataCopy
            .filter((date) => bootcampDataCopy.indexOf(date) < dayIndex)
            .map((date) => {
              datesArray = addIndex(bootcampDataCopy, datesArray, date);
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
      bootcampDataCopy.constructor === Object
        ? Object.keys(bootcampDataCopy)
            .filter(
              (date) =>
                bootcampDataCopy[date].courseDay > dayIndex + 1 &&
                bootcampDataCopy[date].courseDay !== null
            )
            .map((date) => {
              datesArray = addDates(datesArray, date);
            })
        : bootcampDataCopy
            .filter((date) => bootcampDataCopy.indexOf(date) > dayIndex)
            .map((date) => {
              datesArray = addIndex(bootcampDataCopy, datesArray, date);
            });

      setShiftItem({
        ...shiftItem,
        direction: "down",
        dates: datesArray,
      });

      setModalShow(true);
    } else {
      // here the item is being removed from the schedule altogether
      sectionType[classType].items.splice(classIndex, 1);
      setBootcampDataCopy({ ...bootcampDataCopy });
    }
  };

  return (
    <div>
      <div
        className="class-item"
        onMouseEnter={() => setButtonsVisible(true)}
        onMouseLeave={() => setButtonsVisible(false)}
      >
        {item.name}
        {buttonsVisible && (
          <div>
            {/* remove item  */}
            <button onClick={() => handleShift("delete", dayIndex, classIndex)}>
              <RemoveIcon />
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
        )}
        {modalShow && (
          // modal that is shown when the user clicks either of the above buttons
          <ShiftItemModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            shiftitem={shiftItem}
            bootcampdatacopy={bootcampDataCopy}
            setbootcampdatacopy={setBootcampDataCopy}
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
