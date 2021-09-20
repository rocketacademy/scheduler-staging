import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

// moves items to a specific date in the schedule
function ShiftItemModal({
  show,
  onHide,
  shiftitem,
  bootcampdata,
  setbootcampdata,
  sectiontype,
  classtype,
  classindex,
  section,
  setDaysInBatchFile,
  setDaysInMainFile
}) {
  const [selectedDate, setSelectedDate] = useState("");

  const handleSubmitDate = (e) => {
    e.preventDefault();
    // finding the selected item in the data file
    let selectedItem = sectiontype[classtype].items[classindex];
    // removing it from it's original position
    sectiontype[classtype].items.splice(classindex, 1);

    // if items array is empty after removing selected item, remove empty items array
    if (sectiontype[classtype].items.length === 0) {
      delete sectiontype[classtype].items;
    }
    // this is where we want to move the item to
    const targetDay = bootcampdata[selectedDate].dateTypes[section];

    // checking to see if items array exists at destination, if not, an empty array called items is added
    if (!targetDay[classtype].items) {
      targetDay[classtype].items = [];
    }

    // selected item is push into items array at destination
    targetDay[classtype].items.push(selectedItem);

    // depending on whether the main (array) or individual (object) schedule files were updated, new version of data file is saved
    bootcampdata.constructor === Array
      ? setDaysInMainFile([...bootcampdata])
      : setDaysInBatchFile({...bootcampdata})
  };

  return (
    <Modal
      show={show}
      shiftitem={shiftitem}
      onHide={onHide}
      size="lg"
      aria-labelledby="item-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="item-modal">Moving item ...</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Select
            className="mb-3"
            aria-label="days"
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option>--</option>
            {shiftitem.dates.map((date) => {
              if (typeof date === "number") {
                return (
                  <>
                    <option value={date}>
                      Day {bootcampdata[date].courseDay}
                    </option>
                    ;
                  </>
                );
              } else {
                return (
                  <>
                    <option value={date}>{date}</option>;
                  </>
                );
              }
            })}
          </Form.Select>
          <Button
            variant="primary"
            type="submit"
            onClick={(e) => handleSubmitDate(e)}
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ShiftItemModal;
