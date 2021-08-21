import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { scroller } from 'react-scroll';

function Modules({ scheduleData }) {

    const moduleArray = [];

    Object.keys(scheduleData).map((day) => {
        if (scheduleData[day].dateTypes.module) {
            if (!moduleArray.includes(scheduleData[day].dateTypes.module)) {
                moduleArray.push(scheduleData[day].dateTypes.module);
            }
        }
    })

    moduleArray.unshift('Module 0: Language and Tooling');

    console.log(moduleArray);
    return (
        <div>
            <h3>Modules</h3>
            <Nav className="flex-column">
            {moduleArray.map((moduleName) => {
                return (
                    <>
                    <h6>{moduleName}</h6>
                    {Object.keys(scheduleData).map((day) => {
                        return (
                            <>
                            {scheduleData[day].dateTypes.module && (
                               scheduleData[day].dateTypes.general.preClass.items && (
                                  scheduleData[day].dateTypes.general.preClass.items.filter(item => Number(item.name.slice(0, 1)) === moduleArray.indexOf(moduleName)).map((item, index) => {
                                      const id = `week-${scheduleData[day].courseWeek}-day-${scheduleData[day].dayNumber}-gpc-${index}`;
                                      return (
                                       <p id={id}>{item.name}</p>
                                      )
                               })
                                  
                               )
                            )}
                            </>
                        )
                    })}
                    </>
                )
            })}
            </Nav>
        </div>
    )
}

export default Modules
