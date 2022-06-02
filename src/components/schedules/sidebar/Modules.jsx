import React from "react";
import Nav from "react-bootstrap/Nav";
import Accordion from "react-bootstrap/Accordion";
import ModuleSection from "./ModuleSection";

// helper function for generating scheduleObjs array and moduleNameArray
const generatingDataArrays = (
  scheduleData,
  day,
  section,
  classtype,
  scheduleUrls,
  scheduleObjs,
  moduleNameArray
) => {
  if (scheduleData[day].dateTypes[section][classtype].items) {
    scheduleData[day].dateTypes[section][classtype].items.map((item) => {
      // if the item has a url
      if (item.url && !scheduleUrls.includes(item.url)) {
        // push the url into scheduleUrls
        scheduleUrls.push(item.url);
        // push item name, url and date into scheduleObjs
        scheduleObjs.push({ name: item.name, url: item.url, date: day });
      }
      if (item.url) {
        const itemUrlArray = item.url.split("/");
        // itemUrlArray[3] is used as the heading of each module section
        // we're filtering out everythign that does not come from the gitbook
        if (
          !moduleNameArray.includes(itemUrlArray[3]) &&
          itemUrlArray[2] === "bootcamp.rocketacademy.co"
        ) {
          moduleNameArray.push(itemUrlArray[3]);
        }
      }
    });
  }
};

// helper finction for accessing required items (items in each class of each section of each day)
const accessingRequiredItems = (
  scheduleData,
  day,
  scheduleUrls,
  scheduleObjs,
  moduleNameArray
) => {
  if (scheduleData[day].dateTypes.module) {
    Object.keys(scheduleData[day].dateTypes)
      // filtering out module key
      .filter((section) => section !== "module")
      .map((section) => {
        Object.keys(scheduleData[day].dateTypes[section])
          // filtering out type key
          .filter((classtype) => classtype !== "type")
          .map((classtype) => {
            // if there item array exists in a section, call the function that gets the required data
            generatingDataArrays(
              scheduleData,
              day,
              section,
              classtype,
              scheduleUrls,
              scheduleObjs,
              moduleNameArray
            );
          });
      });
  }
};

const sortScheduleObjs = (urlObj, moduleName, general, ice, poce) => {
  const urlModule = urlObj.url.split("/");
  // this is the part of the url which we used to get the moduleName
  const urlModuleName = urlModule[3];
  // if the module name in the url is the current moduleName
  if (urlModuleName === moduleName) {
    const splitName = urlObj.name.split(".");
    const dataObj = { name: urlObj.name, date: urlObj.date };
    // push the object into the relevant array
    if (splitName[1] === "ICE") {
      ice.push(dataObj);
    } else if (splitName[1] === "POCE") {
      poce.push(dataObj);
    } else {
      general.push(dataObj);
    }
  }
};

// ###################################################################
// ###################################################################

function Modules({ scheduleData, coursetype }) {
  const moduleNameArray = [];
  const scheduleUrls = [];
  const scheduleObjs = [];

  // looking through entire data file
  Object.keys(scheduleData).map((day) => {
    accessingRequiredItems(
      scheduleData,
      day,
      scheduleUrls,
      scheduleObjs,
      moduleNameArray
    );
  });

  moduleNameArray.sort();

  return (
    <div className="sidebar-modules">
      {moduleNameArray.length > 0 && <h4>Modules</h4>}
      <Nav className="flex-column">
        {moduleNameArray.map((moduleName) => {
          // creating array to store items of each section
          const general = [];
          const poce = [];
          const ice = [];

          // sort each object in scheduleObjs into one of 3 arrays, general, ice, poce
          scheduleObjs.forEach((urlObj) => {
            sortScheduleObjs(urlObj, moduleName, general, ice, poce);
          });

          const sectionArray = [];
          sectionArray.push(general);
          sectionArray.push(ice);
          sectionArray.push(poce);

          // names of each section
          const sectionNames = ["General", "In Class", "Post Class"];

          return (
            <>
              <h6>{moduleName}</h6>
              <Accordion>
                {sectionArray.map((section, index) => {
                  return (
                    <ModuleSection
                      section={section}
                      index={index}
                      sectionNames={sectionNames}
                      coursetype={coursetype}
                      scheduleData={scheduleData}
                    />
                  );
                })}
              </Accordion>
              <br />
            </>
          );
        })}
      </Nav>
    </div>
  );
}

export default Modules;
