import React from "react";

// displays items in a section's classes
function DisplaySection({ heading, sectionType, day }) {
  return (
    <div>
      <h6 className="class-header">{heading}</h6>
      <ul>
        {sectionType.map((item, index) => {
          let id;
          // id used for scrollTo function of sidebar modules
          if (heading === "Pre Class") {
            id = `week-${day.courseWeek}-day-${day.dayNumber}-gpc-${index}`;
          } else if (heading === "In Class") {
            id = `week-${day.courseWeek}-day-${day.dayNumber}-gic-${index}`;
          } else {
            id = `week-${day.courseWeek}-day-${day.dayNumber}-gpostc-${index}`;
          }

          return (
            <>
              {item.url && (
                <li id={id}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">{item.name}</a>
                </li>
              )}
              {!item.url && <li>{item.name}</li>}
            </>
          );
        })}
      </ul>
    </div>
  );
}

export default DisplaySection;
