import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ShiftItemModal({
  show,
  onHide,
  shiftitem,
  bootcampdatacopy,
  setbootcampdatacopy,
  sectiontype,
  classtype,
  classindex,
  section,
}) {
  const [selectedDate, setSelectedDate] = useState("");

  let heading;
  if (shiftitem.direction === "up") {
    heading = "Moving backward ";
  } else {
    heading = "Moving forward ";
  }

  const handleSubmitDate = (e) => {
    e.preventDefault();

    let selectedItem = sectiontype[classtype].items[classindex];

    console.log("selected item", selectedItem);

    sectiontype[classtype].items.splice(classindex, 1);

    // if items array is empty after removing selected item, remove empty items array
    if (sectiontype[classtype].items.length === 0) {
      delete sectiontype[classtype].items;
    }

    console.log(classtype);

    const targetDay = bootcampdatacopy[selectedDate].dateTypes[section];
    console.log(targetDay[classtype]);

    if (!targetDay[classtype].items) {
      targetDay[classtype].items = [];
    }

    targetDay[classtype].items.push(selectedItem);
    console.log(bootcampdatacopy);
    setbootcampdatacopy({ ...bootcampdatacopy });
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
        <Modal.Title id="item-modal">{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Select
            className="mb-3"
            aria-label="days"
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option>choose date</option>
            {shiftitem.dates.map((date) => {
              return (
                <>
                  <option value={date}>{date}</option>;
                </>
              );
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
