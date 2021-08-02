import React, { useState } from 'react';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function ClassItem({setBootcampDataCopy, section, bootcampDataCopy, classType, sectionType, itemSelected, setItemSelected, item, dayIndex, classIndex}) {
    const [buttonsVisible, setButtonsVisible] = useState(false);
    
    const handleShift = (direction, dayIndex, classIndex) => {
        
        let selectedItem = sectionType[classType].items[classIndex];
        let nextDay;
        let previousDay;
        sectionType[classType].items.splice(classIndex, 1);

        if (sectionType[classType].items.length === 0) {
            delete sectionType[classType].items;
        }

        if (bootcampDataCopy[dayIndex + 1]) {
            nextDay = bootcampDataCopy[dayIndex + 1].dateTypes[section];
        }

        if (bootcampDataCopy[dayIndex - 1]) {
            previousDay = bootcampDataCopy[dayIndex - 1].dateTypes[section];
        }

        if (direction === 'down') {
            if (!nextDay[classType].items) {
                nextDay[classType].items = [];
            } 
            nextDay[classType].items.push(selectedItem);
            setBootcampDataCopy([...bootcampDataCopy]);
        } else {
                if (!previousDay[classType].items) {
                    previousDay[classType].items = [];
                } 
            previousDay[classType].items.push(selectedItem);
            setBootcampDataCopy([...bootcampDataCopy]);
        }
    }

    const handleMouseEnter = () => {
        setButtonsVisible(true)
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
