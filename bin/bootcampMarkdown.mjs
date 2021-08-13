import fs from 'fs';
import { DateTime } from 'luxon';

const filename = process.argv[2];
// time zone is set to 'Asia/Singapore' because of our current location
const timeZoneSet = 'Asia/Singapore';

// helper function that generates course day header 
const generateCourseDayHeader = (localDate, courseDate, datetype, output, courseweek, date) => {
    // normal course days
    if (courseDate.meetingDateTimeUTC) {
        // time zone is manually set to Asia/Singapore, not dependent on user's location 
        localDate = DateTime.fromISO(courseDate.meetingDateTimeUTC, { zone: timeZoneSet });
        // date of course day
        const formattedDate = localDate.toFormat('EEE d MMM');
        output += `# ${formattedDate}, Week ${courseweek}, Course Day ${courseDate.courseDay}\n`;
        /// meeting time
        const meetingTime = localDate.toFormat('t');
        output += `Meeting time: ${meetingTime} `;
        const timeZone = localDate.toFormat('z');
        // luxon does not provide abbreviated localised timezones
        if (timeZone === 'Asia/Singapore') {
            output += 'SGT ';
        }
        const timeOffset = localDate.toFormat('ZZZZ');
        output += `(${timeOffset})\n\n`;
    // holidays
    } else {
        localDate = DateTime.fromFormat(date, 'dd-MM-yyyy').toFormat('EEE d MMM');
        output += `# ${localDate}:`;
    }

    // getting course day module 
    if (datetype.module) {
        output += `${datetype.module}\n`;
    }

    return output;
}

// helper function for generating project start/ due in page content
const generateNotifications = (status, cpdue, projectdue, projectstart, output) => {
    // if projectDue/ projectStart does exist
    if (status) {
        // and if there are items in projectDue/ projectStart
        if (status.items) {
            // a header is created
            if (status === projectdue) {
                output += `### Project Due\n`;
            } else if (status === projectstart) {
                output += `### Project Start\n`;
            } else if (status === cpdue) {
                output += `### Interview Prep Due\n`;
            }
            // content is added
            for (let l = 0; l < status.items.length; l += 1) {
                if (status.items[l].url) {
                    output += `* [${status.items[l].name}](${status.items[l].url})\n\n`;
                } else {
                    output += `* ${status.items[l].name}\n\n`;
                }
            }
        }
    }
    return output;
}

// helper function that gets all the items in a specified class type
const getSectionArray = (datetype, classType) => {
    const sectionArray = [];
    // for each section in datetypes
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
    });
    return sectionArray;
}

// helper function for generating class type header and content
const generateDatetypeSections = (dateSections, output, classType) => {
        // if there are items in the dateSection array 
        if (dateSections.length > 0) {
           // a header will be created 
            if (classType === 'preClass') {
                output += `### Pre Class\n`;
            } else if (classType === 'inClass') {
                output += `### In Class\n`;
            } else {
                output += `### Post Class\n`;
            }
        
            // content is generated
            for (let t = 0; t < dateSections.length; t += 1) {
                if (dateSections[t].url) {
                    output += `* [${dateSections[t].name}](${dateSections[t].url})\n\n`;
                } else {
                    output += `* ${dateSections[t].name}\n\n`;
                }
            };
        };
        return output;
    }

// helper function for generating course day content
const generateCourseDayContent = (datetype, output) => {
    const projectdue = datetype.projects.projectDue;
    const projectstart = datetype.projects.projectStart;
    const cpdue = datetype.cp.cpDue;

    // generating project due section from projects
    output = generateNotifications (projectdue, cpdue, projectdue, projectstart, output); 
    
    // generating cp due section from cp
    output = generateNotifications (cpdue, cpdue, projectdue, projectstart, output);

    // generating pre class section of course day's content
    const preClassDateSections = getSectionArray(datetype, 'preClass');
    output = generateDatetypeSections(preClassDateSections, output, 'preClass');
    
    // generating in class section of course day content
    const inClassDateSections = getSectionArray(datetype, 'inClass');
    output = generateDatetypeSections(inClassDateSections, output, 'inClass');

    // generating post class section of course day content
    const postClassDateSections = getSectionArray(datetype, 'postClass');
    output = generateDatetypeSections(postClassDateSections, output, 'postClass');

    // generate project start section
    output = generateNotifications (projectstart, cpdue, projectdue, projectstart, output); 
    
    return output;
}

// helper function to generate holidays
const generateHolidayDays = (datetype, output) => {
    if (datetype.holidayType) {
        if (datetype.holidayType === 'public holiday') {
        output += ` ${datetype.location} Public Holiday (${datetype.name})\n`;
        } else if (datetype.holidayType === 'company holiday') {
            output += ' Company Holiday ';
            if (datetype.name === 'winter break') {
                output += `(Winter Break)\n`;
            } 
        }
    }
    output += '\n';
    return output;
}

const courseDates = [];
const courseWeeks = [];

// #######################################################
// #######################################################

const whenFileIsRead = (error, content) => {
    if (error) {
        console.log('read error', error);
    }

    const data = JSON.parse(content);

    // getting course dates
    Object.keys(data.days).forEach((date) => {
        courseDates.push(data.days[date].courseDate);
        if (!courseWeeks.includes(data.days[date].courseWeek)) {
            courseWeeks.push(data.days[date].courseWeek);
        }
    })

    // initialise output
    let output = '# Course Schedule\n';

    for (let i = 0; i < courseWeeks.length; i += 1) {
        for (let j = 0; j < courseDates.length; j += 1) {
            if (data.days[courseDates[j]].courseWeek === courseWeeks[i]) {
                let localDate;
                let courseDate = data.days[courseDates[j]];
                const datetype = data.days[courseDates[j]].dateTypes;
                const courseweek = courseWeeks[i];
                const date = courseDates[j];

                // generating course day header
                output = generateCourseDayHeader(localDate, courseDate, datetype, output, courseweek, date);

                // generating holidays
                if (datetype.holidayType) {
                    output = generateHolidayDays(datetype, output);
                    // generate course day content
                } else {
                    output = generateCourseDayContent(datetype, output);

                }
            }
        }
    }

    console.log('output', output);
    // fs.writeFile(`src/markdown/${data.courseName}.md`, output, (writeErr) => {
    //     if (writeErr) {
    //         console.error('Writing error', writeErr);
    //     }
    // });
}

fs.readFile(filename, 'utf8', whenFileIsRead);