import React, { useState } from "react";
import ClassItem from "./ClassItem";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddItemModal from "./AddItemModal";

function SectionClass({
  day,
  sectionIndex,
  sectionclass,
  sectionType,
  bootcampDataCopy,
  setBootcampDataCopy,
  section,
  dayIndex,
}) {
  const [classButtonsVisible, setClassButtonsVisible] = useState(false);

  const [showInputModal, setShowInputModal] = useState(false);
  // helper function that maps each element in section array to a new course day
  const shiftSection = (sectionArray, startDay, bootcampDataCopy) => {
    sectionArray.forEach((element, index) => {
      console.log("day index", dayIndex);
      if (element !== null) {
        if (
          bootcampDataCopy[startDay + index].dateTypes[section][sectionclass]
            .items
        ) {
          sectionArray[index].forEach((item) => {
            bootcampDataCopy[startDay + index].dateTypes[section][
              sectionclass
            ].items.push(item);
          });
        } else {
          bootcampDataCopy[startDay + index].dateTypes[section][
            sectionclass
          ].items = sectionArray[index];
        }
      }
    });
    return bootcampDataCopy;
  };

  const handleClassShift = (direction, dayIndex) => {
    // puts all the items in selected class in an array and deletes them from their original position
    const sectionArray = [];
    for (let i = dayIndex; i < bootcampDataCopy.length - 1; i += 1) {
      if (bootcampDataCopy[i].dateTypes[section][sectionclass].items) {
        const selectedSection =
          bootcampDataCopy[i].dateTypes[section][sectionclass].items;
        sectionArray.push(selectedSection);
        delete bootcampDataCopy[i].dateTypes[section][sectionclass].items;
      } else {
        sectionArray.push(null);
      }
    }

    let startDay;
    // when user clicks the down button, items are put into section/class of the next day
    if (direction === "down") {
      startDay = dayIndex + 1;
      bootcampDataCopy = shiftSection(sectionArray, startDay, bootcampDataCopy);
    } else {
      // when user clicks the up button, items are put into section/class of the previous day
      startDay = dayIndex - 1;
      bootcampDataCopy = shiftSection(sectionArray, startDay, bootcampDataCopy);
    }

    console.log("boot camp data copy", bootcampDataCopy);
    setBootcampDataCopy([...bootcampDataCopy]);
  };

  return (
    <div>
      {sectionType[sectionclass].items && (
        <div className="section-class">
          <div className="class-title">{sectionclass}</div>
          <div className="class-items">
            {sectionType[sectionclass].items.map((item, classIndex) => {
              const id = `day-${dayIndex}-section-${section}-class-${sectionclass}-${classIndex}`;
              return (
                <ClassItem
                  day={day}
                  sectionclass={sectionclass}
                  bootcampDataCopy={bootcampDataCopy}
                  setBootcampDataCopy={setBootcampDataCopy}
                  section={section}
                  classType={sectionclass}
                  sectionType={sectionType}
                  item={item}
                  dayIndex={dayIndex}
                  classIndex={classIndex}
                />
              );
            })}
          </div>
          <div
            className="section-class-header"
            onMouseEnter={() => setClassButtonsVisible(true)}
            onMouseLeave={() => setClassButtonsVisible(false)}
          >
            {classButtonsVisible && (
              <div>
                <button
                  onClick={() => handleClassShift("up", dayIndex, sectionIndex)}
                >
                  <ExpandLessIcon />
                </button>
                <button
                  onClick={() =>
                    handleClassShift("down", dayIndex, sectionIndex)
                  }
                >
                  <ExpandMoreIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SectionClass;
