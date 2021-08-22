import React from 'react';
import generateSectionArray from '../generateSectionArray';
import TableSectionContent from './TableSectionContent';


function TableClass({ day, 
                      sectionClass
                     }) {

    const classArray = [];
    const datetype = day.dateTypes;

    generateSectionArray(datetype, sectionClass, classArray);

    return (
        <td>
            <TableSectionContent sectionArray={classArray} />
        </td>
    )
}

export default TableClass
