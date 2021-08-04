import React, { useState } from 'react';
import ClassItem from './ClassItem';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function SectionClass({sectionIndex, sectionclass, sectionType, bootcampDataCopy, setBootcampDataCopy, section, dayIndex}) {
    const [classButtonsVisible, setClassButtonsVisible] = useState(false);

    // helper function that maps each element in section array to a new course day
    const shiftSection = (sectionArray, startDay) => {
        sectionArray.forEach((element, index) => {
            console.log('day index', dayIndex);
            if ( element !== null) {
                if (bootcampDataCopy[startDay + index].dateTypes[section][sectionclass].items) {
                    sectionArray[index].forEach((item) => {
                        bootcampDataCopy[startDay + index].dateTypes[section][sectionclass].items.push(item);
                    })
                } else {
                    bootcampDataCopy[startDay + index].dateTypes[section][sectionclass].items = sectionArray[index];
                }
            }
        })
    }

    const handleClassShift = (direction, dayIndex) => {
        // puts all the items in selected class in an array and deletes them from their original position 
        const sectionArray = [];
        for (let i = dayIndex; i < bootcampDataCopy.length -1; i += 1) {
            if (bootcampDataCopy[i].dateTypes[section][sectionclass].items) {
                const selectedSection = bootcampDataCopy[i].dateTypes[section][sectionclass].items;
                sectionArray.push(selectedSection);
                delete bootcampDataCopy[i].dateTypes[section][sectionclass].items;
            } else {
                sectionArray.push(null);
            }
        };
        
        let startDay;
        // when user clicks the down button, items are put into section/class of the next day 
        if (direction === 'down') {
            startDay = dayIndex + 1;
            shiftSection(sectionArray, startDay);
        } else {
            // when user clicks the up button, items are put into section/class of the previous day
            startDay = dayIndex - 1;
            shiftSection(sectionArray, startDay);
        }
        
        
        console.log('boot camp data copy', bootcampDataCopy);
        setBootcampDataCopy([...bootcampDataCopy]);
    }

    return (
            <div>
                {sectionType[sectionclass].items && (
                    <div className="section-class">
                        <div className="section-class-header" onMouseEnter={() => setClassButtonsVisible(true)} onMouseLeave={() => setClassButtonsVisible(false)}>
                            {sectionclass}
                            {classButtonsVisible && (
                            <div >
                                <button onClick={() => handleClassShift('up', dayIndex, sectionIndex)}><ExpandLessIcon /></button>
                                <button onClick={() => handleClassShift('down', dayIndex, sectionIndex)}><ExpandMoreIcon /></button>
                            </div>
                            )}
                        </div>
                        {sectionType[sectionclass].items.map((item, classIndex) => {
                            return (
                                <ClassItem sectionclass={sectionclass} bootcampDataCopy={bootcampDataCopy} setBootcampDataCopy={setBootcampDataCopy} section={section} classType={sectionclass} sectionType={sectionType} item={item} dayIndex={dayIndex} classIndex={classIndex} />
                            )
                        })}
                    </div>
                )}
            </div>

                
    )
}

export default SectionClass;
