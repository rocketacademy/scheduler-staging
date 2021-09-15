import React from "react";
import Nav from "react-bootstrap/Nav";
import { scroller } from "react-scroll";

function Modules({ scheduleData, coursetype }) {
  const moduleNameArray = [];
  const scheduleUrls = [];
  const scheduleObjs = [];

  Object.keys(scheduleData).map((day) => {
    if (scheduleData[day].dateTypes.module) {
      Object.keys(scheduleData[day].dateTypes)
      .filter(section => section !== 'module')
      .map((section) => {
        Object.keys(scheduleData[day].dateTypes[section])
        .filter(classtype => classtype !== 'type')
        .map((classtype) => {
          if (scheduleData[day].dateTypes[section][classtype].items) {
            scheduleData[day].dateTypes[section][classtype].items.map((item) => {
              if(item.url && !scheduleUrls.includes(item.url)) {
                scheduleUrls.push(item.url);
                scheduleObjs.push({name: item.name, url: item.url, date: day});
              }
              if (item.url) {
                const itemUrlArray = item.url.split('/');
                if (!moduleNameArray.includes(itemUrlArray[3]) && itemUrlArray[2] === 'bootcamp.rocketacademy.co') {
                  moduleNameArray.push(itemUrlArray[3]);
                }
              }
            })
          }
        })
      })
    }
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
                // const moduleArray = [];
                if (urlModule[3] === moduleName) {
                 
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
                }

              )

              return (
                <>
                <h6 className="sidebar-subheading">{moduleName}</h6>
                     {general.length > 0 && (
                       <>
                       {general.map((info) => {
                        const id = `${coursetype}-week-${scheduleData[info.date].courseWeek}-day-${scheduleData[info.date].dayNumber}`;

                         return (
                          <Nav.Link
                         onClick={() =>
                           scroller.scrollTo(id, {
                             smooth: true,
                             offset: -70,
                             duration: 100,
                           })
                         }
                         >
                           {info.name}
                         </Nav.Link>
                         )
                         
                       })}
                       </>
                     )}
                     {ice.length > 0 && (
                       <>
                       {ice.map((info) => {
                        const id = `${coursetype}-week-${scheduleData[info.date].courseWeek}-day-${scheduleData[info.date].dayNumber}`;

                         return (
                          <Nav.Link
                         onClick={() =>
                           scroller.scrollTo(id, {
                             smooth: true,
                             offset: -70,
                             duration: 100,
                           })
                         }
                         >
                           {info.name}
                         </Nav.Link>
                         )
                         
                       })}
                       </>
                     )}
                     {poce.length > 0 && (
                       <>
                       {poce.map((info) => {
                        const id = `${coursetype}-week-${scheduleData[info.date].courseWeek}-day-${scheduleData[info.date].dayNumber}`;

                         return (
                          <Nav.Link
                         onClick={() =>
                           scroller.scrollTo(id, {
                             smooth: true,
                             offset: -70,
                             duration: 100,
                           })
                         }
                         >
                           {info.name}
                         </Nav.Link>
                         )
                         
                       })}
                       </>
                     )}
                    
                   </>
              )
            }
        )}
      </Nav>
    </div>
  );
}

export default Modules;


// const id = `${coursetype}-week-${scheduleData[urlObj.date].courseWeek}-day-${scheduleData[urlObj.date].dayNumber}`;
//                   return (
//                     <>
//                     {general.length > 0 && (
//                       <>
//                       {general.map((name) => {
//                         <Nav.Link
//                         onClick={() =>
//                           scroller.scrollTo(id, {
//                             smooth: true,
//                             offset: -70,
//                             duration: 100,
//                           })
//                         }
//                         >
//                           {name}
//                         </Nav.Link>
//                       })}
//                       </>
//                     )}
                    
//                   </>
//                   )