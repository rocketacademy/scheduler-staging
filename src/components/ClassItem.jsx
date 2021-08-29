import React, { useState } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RemoveIcon from "@material-ui/icons/Remove";
import ShiftItemModal from "./ShiftItemModal";

function ClassItem({
  day,
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
  const [shiftItem, setShiftItem] = useState({
    direction: null,
    dates: [],
  });

  const handleShift = (direction, dayIndex, classIndex) => {
    let datesArray = [];
    console.log(dayIndex);

    if (direction === "up") {
      console.log(bootcampDataCopy);
      bootcampDataCopy.constructor === Object
        ? Object.keys(bootcampDataCopy)
            .filter(
              (date) =>
                bootcampDataCopy[date].courseDay < dayIndex + 1 &&
                bootcampDataCopy[date].courseDay !== null
            )
            .map((date) => {
              if (!datesArray.includes(date)) {
                datesArray.push(date);
              }
            })
        : bootcampDataCopy
            .filter((date) => bootcampDataCopy.indexOf(date) < dayIndex)
            .map((date) => {
              if (!datesArray.includes(bootcampDataCopy.indexOf(date))) {
                datesArray.push(bootcampDataCopy.indexOf(date));
              }
            });

      setShiftItem({
        ...shiftItem,
        direction: "up",
        dates: datesArray,
      });

      setModalShow(true);
    } else if (direction === "down") {
      bootcampDataCopy.constructor === Object
        ? Object.keys(bootcampDataCopy)
            .filter(
              (date) =>
                bootcampDataCopy[date].courseDay > dayIndex + 1 &&
                bootcampDataCopy[date].courseDay !== null
            )
            .map((date) => {
              if (!datesArray.includes(date)) {
                datesArray.push(date);
              }
            })
        : bootcampDataCopy
            .filter((date) => bootcampDataCopy.indexOf(date) > dayIndex)
            .map((date) => {
              if (!datesArray.includes(bootcampDataCopy.indexOf(date))) {
                datesArray.push(bootcampDataCopy.indexOf(date));
              }
            });

      setShiftItem({
        ...shiftItem,
        direction: "down",
        dates: datesArray,
      });

      setModalShow(true);
    } else {
      sectionType[classType].items.splice(classIndex, 1);
      setBootcampDataCopy({ ...bootcampDataCopy });
      console.log(bootcampDataCopy);
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
            <button onClick={() => handleShift("delete", dayIndex, classIndex)}>
              <RemoveIcon />
            </button>
            <button onClick={() => handleShift("up", dayIndex, classIndex)}>
              <ExpandLessIcon />
            </button>
            <button onClick={() => handleShift("down", dayIndex, classIndex)}>
              <ExpandMoreIcon />
            </button>
          </div>
        )}
        {modalShow && (
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
