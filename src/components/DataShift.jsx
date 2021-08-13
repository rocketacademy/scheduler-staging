import React, { useState } from 'react';
import bootcampData from '../data/bootcamp-course-days.json';
import Section from './Section';
import Button from 'react-bootstrap/Button';
import download from '../download.js';

const DataShift = () => {
    const [bootcampDataCopy, setBootcampDataCopy] = useState(JSON.parse(JSON.stringify(bootcampData.days)));

    const handleDownloadClick = () => {
        bootcampData.days = bootcampDataCopy;
        console.log('bootcamp data', bootcampData);
        download(bootcampData, 'modified-bootcamp-data.json');
    }

    return (
        <>
            <div className="datashift-button-container">
                <Button variant="primary" type="submit" onClick={handleDownloadClick}>
                    Download Modified File
                </Button>
            </div>
            <div className="data-shift">
                {bootcampDataCopy.map((day, dayIndex) => {
                    return (
                        <div className="course-day">
                            <div className="course-day-header" key={day.courseDay}>Course Day: {day.courseDay}</div>
                            <div key={day.dateTypes.module}>{day.dateTypes.module}</div>
                            <br></br>
                            <div>
                                {Object.keys(day.dateTypes).map(section =>                                    
                                    <Section 
                                        setBootcampDataCopy={setBootcampDataCopy} 
                                        section={section} 
                                        sectionType={day.dateTypes[section]} 
                                        dayIndex={dayIndex} 
                                        bootcampDataCopy={bootcampDataCopy} 
                                        />
                                )} 
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default DataShift;
