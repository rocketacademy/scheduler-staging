import React, { useState } from "react";
import generateDataObject from "../../../generateCourseDates.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import download from "../../../download.js";

const DatePicker = ({ setBootcampData }) => {
  // inputs from user used to generate course data
  const [startDate, setStartDate] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseType, setCourseType] = useState("");

  // function that generates and downloads schedule data when download button is clicked
  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const data = await generateDataObject(startDate, courseName, courseType);
      download(data, `${data.courseName}.json`);
    } catch (error) {
      console.log(error);
    }
  };

  // function that generates and renders schedule data when button is clicked
  const handleRender = async (e) => {
    e.preventDefault();
    try {
      const data = await generateDataObject(startDate, courseName, courseType);
      await setBootcampData(JSON.parse(JSON.stringify(data.days)));
    } catch (error) {
      console.log(error);
    }
  };

  const addToGitbook = async (e) => {
    e.preventDefault();
    try {
      const data = await generateDataObject(startDate, courseName, courseType);
      // from stackoverflow, https://stackoverflow.com/questions/58376758/how-to-copy-a-json-data-to-the-clipboard-with-the-button
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      // this copies the JSON data to clipboard with original formatting
      selBox.value = JSON.stringify(data, undefined, 2);
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);

      // opens a new window in the browser at specified address(gitbook create new page)
      window.open('https://github.com/rocketacademy/scheduler/new/main/src/data', "_blank")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="date-picker">
        <div>
          <h2>Generate Schedule Data File</h2>
        </div>
        <div className="input-form-container">
          <Form className="input-form">
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
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3 input" controlId="formBatchNumber">
              <Form.Label>Course Type</Form.Label>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setCourseType(e.target.value)}
              >
                <option>Select course type</option>
                <option value="Basics">Basics</option>
                <option value="Bootcamp FT">Bootcamp FT</option>
                <option value="Bootcamp PT">Bootcamp PT</option>
              </Form.Select>
            </Form.Group>
          </Form>
          <div className="submit-button-container">
            <Button
              className="create-file"
              variant="primary"
              type="submit"
              onClick={(e) => {
                handleRender(e);
              }}
            >
              Render Schedule
            </Button>
            <Button
              className="create-file"
              variant="primary"
              type="submit"
              onClick={(e) => {
                handleDownload(e);
              }}
            >
              Download Schedule
            </Button>
            <Button
              className="create-file"
              variant="primary"
              type="submit"
              onClick={(e) => {
                addToGitbook(e);
              }}
            >
              Add to Gitbook
            </Button>
          </div>
          <br></br>
          <div>
            <a href="https://github.com/rocketacademy/scheduler">
              link to GitHub repo
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DatePicker;
