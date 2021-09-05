import React from 'react';
import generateSectionArray from '../../../generateSectionArray';
import TableSectionContent from './TableSectionContent';

// renders in class/ preclass section of table
function TableClass({ day, 
                      sectionClass
                     }) {

    const classArray = [];
    const datetype = day.dateTypes;

    // gets all items in a particular section
    generateSectionArray(datetype, sectionClass, classArray);

    return (
        <td>
            <TableSectionContent sectionArray={classArray} />
        </td>
    )
}

export default TableClass
