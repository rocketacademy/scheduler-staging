import React from 'react';

function DisplaySection({ heading, sectionType, day }) {
    return (
        <div>
            <h5>{heading}</h5>
                <ul>
            {sectionType.map((item, index) => {
                let id;
                if (heading === 'Pre Class') {
                    id = `week-${day.courseWeek}-day-${day.dayNumber}-gpc-${index}`;
                } 

                return (
                    <>
                    {item.url && (
                        <li id={id}>
                            <a href={item.url}>{item.name}</a>
                        </li>
                    )}
                    {!item.url && (
                        <li>
                            {item.name}
                        </li>
                    )}
                    </>
                )
            })}
            </ul>
        </div>
    )
}

export default DisplaySection
