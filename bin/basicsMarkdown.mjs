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
            sectionString = '### Pre Class:\n';
        } else if (sectionName === 'inclass') {
            sectionString = '### In Class:\n';
        } else if (sectionName === 'postclass') {
            sectionString = '### Post Class:\n';
        } else if (sectionName === 'projectdue') {
            sectionString = '### Project Due:\n';
        } else if (sectionName === 'projectstart') {
            sectionString = '### Project Start:\n';
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
        let displayWeek = ['-', '-', '-'];
        // each element in each subarray of weekDates is compared to the element in the same index
        // position in dayNumbers array
        for (let m = 0; m < weekDates[n].length; m += 1) {
            for (let p = 0; p < dayNumbers.length; p += 1) {
                // if element.dayNumber === element at the same index position in dayNumbers array 
                if (data.days[weekDates[n][m]].dayNumber === dayNumbers[p]) {
                    if (data.days[weekDates[n][m]].dateTypes.title) {
                        // the '-' in displayWeek is replaced by the dateString
                        const dateString = DateTime.fromISO(data.days[weekDates[n][m]].meetingDateTimeUTC).toFormat('d MMM');
                        displayWeek[p] = `[${dateString}](#courseDay${data.days[weekDates[n][m]].courseDay})`;
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
    output += '\n| :---: | :---: | :---: | :---: |\n';

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
            // getting the date/time from utc string
            localDate = DateTime.fromISO(data.days[dates[i]].meetingDateTimeUTC).toFormat('EEE d MMM');
            output += `# ${localDate}, Week ${data.days[dates[i]].courseWeek}, Course Day ${data.days[dates[i]].courseDay} {#courseDay${data.days[dates[i]].courseDay}}:`;
            // adding title to heading
            output += ` ${data.days[dates[i]].dateTypes.title}\n`;
            // getting meeting time
            const localTime = DateTime.fromISO(data.days[dates[i]].meetingDateTimeUTC).toFormat('t');
            output += `Meeting time: ${localTime} `;
            const timeZone = DateTime.fromISO(data.days[dates[i]].meetingDateTimeUTC).toFormat('z');
            if (timeZone === 'Asia/Singapore') {
                output += 'SGT ';
            }
            const timeOffset = DateTime.fromISO(data.days[dates[i]].meetingDateTimeUTC).toFormat('ZZZZ');
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
        if (generalDateTypes) {
            const sectionNames = ['projectdue', 'preclass', 'inclass', 'postclass', 'projectstart'];
            const sectionTypes = [ generalDateTypes.projectDue, generalDateTypes.preClass, generalDateTypes.inClass, generalDateTypes.postClass, generalDateTypes.projectStart];
            for (let t = 0; t < sectionNames.length; t += 1) {
                output += generateSectionList(sectionNames[t], sectionTypes[t]);
            }
        };
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
    let output = '# Course Dates\n';

    // add course table to output
    output = generateCourseDaysTable(output);
    output += '\n';

    // add course data to output
    output = generateCourseData(output, data);
    console.log(output);

    fs.writeFile(`src/markdown/${data.courseName}.md`, output, (writeErr) => {
        if (writeErr) {
            console.error('Writing error', writeErr);
        }
    });
}

fs.readFile(filename, 'utf8', whenFileIsRead);