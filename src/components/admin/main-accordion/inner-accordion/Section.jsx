import React from "react";
import SectionClass from "./SectionClass";
import Accordion from "react-bootstrap/Accordion";

function Section({
  day,
  setBootcampData,
  section,
  sectionType,
  dayIndex,
  bootcampData,
}) {
  // variable classExists is created to track if any class of a section exists (it is initially set to false)
  // if any class of a section exists, classExists is set to true
  // if classExists is true, a header for this section will be created
  let classExists = false;
  if (sectionType.constructor === Object) {
    if (
      sectionType.preClass.items ||
      sectionType.inClass.items ||
      sectionType.postClass.items ||
      (sectionType === "projects" &&
        (sectionType.projectDue.items || sectionType.projectStart.items)) ||
      (sectionType === "cp" && sectionType.cpDue.items)
    ) {
      classExists = true;
    }
  }

  return (
    <div>
      {sectionType.constructor === Object && (
        <>
          <Accordion>
            {classExists && (
              <Accordion.Item eventKey="0">
                <Accordion.Header>{sectionType.type}</Accordion.Header>
                <Accordion.Body>
                  {Object.keys(sectionType)
                    .filter((sectionClass) => sectionType[sectionClass].items)
                    .map((sectionclass, sectionIndex) => {
                      return (
                        <div className="all-classes">
                          <SectionClass
                            day={day}
                            sectionIndex={sectionIndex}
                            sectionclass={sectionclass}
                            sectionType={sectionType}
                            bootcampData={bootcampData}
                            setBootcampData={setBootcampData}
                            section={section}
                            dayIndex={dayIndex}
                          />
                        </div>
                      );
                    })}
                </Accordion.Body>
              </Accordion.Item>
            )}
          </Accordion>
        </>
      )}
    </div>
  );
}

export default Section;
