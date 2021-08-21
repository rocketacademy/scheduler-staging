import React from 'react';
import DisplaySection from './DisplaySection';

// if sections project due/ project start/ cp due exist in a course day, 
// this function will generate a header and content for these sections
const GenerateNotifications = ({ status, projectdue, cpdue, projectstart }) => {
    let heading;

    // generates header for the section
    if (status) {
        if (status.items) {
            if (status === projectdue) {
                heading = 'Project Due';
            } else if (status === projectstart) {
                heading = 'Project Start';
            } else if (status === cpdue) {
                heading = 'Inteview Prep due';
            }
        }
    }

    return (
        <>
        {status && status.items && (
            <>
            <DisplaySection heading={heading} sectionType={status.items} />
            </>
        )}
    </>
    )  
}

export default GenerateNotifications;