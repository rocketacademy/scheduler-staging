import React from 'react';
import SectionClass from './SectionClass';

function Section({setBootcampDataCopy, section, sectionType, dayIndex, bootcampDataCopy}) {
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
                {Object.keys(sectionType).map((sectionclass, sectionIndex) => {
                    return (
                        <>
                        {sectionType[sectionclass].items && (
                            <SectionClass sectionIndex={sectionIndex} sectionclass={sectionclass} sectionType={sectionType} bootcampDataCopy={bootcampDataCopy} setBootcampDataCopy={setBootcampDataCopy} section={section} dayIndex={dayIndex} />
                        )}
                        </>
                    )
                })}
            </>
            )}
        </div>
    )
}

export default Section
