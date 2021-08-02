import React from 'react';
import ClassItem from './ClassItem';
import ClassType from './ClassType';

function Section({setBootcampDataCopy, section, sectionType, dayIndex, bootcampDataCopy, itemSelected, setItemSelected}) {
    
    return (
        <div>
            {sectionType.constructor === Object && (
            <>
            <div>
                {sectionType.type === 'projects' && (
                    sectionType.projectDue.items && (
                        <div>
                            Project Due:
                            {sectionType.projectDue.items.map((item, classIndex) => {
                                return (
                                    <ClassItem setBootcampDataCopy={setBootcampDataCopy} section={section} classType="projectDue" sectionType={sectionType} itemSelected={itemSelected} setItemSelected={setItemSelected} item={item} dayIndex={dayIndex} classIndex={classIndex} />
                                )
                            })}
                        </div>
                    )
                )}
            </div>
            <div>
                {sectionType.type === 'cp' && (
                    sectionType.cpDue.items && (
                        <div>
                            Interview Prep Due:
                            {sectionType.cpDue.items.map((item, classIndex) => {
                                return (
                                    <ClassItem setBootcampDataCopy={setBootcampDataCopy} section={section} classType="cpDue" sectionType={sectionType} itemSelected={itemSelected} setItemSelected={setItemSelected} item={item} dayIndex={dayIndex} classIndex={classIndex} />
                                )
                            })}
                        </div>
                    )
                )}
            </div>
            <div>
                {(sectionType.preClass.items ||
                    sectionType.inClass.items ||
                    sectionType.postClass.items) && (
                    <div className="course-day-type">
                        {sectionType.type}:
                    </div>
                )}
                <ClassType setBootcampDataCopy={setBootcampDataCopy} section={section} sectionType={sectionType} bootcampDataCopy={bootcampDataCopy} dayIndex={dayIndex} itemSelected={itemSelected} setItemSelected={setItemSelected} />
            </div>
            <div>
                {sectionType.type === 'projects' && (
                    sectionType.projectStart.items && (
                        <div>
                            Project Start:
                            {sectionType.projectStart.items.map((item, classIndex) => {
                                return (
                                    <ClassItem setBootcampDataCopy={setBootcampDataCopy} section={section} bootcampDataCopy={bootcampDataCopy} classType="projectStart" sectionType={sectionType} itemSelected={itemSelected} setItemSelected={setItemSelected} item={item} dayIndex={dayIndex} classIndex={classIndex} />
                                )
                            })}
                        </div>
                    )
                )}
            </div>
            </>
            )}
        </div>
    )
}

export default Section
