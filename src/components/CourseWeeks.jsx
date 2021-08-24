import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { scroller } from 'react-scroll';

// one of the components in Sidebar
function CourseWeeks({ 
                    scheduleData, 
                    coursetype 
                    }) {

    
    const weeks = [];
    // getting all the week numbers
    Object.keys(scheduleData).forEach((day) => {
        if (!weeks.includes(scheduleData[day].courseWeek)) {
            weeks.push(scheduleData[day].courseWeek);
        }
    })

    const weeksInAMonth = [];
    // putting week numbers into subarrays and pushing them into weeksInAMonth
    while(weeks.length) {
    const weekNumbers = weeks.splice(0,4);
        weeksInAMonth.push(weekNumbers);
    }

    return (
        <div className="sidebar-courseweeks">
            <h4>Course Weeks</h4>
            <Nav variant="pills" defaultActiveKey="link-0" className="flex-column" navbarScroll="true" >
                <Nav.Item>
                        <Nav.Link eventKey="link-0"
                        // uses react-scroll library for scroll function
                        onClick={() => scroller.scrollTo( 'top', {
                            smooth: true,
                            offset: -70,
                            duration: 100,
                        })}
                        >
                        Schedule Table
                        </Nav.Link>
                        </Nav.Item>
                {weeksInAMonth.map((month, index) => {
                    // generating id that is linked to id of an element in main content of page
                    // on click, page will scroll to where the element is
                    const navId = `link-${index + 1}`;
                    const id = `${coursetype}-week-${month[0]}-day-1`;

                    return (
                        <Nav.Item>
                        <Nav.Link eventKey={navId}
                        // uses react-scroll library for scroll function
                        onClick={() => scroller.scrollTo( id, {
                            smooth: true,
                            offset: -70,
                            duration: 100,
                        })}
                        >
                        Weeks {month[0]} - {month[month.length - 1]}
                        </Nav.Link>
                        </Nav.Item>
                    )
                })}
            </Nav>
        </div>
    )
}

export default CourseWeeks
