import React, { useState } from 'react';
import bootcampData from '../data/bootcamp-course-days.json';
import Section from './Section';

const DataShift = () => {
    const [itemSelected, setItemSelected] = useState();
    const [bootcampDataCopy, setBootcampDataCopy] = useState(JSON.parse(JSON.stringify(bootcampData.days)));

    console.log('bootcamp data copy', bootcampDataCopy);
    return (
        <div className="data-shift">
            {bootcampDataCopy.map((day, dayIndex) => {
                return (
                    <div className="course-day">
                        <div className="course-day-header" key={day.courseDay}>Course Day: {day.courseDay}</div>
                        <div key={day.dateTypes.module}>{day.dateTypes.module}</div>
                        <br></br>
                        <div>
                            {Object.keys(day.dateTypes).map((section) => {
                                return (
                                <>
                                <Section setBootcampDataCopy={setBootcampDataCopy} section={section} sectionType={day.dateTypes[section]} dayIndex={dayIndex} bootcampDataCopy={bootcampDataCopy} itemSelected={itemSelected} setItemSelected={setItemSelected} />
                                </> 
                                )
                            })} 
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default DataShift;
