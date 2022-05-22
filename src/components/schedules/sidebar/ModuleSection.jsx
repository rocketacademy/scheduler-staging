import React from "react";
import Accordion from "react-bootstrap/Accordion";
import { scroller } from "react-scroll";

function ModuleSection({
  section,
  index,
  sectionNames,
  coursetype,
  scheduleData,
}) {
  return (
    <>
      {section.length > 1 && (
        <Accordion.Item eventKey={index}>
          <Accordion.Header>{sectionNames[index]}</Accordion.Header>
          <Accordion.Body>
            {section.map((info) => {
              const id = `${coursetype}-week-${
                scheduleData[info.date].courseWeek
              }-day-${scheduleData[info.date].dayNumber}`;

              return (
                <p
                  onClick={() =>
                    scroller.scrollTo(id, {
                      smooth: true,
                      offset: -70,
                      duration: 100,
                    })
                  }
                >
                  {info.name}
                </p>
              );
            })}
          </Accordion.Body>
        </Accordion.Item>
      )}
    </>
  );
}

export default ModuleSection;
