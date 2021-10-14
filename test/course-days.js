var fs = require('fs');
var faker = require('faker');
var moment = require('moment');

/*
 * this file creates fake test data for the scheduler
 * each day has at least one course day object
 */

const createLink = () => {
  return {
    name: faker.hacker.phrase(),
    url: faker.internet.url()
  };
};

const createLinkList = (count) => {
  if( count === undefined ){
    count = Math.floor( Math.random() * 5 );
  }

  // return an array of links of length count
  return [...Array(count).keys()].map( i => createLink() );
};

var date = moment();
const data = {days:[]};

for( let i=0; i<60; i++){

  let dateString = date.format('DD-MM-YYYY');

  const dateObj = {
    courseDay: i+1,
    dateTypes:{}
  };

  const dateObjGen = {
    type: 'general',
    preClass:createLinkList(),
    inClass:createLinkList(1),
    postClass:createLinkList()
  }

  dateObj.dateTypes['general'] = dateObjGen;

  if( i>=10 && i%10 === 0){

    let section = i / 10;

    dateObj.dateTypes['title'] = {
      type: 'title',
      text: `Module :${section}`
    };
  }

  if( i<10 ){

    const dateObjAlgos = {
      type: 'algos',
      preClass:createLinkList(),
      inClass:createLinkList(1),
      postClass:createLinkList()
    }
    dateObj.dateTypes['algos'] = dateObjAlgos;

    const dateObjUx = {
      type: 'ux',
      preClass:createLinkList(),
      inClass:createLinkList(1),
      postClass:createLinkList()
    }

    dateObj.dateTypes['ux'] = dateObjUx;
  }

  data.days.push(dateObj);
}

const jsonContentStr = JSON.stringify(data);
// Write JSON string to target file

fs.writeFile('src/data/course-days.json', jsonContentStr, (writeErr) => {
  if (writeErr) {
    console.error('Writing error', writeErr);
  }
});
