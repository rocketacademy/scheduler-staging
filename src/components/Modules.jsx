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
                            {scheduleData[day].dateTypes.module && 
                            scheduleData[day].dateTypes.general.preClass.items &&
                            (
                            scheduleData[day].dateTypes.general.preClass.items &&
                                scheduleData[day].dateTypes.general.preClass.items.filter(item => Number(item.name.slice(0, 1)) === moduleArray.indexOf(moduleName)).map((item, index) => {
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
