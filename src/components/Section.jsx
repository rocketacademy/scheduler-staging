import React from 'react';
import SectionClass from './SectionClass';

function Section({
    setBootcampDataCopy, 
    section, 
    sectionType, 
    dayIndex, 
    bootcampDataCopy
}) {
    // variable classExists is created to track if any class of a section exists (it is initially set to false)
    // if any class of a section exists, classExists is set to true
    // if classExists is true, a header for this section will be created
    let classExists = false;
    if (sectionType.constructor === Object) {
        if ((sectionType.preClass.items || sectionType.inClass.items ||sectionType.postClass.items) ||
           (sectionType === 'projects' && (sectionType.projectDue.items || sectionType.projectStart.items)) ||
           (sectionType === 'cp' && sectionType.cpDue.items)) {
            classExists = true;
        }
    }
    

    return (
        <div>
            {sectionType.constructor === Object && (
            <>
                {classExists && (
                   <>
                   {sectionType.type}
                   </>
                )}
                {Object.keys(sectionType).filter(sectionClass => sectionType[sectionClass].items).map((sectionclass, sectionIndex) => {
                    return (
                        <>
                            <SectionClass
                                sectionIndex={sectionIndex} 
                                sectionclass={sectionclass} 
                                sectionType={sectionType} 
                                bootcampDataCopy={bootcampDataCopy} 
                                setBootcampDataCopy={setBootcampDataCopy} 
                                section={section} 
                                dayIndex={dayIndex} 
                                />
                        </>
                    )
                })}
            </>
            )}
        </div>
    )
}

export default Section
