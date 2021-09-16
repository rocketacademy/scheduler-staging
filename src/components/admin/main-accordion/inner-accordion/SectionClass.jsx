import React from "react";
import ClassItem from "./ClassItem";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function SectionClass({
  day,
  sectionIndex,
  sectionclass,
  sectionType,
  bootcampData,
  setBootcampData,
  section,
  dayIndex,
  setDaysInBatchFile,
  setDaysInMainFile,
}) {

  // helper function that maps each element in section array to a new course day
  const shiftSection = (sectionArray, startDay, bootcampData) => {
    sectionArray.forEach((element, index) => {
      if (element !== null) {
        if (
          bootcampData[startDay + index].dateTypes[section][sectionclass]
            .items
        ) {
          sectionArray[index].forEach((item) => {
            bootcampData[startDay + index].dateTypes[section][
              sectionclass
            ].items.push(item);
          });
        } else {
          bootcampData[startDay + index].dateTypes[section][
            sectionclass
          ].items = sectionArray[index];
        }
      }
    });
    return bootcampData;
  };

  const handleClassShift = (direction, dayIndex) => {
    // puts all the items in selected class in an array and deletes them from their original position
    const sectionArray = [];
    for (let i = dayIndex; i < bootcampData.length - 1; i += 1) {
      if (bootcampData[i].dateTypes[section][sectionclass].items) {
        const selectedSection =
          bootcampData[i].dateTypes[section][sectionclass].items;
        sectionArray.push(selectedSection);
        delete bootcampData[i].dateTypes[section][sectionclass].items;
      } else {
        sectionArray.push(null);
      }
    }

    let startDay;
    // when user clicks the down button, items are put into section/class of the next day
    if (direction === "down") {
      startDay = dayIndex + 1;
    } else {
      // when user clicks the up button, items are put into section/class of the previous day
      startDay = dayIndex - 1;
    }

    bootcampData = shiftSection(sectionArray, startDay, bootcampData);
    setBootcampData([...bootcampData]);
  };

  return (
    <div>
      {sectionType[sectionclass].items && (
        <div className="section-class">
          <div className="class-title">{sectionclass}</div>
          <div className="class-items">
            {sectionType[sectionclass].items.map((item, classIndex) => {
              return (
                <ClassItem
                  day={day}
                  sectionclass={sectionclass}
                  bootcampData={bootcampData}
                  setBootcampData={setBootcampData}
                  section={section}
                  classType={sectionclass}
                  sectionType={sectionType}
                  item={item}
                  dayIndex={dayIndex}
                  classIndex={classIndex}
                  setDaysInBatchFile={setDaysInBatchFile}
                  setDaysInMainFile={setDaysInMainFile}
                />
              );
            })}
          </div>
          <div
            className="section-class-header"
  
          >
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
          
          </div>
        </div>
      )}
    </div>
  );
}

export default SectionClass;
