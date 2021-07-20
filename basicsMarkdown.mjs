import fs from 'fs';
import { DateTime } from 'luxon';

console.log('filename', process.argv[2]);
const filename = process.argv[2];

const whenFileIsRead = (error, content) => {
    if (error) {
        console.log('read error', error);
    }

    const data = JSON.parse(content);

    const dayNames = {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    }

    const dates = [];
    let dayNumbers = [];
    const daysOfWeek = [];

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

    const weekDates = [];
    let weekCount = 1;

    // getting last week of course
    const lastWeek = data.days[dates[dates.length -1]].courseWeek;

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
    const tableRows = [];
    for (let n = 0; n < weekDates.length; n += 1) {
        let displayWeek = ['-', '-', '-'];
        for (let m = 0; m < weekDates[n].length; m += 1) {
            for (let p = 0; p < dayNumbers.length; p += 1) {
                if (data.days[weekDates[n][m]].dayNumber === dayNumbers[p]) {
                    if (data.days[weekDates[n][m]].dateTypes.title) {
                        displayWeek[p] = `[${weekDates[n][m]}](#courseDay${data.days[weekDates[n][m]].courseDay})`;
                    } else {
                        displayWeek[p] = data.days[weekDates[n][m]].dateTypes.holidayType;
                    }
                }
            }
        }
        console.log('table rows', tableRows);
        tableRows.push(displayWeek);
    }

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

        console.log('dates', dates);
        console.log('length', Object.keys(data.days).length);

        let output = '';
        output += '# Course Dates\n| Week |';
        // schedule table header 
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

        // loop that generates the main part of the page
        for (let i = 0; i < Object.keys(data.days).length; i += 1) {
            let localDate;
            if (data.days[dates[i]].meetingDateTimeUTC) {
                // getting the date/time from utc string
                localDate = DateTime.fromISO(data.days[dates[i]].meetingDateTimeUTC).toFormat('EEE, d MMM');
                output += `# ${localDate} - Wk: ${data.days[dates[i]].courseWeek} Day: ${data.days[dates[i]].courseDay} {#courseDay${data.days[dates[i]].courseDay}}\n`;
                let localTime = DateTime.fromISO(data.days[dates[i]].meetingDateTimeUTC).toFormat('t (z)');
                output += `### Meeting time: ${localTime}\n`;
            } else {
                localDate = DateTime.fromFormat(data.days[dates[i]].courseDate, 'dd-MM-yyyy').toFormat('EEE, d MMM');
                output += `# ${localDate}\nweek: ${data.days[dates[i]].courseWeek} {#date${i}}\n`;
            }

            // get title of course day
            if (data.days[dates[i]].dateTypes.title) {
                output += `## ${data.days[dates[i]].dateTypes.title}\n`;
            } else {
                output += `## ${data.days[dates[i]].dateTypes.holidayType}: ${data.days[dates[i]].dateTypes.name}\n`;
            }

            // generate day's course material
            const generalDateTypes = data.days[dates[i]].dateTypes.general;
            if (generalDateTypes) {
                let projectDue = '';
                const typeProjectDue = generalDateTypes.projectDue;
                if (typeProjectDue.items.length > 0) {
                    projectDue += '#### Project Due:\n';
                }
                if (typeProjectDue) {
                    output += generateClassList (projectDue, typeProjectDue);
                }

                let preclass = '';
                const typePreClass = generalDateTypes.preClass;
                if (typePreClass.items.length > 0) {
                    preclass += '#### Pre Class:\n';
                }
                if (typePreClass) {
                    output += generateClassList (preclass, typePreClass);
                }

                let inclass = '';
                const typeInClass = generalDateTypes.inClass;
                if (typeInClass.items.length > 0) {
                    inclass += '#### In Class:\n';
                }
                if (typeInClass) {
                    output += generateClassList (inclass, typeInClass);
                }

                let postclass = '';
                const typePostClass = generalDateTypes.postClass;
                if (typePostClass.items.length > 0) {
                    postclass += '#### Post Class:\n';
                }
                if (typePostClass) {
                    output += generateClassList (postclass, typePostClass);
                }

                let projectStart = '';
                const typeProjectStart = generalDateTypes.projectStart;
                if (typeProjectStart.items.length > 0) {
                    projectStart += '#### Project Start:\n';
                }
                if (typeProjectStart) {
                    output += generateClassList (projectStart, typeProjectStart);
                }
            };
            output += '\n\n';
        } 
        console.log(output);

        fs.writeFile(`src/data/${data.courseName}.md`, output, (writeErr) => {
            if (writeErr) {
                console.error('Writing error', writeErr);
            }
        });
    }

fs.readFile(filename, 'utf8', whenFileIsRead);