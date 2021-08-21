import React from 'react';
import DisplaySection from './DisplaySection';

// helper function that checks if there are items in each class (section) of a datetype
// and puts them in an array, sectionArray
const generateSectionArray = (datetype, classType, sectionArray) => {
    Object.keys(datetype).forEach((section) => {
        let classTypeSection;
    // classTypeSection is determined by what classType is
        if (classType === 'preClass') {
            classTypeSection = datetype[section].preClass;
        } else if (classType === 'inClass') {
            classTypeSection = datetype[section].inClass;
        } else {
            classTypeSection = datetype[section].postClass;
        } 

        if (classTypeSection) {
            // if there are items in classTypeSection, the items are pushed into sectionArray
            if (classTypeSection.items) {
                for (let x = 0; x < classTypeSection.items.length; x += 1) {
                    sectionArray.push(classTypeSection.items[x]);
                }
            }
        }
    })
    return sectionArray;
}

// ###############################################################

function GenerateDatetypeSections({ datetype, classType }) {
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
            <DisplaySection heading={heading} sectionType={sectionArray} />
        </div>
    )
}

export default GenerateDatetypeSections
