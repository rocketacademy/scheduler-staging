import fs from 'fs';
import { DateTime } from 'luxon';

console.log('filename', process.argv[2]);
const filename = process.argv[2];

// helper function , generates list for pre-class, in-class, post-class
const generateClassList = (classList, classType) => {
    if (classType.mdText) {
        classList += classType.mdText;
    }

    if ( classType.items.length > 0) {
        for (let j = 0; j < classType.items.length; j +=1 ) {
            if (classType.items[j].url) {
                classList += `* [${classType.items[j].name}](${classType.items[j].url})\n`;
            } else {
                classList += `* ${classType.items[j].name}\n`;
            }  
        }
        classList += '\n';
    }
    return classList;
}

// helper function, generates content list for each section 
const generateSectionList = (sectionName, sectionType) => {
    let sectionString = '';
    if (sectionType.items.length > 0) {
        if (sectionName === 'preclass') {
            sectionString = '### Pre Class\n';
        } else if (sectionName === 'inclass') {
            sectionString = '### In Class\n';
        } else if (sectionName === 'postclass') {
            sectionString = '### Post Class\n';
        } 
    }
    
    sectionString = generateClassList (sectionString, sectionType);
    return sectionString;
}

// helper function to get arrays needed to generate markdown
const generateCourseArrays = (data) => {
    // get all course dates
    Object.keys(data.days).forEach((date) => {
        dates.push(date);
    })

    // all possible day numbers that course days fall on
    dates.forEach((date) => {
        dayNumbers.push(data.days[date].dayNumber);
    })
    dayNumbers = [...new Set(dayNumbers)].sort();

    // all possible names of days of week courdays fall on (this is the table header)
    dayNumbers.forEach((number) => {
        daysOfWeek.push(dayNames[number]);
    })

    // getting last week of course
    lastWeek = data.days[dates[dates.length -1]].courseWeek;

    // getting the dates the coursedays fall on for each week
    for  (let l = 0; l < lastWeek; l += 1) {
        const week = [];
        for (let k = 0; k < dates.length; k += 1) {
            if (data.days[dates[k]].courseWeek === weekCount) {
                week.push(data.days[dates[k]].courseDate);
            }
        }
        weekDates.push(week);
        weekCount += 1;
    }

    // getting rows of table
    // for each subarray in the weekDates array, displayWeek is initialised to ['-', '-', '-']
    for (let n = 0; n < weekDates.length; n += 1) {
        let displayWeek = [];
        dayNumbers.forEach((day) => {
            displayWeek.push('-');
        })
        
        // each element in each subarray of weekDates is compared to the element in the same index
        // position in dayNumbers array
        for (let m = 0; m < weekDates[n].length; m += 1) {
            for (let p = 0; p < dayNumbers.length; p += 1) {
                // if element.dayNumber === element at the same index position in dayNumbers array 
                if (data.days[weekDates[n][m]].dayNumber === dayNumbers[p]) {
                    if (data.days[weekDates[n][m]].dateTypes.title) {
                        // the '-' in displayWeek is replaced by the dateString
                        const dateString = DateTime.fromISO(data.days[weekDates[n][m]].meetingDateTimeUTC, { zone: 'Asia/Singapore' }).toFormat('d MMM');
                        displayWeek[p] = `[${dateString}](#course-day-${data.days[weekDates[n][m]].courseDay})`;
                    } else {
                        // if title of the day does not exist, it means it's a public holiday
                        displayWeek[p] = `${data.days[weekDates[n][m]].dateTypes.holidayType} (${data.days[weekDates[n][m]].dateTypes.location})`;
                    }
                }
            }
        }
        tableRows.push(displayWeek);
    }
}

// helper function that generates course days table marksown
const generateCourseDaysTable = (output) => {
    // schedule table header 
    output += '| Week |';
    for (let p = 0; p < daysOfWeek.length; p += 1) {
        output += ` ${daysOfWeek[p]} |`;
    }

    output += '\n| :---: |';
    for (let r = 0; r < daysOfWeek.length; r += 1) {
        output += ' :---: |';
    }

    output += '\n';

    // schedule table content
    for (let q = 0; q < tableRows.length; q += 1) {
        output += `| ${q} |`;
        for (let r = 0; r < tableRows[q].length; r += 1) {
            output += ` ${tableRows[q][r]} |`;
        }
        output += '\n';
    }
    return output;
}

// helper function that produces the main content of the page (in markdown)
const generateCourseData = (output, data) => {
    // loop that generates the main part of the page
    for (let i = 0; i < Object.keys(data.days).length; i += 1) {
        let localDate;
        // course day
        if (data.days[dates[i]].meetingDateTimeUTC) {
            // getting the date/time from utc string, timezone is manually set
            localDate = DateTime.fromISO(data.days[dates[i]].meetingDateTimeUTC, { zone: 'Asia/Singapore' });
            const formattedDate = localDate.toFormat('EEE d MMM');
            output += `# ${formattedDate}, Week ${data.days[dates[i]].courseWeek}, Course Day ${data.days[dates[i]].courseDay}{#course-day-${data.days[dates[i]].courseDay}}:`;
            // adding title to heading
            output += ` ${data.days[dates[i]].dateTypes.title}\n`;
            // getting meeting time
            const localTime = localDate.toFormat('t');
            output += `Meeting time: ${localTime} `;
            const timeZone = localDate.toFormat('z');
            // luxon does not provide abbreviated localised timezones
            if (timeZone === 'Asia/Singapore') {
                output += 'SGT ';
            }
            const timeOffset = localDate.toFormat('ZZZZ');
            output += `(${timeOffset})\n\n`;
        } else {
            // public holiday, as public holiday has no meeting time
            localDate = DateTime.fromFormat(data.days[dates[i]].courseDate, 'dd-MM-yyyy').toFormat('EEE, d MMM');
            output += `# ${localDate}: `;
            if (data.days[dates[i]].dateTypes.location === 'SG') {
                output += `Singapore `;
            }
            output += `${data.days[dates[i]].dateTypes.holidayType}, ${data.days[dates[i]].dateTypes.name}`;
        }

        // generate day's course material
        const generalDateTypes = data.days[dates[i]].dateTypes.general;
        const projectDateTypes = data.days[dates[i]].dateTypes.projects;

        if (projectDateTypes) {
            if (projectDateTypes.projectDue.items) {
                output += '### Project Due\n';
                output += `[${projectDateTypes.projectDue.items[0].name}](${projectDateTypes.projectDue.items[0].url})\n\n`;
            }
        }

        if (generalDateTypes) {
            const sectionNames = ['preclass', 'inclass', 'postclass'];
            const sectionTypes = [generalDateTypes.preClass, generalDateTypes.inClass, generalDateTypes.postClass];
            for (let t = 0; t < sectionNames.length; t += 1) {
                output += generateSectionList(sectionNames[t], sectionTypes[t]);
            }
        };

        if (projectDateTypes) {
            if (projectDateTypes.projectStart.items) {
                if (projectDateTypes.projectStart.items.length > 0) {
                output += '### Project Start\n';
                output += `[${projectDateTypes.projectStart.items[0].name}](${projectDateTypes.projectStart.items[0].url})\n\n`;
                }
            }
        }
        output += '\n\n';
    }
    return output;
}

const dayNames = {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    }

/* ###################################################
######################################################
################################################### */

const dates = [];
let dayNumbers = [];
const daysOfWeek = [];
const weekDates = [];
let weekCount = 1;
let lastWeek;
const tableRows = [];

const whenFileIsRead = (error, content) => {
    if (error) {
        console.log('read error', error);
    }

    const data = JSON.parse(content);

    // generate all arrays needed to produce markdown
    generateCourseArrays(data);
    
    // initialize output
    let output = '---\ndescription: What and when we will learn\n---\n# Course Dates\n';

    // add course table to output
    output = generateCourseDaysTable(output);
    output += '\n';

    // add course data to output
    output = generateCourseData(output, data);

    // add further reading section to the end of page
    output += '# Further Reading\n### Past Projects\n * [Drawing With Emojis](https://basics.rocketacademy.co/past-projects/drawing-with-emojis)\n * [Guess The Word](https://basics.rocketacademy.co/past-projects/guess-the-word)';
    console.log(output);

    // fs.writeFile(`src/markdown/${data.courseName}.md`, output, (writeErr) => {
    //     if (writeErr) {
    //         console.error('Writing error', writeErr);
    //     }
    // });
}

fs.readFile(filename, 'utf8', whenFileIsRead);