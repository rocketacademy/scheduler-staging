import React, { useState } from "react";
import generateDataObject from "../../../generateCourseDates.js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import download from "../../../download.js";
import generateBasicsMarkdown from "../../../generateBasicsMarkdown.js";

const DatePicker = ({ 
  setBootcampData, 
  setBatchFile
 }) => {
    // inputs from user used to generate course data
  const [startDate, setStartDate] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseType, setCourseType] = useState("");
  const [firstDay, setFirstDay] = useState(null);
  const [secondDay, setSecondDay] = useState(null);

  // function that generates and downloads schedule data when download button is clicked
  const handleDownload = () => {
    const data = generateDataObject(startDate, courseName, courseType, null, null);
    download(data, `${data.courseName}.json`);
  };

  // function that generates and renders schedule data when button is clicked
  const handleRender = () => {
    const data = generateDataObject(startDate, courseName, courseType, null, null);
    console.log('batch 4 data', data);
    setBootcampData(JSON.parse(JSON.stringify(data.days)));
    setBatchFile(JSON.parse(JSON.stringify(data)))
  };

  const addToGitHubRepo = () => {
      const data = generateDataObject(startDate, courseName, courseType, null, null);
      console.log('data', data);
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
      window.open('https://github.com/rocketacademy/scheduler/new/main/src/data', "_blank");
  }

  const generateMarkdown = () => {
      const dayNumbers = {
        'Monday': 1,
        'Tuesday': 2,
        'Wednesday': 3,
        'Thursday': 4,
        'Friday': 5,
        'Saturday': 6,
        'Sunday': 7
      };

      const lessonDays = [dayNumbers[firstDay], dayNumbers[secondDay]];
      let data = generateDataObject(startDate, courseName, courseType, null, lessonDays);
      data = generateBasicsMarkdown(data);
      console.log('data', data);
      // from stackoverflow, https://stackoverflow.com/questions/58376758/how-to-copy-a-json-data-to-the-clipboard-with-the-button
      let selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = data;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);

      // opens a new window in the browser at specified address(gitbook create new page)
      window.open('https://github.com/rocketacademy/basics-docs/new/master/course-logistics', "_blank")
    }

  return (
    <>
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
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3 input" controlId="formBatchNumber">
              <Form.Label>Course Type</Form.Label>
              <Form.Select
                aria-label="course-type"
                onChange={(e) => setCourseType(e.target.value)}
              >
                <option>Select course type</option>
                <option value="Basics">Basics</option>
                <option value="FTBC">FTBC</option>
                <option value="PTBC">PTBC</option>
              </Form.Select>
            </Form.Group>
            </div>
            {courseType === 'Basics' && (
              <div className="basics-days">
                <Form.Group className="mb-3 input" controlId="formBatchNumber">
                  <Form.Label>1st Course Day</Form.Label>
                  <Form.Select
                    aria-label="course-day-1"
                    onChange={(e) => setFirstDay(e.target.value)}
                  >
                    <option>Select day</option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 input" controlId="formBatchNumber">
                  <Form.Label>2nd Course Day</Form.Label>
                  <Form.Select
                    aria-label="course-day-2"
                    onChange={(e) => setSecondDay(e.target.value)}
                  >
                  <option>Select day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                  </Form.Select>
                </Form.Group>
              </div>
            )}
          </Form>
          <div className="submit-button-container">
            <Button
              className="create-file"
              variant="primary"
              type="submit"
              onClick={() => {
                handleRender();
              }}
            >
              Render Schedule
            </Button>
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
            <Button
              className="create-file"
              variant="primary"
              type="submit"
              onClick={() => {
                addToGitHubRepo();
              }}
            >
              Add to GitHub Repo
            </Button>
            <Button
              className="create-file"
              variant="primary"
              type="submit"
              onClick={() => {
                generateMarkdown();
              }}
            >
              Basics Markdown
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
