import React from 'react';
import DisplaySection from './DisplaySection';
import generateSectionArray from '../../generateSectionArray';


function GenerateDatetypeSections ({ 
                                datetype, 
                                classType, 
                                day 
                                }) { 
    // stores items that are in a particular section of a datetype
    const sectionArray = [];

    generateSectionArray(datetype, classType, sectionArray);

    // sets the heading depending on the classtype
    let heading;
    if (sectionArray.length > 0) {
           // a header will be created 
        if (classType === 'preClass') {
            heading ='Pre Class';
        } else if (classType === 'inClass') {
            heading = 'In Class';
        } else {
            heading = 'Post Class';
        }
    }

    return (
        <div>
            <DisplaySection 
                        heading={heading} 
                        sectionType={sectionArray} 
                        day={day}
                        />
        </div>
    )
}

export default GenerateDatetypeSections
