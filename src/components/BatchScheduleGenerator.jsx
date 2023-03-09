import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import download from "../download.js";
import generateScheduleData from "../generateScheduleData.js";

// Generate course schedule based on start date and course type from schedule template
const BatchScheduleGenerator = () => {
  // inputs from user used to generate course data
  const [startDate, setStartDate] = useState("");
  const [batchNum, setBatchNum] = useState("");
  const [courseType, setCourseType] = useState("");

  // function that generates and downloads schedule data when download button is clicked
  const handleDownload = () => {
    const scheduleData = generateScheduleData(startDate, batchNum, courseType);
    download(scheduleData, `${scheduleData.courseName}.json`);
  };

  return (
    <div className="data-shift">
      <div className="data-container">
        <div className="date-picker">
          <div>
            <h2>Generate Schedule Data File</h2>
          </div>
          <div className="input-form-container">
            <Form className="input-form">
              <div className="input-fields">
                <Form.Group className="mb-3 input" controlId="formDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 input" controlId="formBatchNumber">
                  <Form.Label>Batch Number</Form.Label>
                  <Form.Control
                    type="number"
                    value={batchNum}
                    onChange={(e) => setBatchNum(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3 input" controlId="formBatchNumber">
                  <Form.Label>Course Type</Form.Label>
                  <Form.Select
                    aria-label="course-type"
                    onChange={(e) => setCourseType(e.target.value)}
                  >
                    <option>Select course type</option>
                    <option value="FTBC">FTBC</option>
                    <option value="PTBC">PTBC</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </Form>
            <div className="submit-button-container">
              <Button
                className="create-file"
                variant="primary"
                type="submit"
                onClick={() => {
                  handleDownload();
                }}
              >
                Download Schedule
              </Button>
            </div>
            <br></br>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchScheduleGenerator;
