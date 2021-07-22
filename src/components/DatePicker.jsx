import React , { useState } from 'react';
import generateDataObject from '../generateCourseDates.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const DatePicker = () => {
    const [startDate, setStartDate] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseType, setCourseType] = useState('');
    
    const download = (data) => {
    // from: https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    var dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", `${data.courseName}.json`);
    dlAnchorElem.click();
    };

    const handleSubmit = async () => {
        try {
            const data = await generateDataObject(startDate, courseName, courseType);
            console.log('data', data);
            
            download(data);
        } 
        catch (error) {
            console.log(error);
        }
    }

    console.log(startDate);
    console.log(courseName);
    console.log(courseType);
    return (
        <>
        <div  className="date-picker">
            <div>
                <h2>Course Schedule Markdown</h2>
            </div>
            <div className="input-form-container">
                <Form className="input-form">
                <Form.Group className="mb-3 input" controlId="formDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3 input" controlId="formBatchNumber">
                    <Form.Label>Batch Number</Form.Label>
                    <Form.Control type="number" value={courseName} onChange={(e) => setCourseName(e.target.value)}/>
                </Form.Group>

                <Form.Group className="mb-3 input" controlId="formBatchNumber">
                <Form.Label>Course Type</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setCourseType(e.target.value)}>
                    <option>Select course type</option>
                    <option value="Basics">Basics</option>
                    <option value="Bootcamp">Bootcamp</option>
                </Form.Select>
                </Form.Group>
                <br></br>
                <div className="submit-button-container">
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                        Download File
                    </Button>
                </div>
                </Form>
            </div>
        </div>
        </>
    )
}

export default DatePicker;
