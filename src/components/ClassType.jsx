import React, { useState } from 'react';
import ClassItem from './ClassItem';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function ClassType({setBootcampDataCopy, section, sectionType, bootcampDataCopy, dayIndex, itemSelected, setItemSelected}) {

    return (
            <div>
                {Object.keys(sectionType).map((classtype, index) => {
                    return (
                        <>
                        {sectionType[classtype].constructor === Object && (
                            <>
                            {!(classtype === 'projectStart' ||
                            classtype === 'projectDue' ||
                            classtype === 'cpDue') && (
                            <>
                            {sectionType[classtype].items && (
                                <div className="class-type">
                                    {classtype}
                                    {sectionType[classtype].items.map((item, classIndex) => {
                                        return (
                                            <ClassItem setBootcampDataCopy={setBootcampDataCopy} section={section} bootcampDataCopy={bootcampDataCopy} classType={classtype} sectionType={sectionType} itemSelected={itemSelected} setItemSelected={setItemSelected} item={item} dayIndex={dayIndex} classIndex={classIndex} /> 
                                        )
                                    })}
                                </div>
                            )}
                            </>
                            )}
                            </>
                        )}
                        </>
                    )
                })}
            </div>   
    )
}

export default ClassType
