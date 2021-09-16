import React from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Accordion from 'react-bootstrap/Accordion';
import { scroller } from "react-scroll";

// helper function for generating scheduleObjs array and moduleNameArray
const generatingDataArrays = (
                              scheduleData, 
                              day, 
                              section, 
                              classtype, 
                              scheduleUrls, 
                              scheduleObjs, 
                              moduleNameArray
                              ) => {
  if (scheduleData[day].dateTypes[section][classtype].items) {
    scheduleData[day].dateTypes[section][classtype].items.map((item) => {
      // if the item has a url
      if(item.url && !scheduleUrls.includes(item.url)) {
        // push the url into scheduleUrls
        scheduleUrls.push(item.url);
        // push item name, url and date into scheduleObjs
        scheduleObjs.push({name: item.name, url: item.url, date: day});
      }
      if (item.url) {
        const itemUrlArray = item.url.split('/');
        // itemUrlArray[3] is used as the heading of each module section
        // we're filtering out everythign that does not come from the gitbook 
        if (!moduleNameArray.includes(itemUrlArray[3]) && itemUrlArray[2] === 'bootcamp.rocketacademy.co') {
          moduleNameArray.push(itemUrlArray[3]);
        }
      }
    })
  }
}

// helper finction for accessing required items (items in each class of each section of each day)
const accessingRequiredItems = (
                              scheduleData, 
                              day, 
                              scheduleUrls, 
                              scheduleObjs, 
                              moduleNameArray
                              ) => {
  if (scheduleData[day].dateTypes.module) {
    Object.keys(scheduleData[day].dateTypes)
    // filtering out module key
    .filter(section => section !== 'module')
    .map((section) => {
      Object.keys(scheduleData[day].dateTypes[section])
      // filtering out type key
      .filter(classtype => classtype !== 'type')
      .map((classtype) => {
        // if there item array exists in a section, call the function that gets the required data
        generatingDataArrays(scheduleData, 
                            day, 
                            section, 
                            classtype, 
                            scheduleUrls, 
                            scheduleObjs, 
                            moduleNameArray);
        
      })
    })
  }
}
 
// ###################################################################
// ###################################################################

function Modules({ scheduleData, coursetype }) {
  const moduleNameArray = [];
  const scheduleUrls = [];
  const scheduleObjs = [];

  // looking through entire data file 
  Object.keys(scheduleData).map((day) => {
    accessingRequiredItems (
                            scheduleData, 
                            day, 
                            scheduleUrls, 
                            scheduleObjs, 
                            moduleNameArray
                            );
  })

  moduleNameArray.sort();
  
  return (
    <div className="sidebar-modules">
      <h4>Modules</h4>
      <Nav className="flex-column">
        {moduleNameArray.map((moduleName) => {
          const general = [];
          const poce = [];
          const ice = [];

          scheduleObjs.forEach((urlObj) => {
            const urlModule = urlObj.url.split('/');
            // this is the part of the url which we used to get the moduleName
            const urlModuleName = urlModule[3];
            if (urlModuleName === moduleName) {
              const splitName = urlObj.name.split('.');
              const dataObj = { name: urlObj.name, date: urlObj.date }
              if (splitName[1] === 'ICE') {
                ice.push(dataObj);
              } else if (splitName[1] === 'POCE') {
                poce.push(dataObj);
              } else {
                general.push(dataObj);
              }
            }
          })

          return (
            <>
            {/* <div className="module-section"> */}
            <h6 className="sidebar-subheading">{moduleName}</h6>
              <Accordion className="modules-accordion">
              {general.length > 0 && (
                <>
                <Accordion.Item eventKey="0">
                <Accordion.Header>General</Accordion.Header>
                <Accordion.Body>
                {general.map((info) => {
                const id = `${coursetype}-week-${scheduleData[info.date].courseWeek}-day-${scheduleData[info.date].dayNumber}`;
         
                  return (
                  <p onClick={() =>
                    scroller.scrollTo(id, {
                      smooth: true,
                      offset: -70,
                      duration: 100,
                    })
                  }
                  >
                    {info.name}
                  </p>
                  )
                })}
                </Accordion.Body>
                </Accordion.Item>
                </>
              )}
              {ice.length > 0 && (
                <>
                <Accordion.Item eventKey="1">
                <Accordion.Header>In Class</Accordion.Header>
                <Accordion.Body>
                {ice.map((info) => {
                const id = `${coursetype}-week-${scheduleData[info.date].courseWeek}-day-${scheduleData[info.date].dayNumber}`;
         
                  return (
                  <p onClick={() =>
                    scroller.scrollTo(id, {
                      smooth: true,
                      offset: -70,
                      duration: 100,
                    })
                  }
                  >
                    {info.name}
                  </p>
                  )
                })}
                </Accordion.Body>
                </Accordion.Item>
                </>
              )}
             {poce.length > 0 && (
                <>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Post Class</Accordion.Header>
                  <Accordion.Body>
                {poce.map((info) => {
                const id = `${coursetype}-week-${scheduleData[info.date].courseWeek}-day-${scheduleData[info.date].dayNumber}`;
         
                  return (
                  <p onClick={() =>
                    scroller.scrollTo(id, {
                      smooth: true,
                      offset: -70,
                      duration: 100,
                    })
                  }
                  >
                    {info.name}
                  </p>
                  )
                })}
                  </Accordion.Body>
                </Accordion.Item>
              </>
            )}
            {/* </div> */}
            </Accordion>
            </>
          )
          }
        )}
      </Nav>
    </div>
  );
}

export default Modules;


