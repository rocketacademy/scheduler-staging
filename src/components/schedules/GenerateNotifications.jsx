import React from "react";
import DisplaySection from "./DisplaySection";

// if sections project due/ project start/ ip due exist in a course day,
// this function will generate a header and content for these sections
const GenerateNotifications = ({
  status,
  projectdue,
  ipdue,
  projectstart,
  day,
}) => {
  let heading;

  // generates header for the section
  if (status) {
    if (status.items) {
      if (status === projectdue) {
        heading = "Project Due";
      } else if (status === projectstart) {
        heading = "Project Start";
      } else if (status === ipdue) {
        heading = "Inteview Prep due";
      }
    }
  }

  return (
    <>
      {status &&
        status.items &&
        status.items.map((item) => {
          return (
            <li>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="notification-item"
              >
                <h6>{item.name}</h6>
              </a>
            </li>
          );
        })}
    </>
  );
};

export default GenerateNotifications;
