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

export default generateSectionArray;