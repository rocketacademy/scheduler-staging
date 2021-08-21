import React from 'react';

function DisplaySection({ heading, sectionType}) {
    return (
        <div>
            <h4>{heading}</h4>
                <ul>
            {sectionType.map((item) => {
                return (
                    <>
                    {item.url && (
                        <li>
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
