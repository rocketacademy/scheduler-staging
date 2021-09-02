import React from "react";

// displays items in a section's classes
function DisplaySection({ heading, sectionType, day }) {
  return (
    <div>
      <h6>{heading}</h6>
      <ul>
        {sectionType.map((item, index) => {
          let id;
          // id used for scrollTo function
          if (heading === "Pre Class") {
            id = `week-${day.courseWeek}-day-${day.dayNumber}-gpc-${index}`;
          }

          return (
            <>
              {item.url && (
                <li id={id}>
                  <a href={item.url}>{item.name}</a>
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
