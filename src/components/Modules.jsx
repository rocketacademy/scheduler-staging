import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { scroller } from 'react-scroll';

function Modules({ scheduleData }) {

    const moduleArray = [];

    // getting names of all modules
    Object.keys(scheduleData).map((day) => {
        if (scheduleData[day].dateTypes.module) {
            if (!moduleArray.includes(scheduleData[day].dateTypes.module)) {
                moduleArray.push(scheduleData[day].dateTypes.module);
            }
        }
    })

    // adding name of module that is not included in schedule data
    moduleArray.unshift('Module 0: Language and Tooling');

    return (
        <div className="sidebar-modules">
            <h4>Modules</h4>
            <Nav className="flex-column">
            {moduleArray.map((moduleName) => {
                return (
                    <>
                    <h6 className="sidebar-subheading">{moduleName}</h6>
                    {Object.keys(scheduleData).map((day) => {

                        return (
                            <>
                            {/* if day is not a holiday  */}
                            {scheduleData[day].dateTypes.module && 
                            // and there are items in generalPreclass
                            scheduleData[day].dateTypes.general.preClass.items && (
                                scheduleData[day].dateTypes.general.preClass.items &&
                                // and the number of the module matches the index number of the module in moduleArray, the item is rendered
                                scheduleData[day].dateTypes.general.preClass.items.filter(item => Number(item.name.slice(0, 1)) === moduleArray.indexOf(moduleName)).map((item, index) => {
                                    // id needed to link to table and sidebar
                                    const id = `week-${scheduleData[day].courseWeek}-day-${scheduleData[day].dayNumber}-gpc-${index}`;
                                    return (
                                    <Nav.Link
                                    onClick={() => scroller.scrollTo( id, {
                                        smooth: true,
                                        offset: -70,
                                        duration: 100,
                                    })}
                                    >
                                    {item.name}
                                    </Nav.Link>
                                    )
                            })
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
