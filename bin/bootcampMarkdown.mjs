import fs from 'fs';
import { DateTime } from 'luxon';

console.log('filename', process.argv[2]);
const filename = process.argv[2];

// helper function that generates course day header 
const generateCourseDayHeader = (localDate, courseDate, datetype, output, courseweek, date) => {
    // normal course days
    if (courseDate.meetingDateTimeUTC) {
        localDate = DateTime.fromISO(courseDate.meetingDateTimeUTC)
        // date of course day
        const formattedDate = localDate.toFormat('EEE d MMM');
        output += `# ${formattedDate}, Week ${courseweek}, Course Day ${courseDate.courseDay}\n`;
        /// meeting time
        const meetingTime = DateTime.fromISO(courseDate.meetingDateTimeUTC).toFormat('t');
        output += `Meeting time: ${meetingTime} `;
        const timeZone = DateTime.fromISO(courseDate.meetingDateTimeUTC).toFormat('z');
        if (timeZone === 'Asia/Singapore') {
            output += 'SGT ';
        }
        const timeOffset = DateTime.fromISO(courseDate.meetingDateTimeUTC).toFormat('ZZZZ');
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
const generateProjectNotifications = (projectStatus, projectdue, projectstart, output) => {
    if (projectStatus) {
        if (projectStatus.items) {
            if (projectStatus === projectdue) {
                output += `### Project Due\n`;
            } else if (projectStatus === projectstart) {
                output += `### Project Start\n`;
            }
            for (let l = 0; l < projectStatus.items.length; l += 1) {
                output += `* [${projectStatus.items[l].name}](${projectStatus.items[l].url})\n`;
            }
        }
    }
    output += '\n';
    return output;
}

// check if section exists, if it does, add section heading to output
const outputSectionHeading = (datetypeSections, classtype, output) => {
    let classType;
    let exists = false;
    for (let q = 0; q < datetypeSections.length; q += 1) {
        if (datetypeSections[q]) {
            if (classtype === `### Pre Class\n`) {
                classType = datetypeSections[q].preClass;
            } else if (classtype === `### Post Class\n`) {
                classType = datetypeSections[q].postClass;
            } else if (classtype === `### In Class\n`) {
                classType = datetypeSections[q].inClass;
            }
            if (classType.items) {
                exists = true;
            }
        }
    }
    if (exists === true) {
        output += classtype;
    } 
    return output;
}

// helper function to generate sections of course day content
const generateDatetypeSections = (datetypeSections, classtype, output) => {
    output = outputSectionHeading(datetypeSections, classtype, output);
    let classType;
    for (let p = 0; p < datetypeSections.length; p += 1) {
        if (datetypeSections[p]) {
            if (classtype === `### Pre Class\n`) {
                classType = datetypeSections[p].preClass;
            } else if (classtype === `### Post Class\n`) {
                classType = datetypeSections[p].postClass;
            } else if (classtype === `### In Class\n`) {
                classType = datetypeSections[p].inClass;
            }
            if (classType.items) {
                for (let k = 0; k < classType.items.length; k += 1) {
                    output += `* [${classType.items[k].name}](${classType.items[k].url})\n`;
                };
            };
        }
    }

    output += '\n';
    return output; 
}

// helper function to generate holidays
const generateHolidayDays = (datetype, output) => {
    if (datetype.holidayType) {
        if (datetype.holidayType === 'public holiday') {
        output += ` ${datetype.location} Public Holiday (${datetype.name})\n`;
        } else if (datetype.holidayType === 'company holiday') {
            output += '## Company Holiday: ';
            if (datetype.name === 'winter break') {
                output += `Winter Break (${datetype.location})\n`;
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
    let output = '# Course Schedule';

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

                // generating course day content
                if (datetype.general && 
                    datetype.dsa &&
                    datetype.ux &&
                    datetype.css && 
                    datetype.projects ) {

                    const projectdue = datetype.projects.projectDue;
                    const projectstart = datetype.projects.projectStart;

                    // generating project due section from projects
                    output = generateProjectNotifications (projectdue, projectdue, projectstart, output); 
                    
                    const datetypeSections = [datetype.general, datetype.dsa, datetype.ux, datetype.css, datetype.projects];
                    // generate pre class section
                    if (datetype.general.preClass && 
                        datetype.dsa.preClass && 
                        datetype.ux.preClass && 
                        datetype.css.preClass && 
                        datetype.projects.preClass ) {
                            output = generateDatetypeSections(datetypeSections, `### Pre Class\n`, output);
                    }

                    // generate in class section
                    if (datetype.general.inClass && 
                        datetype.dsa.inClass && 
                        datetype.css.inClass &&
                        datetype.ux.inClass &&
                        datetype.projects.inClass) {
                            output = generateDatetypeSections(datetypeSections, `### In Class\n`, output);
                        }

                    // generate post class section
                    if (datetype.general.postClass && 
                        datetype.dsa.postClass && 
                        datetype.css.postClass &&
                        datetype.ux.postClass &&
                        datetype.projects.postClass) {
                            output = generateDatetypeSections(datetypeSections, `### Post Class\n`, output);
                        }

                    // generate project start section
                    output = generateProjectNotifications (projectstart, projectdue, projectstart, output); 

                    // generate holidays
                } else {
                    output = generateHolidayDays(datetype, output);
                }
            }
        }
    
    }
    console.log('output', output);
    fs.writeFile(`src/markdown/${data.courseName}.md`, output, (writeErr) => {
        if (writeErr) {
            console.error('Writing error', writeErr);
        }
    });
}

fs.readFile(filename, 'utf8', whenFileIsRead);