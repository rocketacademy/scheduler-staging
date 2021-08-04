import React, { useState } from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function ClassItem({setBootcampDataCopy, section, bootcampDataCopy, classType, sectionType, item, dayIndex, classIndex}) {
    // toggle visibility of buttons
    const [buttonsVisible, setButtonsVisible] = useState(false);
    
    const handleShift = (direction, dayIndex, classIndex) => {
        
        // set selectedItem to item chosen
        let selectedItem = sectionType[classType].items[classIndex];
        let nextDay;
        let previousDay;
        // remove selected item from original position
        sectionType[classType].items.splice(classIndex, 1);

        // if items array is empty after removing selected item, remove empty items array
        if (sectionType[classType].items.length === 0) {
            delete sectionType[classType].items;
        }

        // where item will be shifted when user clicks down button (same section/class of next day )
        if (bootcampDataCopy[dayIndex + 1]) {
            nextDay = bootcampDataCopy[dayIndex + 1].dateTypes[section];
        }

        // where item will be shifted when user clicks down button (same section/class of previous day )
        if (bootcampDataCopy[dayIndex - 1]) {
            previousDay = bootcampDataCopy[dayIndex - 1].dateTypes[section];
        }

        // helper function that adds selected item to new position 
        const shiftItem = (dayType) => {
            if (!dayType[classType].items) {
                dayType[classType].items = [];
            } 
            dayType[classType].items.push(selectedItem);
            setBootcampDataCopy([...bootcampDataCopy]);
        }

        if (direction === 'down') {
            shiftItem(nextDay);
        } else {
            shiftItem(previousDay);
        }
    }

    
    return (
        <div>
            <div className="class-item" onMouseEnter={() => setButtonsVisible(true)} onMouseLeave={() => setButtonsVisible(false)}>
                {item.name}
            {buttonsVisible && (
            <div>
                <button onClick={() => handleShift('up', dayIndex, classIndex)}><ExpandLessIcon /></button>
                <button onClick={() => handleShift('down', dayIndex, classIndex)}><ExpandMoreIcon /></button>
            </div>
            )}
            </div>
            
        </div>
    )
}

export default ClassItem
