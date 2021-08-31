import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { scroller } from "react-scroll";
import { DateTime } from "luxon";

// not being used at the moment
function DataShiftSidebar({ bootcampDataCopy }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChooseDate = (e) => {
    e.preventDefault();
    console.log("insede choose data");

    const editDate = DateTime.fromFormat(selectedDate, "yyyy-MM-dd").toFormat(
      "dd-MM-yyyy"
    );
    console.log(editDate);
    console.log(bootcampDataCopy);
    console.log(bootcampDataCopy[editDate]);
    let id;

    if (bootcampDataCopy[editDate] !== undefined) {
      setErrorMessage("");
      id = `schedule-week-${bootcampDataCopy[editDate].courseWeek}-day-${bootcampDataCopy[editDate].courseDay}`;

      scroller.scrollTo(id, {
        smooth: true,
        offset: -70,
        duration: 100,
      });
    } else {
      setErrorMessage(`${editDate} not found`);
    }
  };

  return (
    <div className="edit-schedule-container">
      <Form className="edit-schedule">
        <Form.Group className="mb-3 input" controlId="formDate">
          <Form.Label>Choose Date</Form.Label>
          <p className="error-message">{errorMessage}</p>
          <Form.Control
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </Form.Group>
        <div className="submit-button-container">
          <Button
            variant="info"
            type="submit"
            onClick={(e) => {
              handleChooseDate(e);
            }}
          >
            Go to Date
          </Button>
        </div>
      </Form>
      <br></br>
      <br></br>
    </div>
  );
}

export default DataShiftSidebar;
