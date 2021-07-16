import fs from 'fs';

console.log('filename', process.argv[2]);
const filename = process.argv[2];

const whenFileIsRead = (error, content) => {
    if (error) {
        console.log('read error', error);
    }

    const data = JSON.parse(content);
    const day = {
        1: 'Monday',
        2:'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday'
    }

    const dates = [];
    Object.keys(data.days).forEach((date) => {
        dates.push(date);
    })

    console.log('dates', dates);
    console.log('length', Object.keys(data.days).length);
    let output = '';
    for (let i = 0; i < Object.keys(data.days).length; i += 1) {
        output += `# ${data.days[dates[i]].courseDate}\n### Week: ${data.days[dates[i]].courseWeek}\n### Day: ${day[data.days[dates[i]].dayNumber]}\n### WeekDay: ${data.days[dates[i]].courseWeek}.${data.days[dates[i]].weekDay}\n`;
        // console.log(data.days[dates[i]].dateTypes.general);
            if (data.days[dates[i]].dateTypes.general) {
                let preclass = '';
                preclass += '### Pre Class:\n';
                for (let j = 0; j < data.days[dates[i]].dateTypes.general.preClass.length; j +=1 ) {
                    preclass += `* [${data.days[dates[i]].dateTypes.general.preClass[j].name}](${data.days[dates[i]].dateTypes.general.preClass[j].url})\n`;
                    console.log('preclass', preclass);
                    if (j === data.days[dates[i]].dateTypes.general.preClass.length - 1) {
                        preclass += '### In Class:\n';
                    }
                } 

                let inclass = '';
                for (let j = 0; j < data.days[dates[i]].dateTypes.general.inClass.length; j +=1 ) {
                    inclass += `* ${data.days[dates[i]].dateTypes.general.inClass[j].name}\n`;
                    console.log('inclass', inclass);
                    if (j === data.days[dates[i]].dateTypes.general.inClass.length - 1) {
                        inclass += '### Post Class\n';
                    }
                } 

                let postclass = '';
                for (let j = 0; j < data.days[dates[i]].dateTypes.general.postClass.length; j +=1 ) {
                    postclass += `* ${data.days[dates[i]].dateTypes.general.postClass[j].name}\n`;
                    console.log('postclass', postclass);
                } 

                output += preclass;
                output += inclass;
                output += postclass;
            } 
        }
    console.log(output);

    fs.writeFile(`src/data/${data.courseName}.json`, output, (writeErr) => {
        if (writeErr) {
            console.error('Writing error', writeErr);
        }
    });

    }
    
    
    
    


fs.readFile(filename, 'utf8', whenFileIsRead);