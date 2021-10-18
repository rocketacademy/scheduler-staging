import React, { useState } from "react";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import ShiftItemModal from "./ShiftItemModal";
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import holidayData from '../../../../data/2021-sg-stat-holidays.json';

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

// helper function that shifts items 1 day
const shiftOneDay = (
  direction, 
  bootcampData, 
  dayIndex, 
  sectionType, 
  classType, 
  classIndex, 
  section,
  setDaysInMainFile,
  setDaysInBatchFile
  ) => {

      let bootcampDataArray;
      let target; 
       if(bootcampData.constructor === Object) {
         const holidayDates = [];
         Object.keys(holidayData).forEach((type) => {
          Object.keys(holidayData[type]).forEach((date) => {
            holidayDates.push(date);
          })
         })
         bootcampDataArray = Object.keys(bootcampData);

         if(direction === 'up') {
           target = bootcampData[bootcampDataArray[dayIndex - 1]].courseDate;
           if (holidayDates.includes(target)) {
            target = bootcampData[bootcampDataArray[(dayIndex - 1) -1]].courseDate;
           }         
          
         } else {
           target = bootcampData[bootcampDataArray[dayIndex + 1]].courseDate;
           if (holidayDates.includes(target)) {
            target = bootcampData[bootcampDataArray[(dayIndex + 1) +1]].courseDate;
           }
           
         }
      } else {
        if (direction === 'up') {
          target = dayIndex - 1
        } else {
          target = dayIndex + 1
        }
      }
      // finding the selected item in the data file
      let selectedItem = sectionType[classType].items[classIndex];
      // removing it from it's original position
      sectionType[classType].items.splice(classIndex, 1);

      // if items array is empty after removing selected item, remove empty items array
      if (sectionType[classType].items.length === 0) {
        delete sectionType[classType].items;
      }
      // this is where we want to move the item to
      const targetDay = bootcampData[target].dateTypes[section];

      // checking to see if items array exists at destination, if not, an empty array called items is added
      if (!targetDay[classType].items) {
        targetDay[classType].items = [];
      }

      // selected item is push into items array at destination
      targetDay[classType].items.push(selectedItem);

      // depending on whether the main (array) or individual (object) schedule files were updated, new version of data file is saved
      bootcampData.constructor === Array
        ? setDaysInMainFile([...bootcampData])
        : setDaysInBatchFile({...bootcampData})

    }
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
  setDaysInMainFile,
  setDaysInBatchFile
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
    if (direction === "any") {
      // if bootcampData either an object or an array depending on wether the user is editing the main or individual schedule files, and needs to be processed accordingly
      bootcampData.constructor === Object
        ? Object.keys(bootcampData)
            .map((date) => {
              datesArray = addDates(datesArray, date);
            })
        : bootcampData
            .map((date) => {
              datesArray = addIndex(bootcampData, datesArray, date);
            });

      // data is put into object shift item
      setShiftItem({
        ...shiftItem,
        dates: datesArray,
      });
      // modal that takes user input to move item is shown
      setModalShow(true);
      // item is being moved forward in the schedule
    } else if (direction === "down") {
     shiftOneDay(
        'down', 
        bootcampData, 
        dayIndex, 
        sectionType, 
        classType, 
        classIndex, 
        section,
        setDaysInMainFile,
        setDaysInBatchFile
     )

    } else if (direction === "up") {
      shiftOneDay(
        'up', 
        bootcampData, 
        dayIndex, 
        sectionType, 
        classType, 
        classIndex, 
        section,
        setDaysInMainFile,
        setDaysInBatchFile
     )
    } else {
      // here the item is being deleted from the schedule
      sectionType[classType].items.splice(classIndex, 1);
      if (sectionType[classType].items.length === 0) {
        delete sectionType[classType].items;
      }
      // depending on whether the main (array) or individual (object) schedule files were updated, new version of data file is saved
      bootcampData.constructor === Array
        ? setDaysInMainFile([...bootcampData])
        : setDaysInBatchFile({...bootcampData})

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
            <button className="select" onClick={() => handleShift('any', dayIndex, classIndex)}>
              <DragIndicatorIcon />
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
            setDaysInMainFile={setDaysInMainFile}
            setDaysInBatchFile={setDaysInBatchFile}
            />
        )}
      </div>
    </div>
  );
}

export default ClassItem;
