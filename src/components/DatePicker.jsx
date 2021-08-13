import React , { useState } from 'react';
import generateDataObject from '../generateCourseDates.js';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import download from '../download.js';

const DatePicker = () => {
    const [startDate, setStartDate] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseType, setCourseType] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const data = await generateDataObject(startDate, courseName, courseType);
        console.log('data', data);
            
        download(data, `${data.courseName}.json`);
        }
        catch (error) {
            console.log(error)
        }
    }

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
                    <option value="Bootcamp FT">Bootcamp FT</option>
                    <option value="Bootcamp PT">Bootcamp PT</option>
                </Form.Select>
                </Form.Group>
                <br></br>
                <div className="submit-button-container">
                    <Button variant="primary" type="submit" onClick={(e) => {handleSubmit(e)}}>
                        Download File
                    </Button>
                </div>
                </Form>
                <br></br>
                <br></br>
                <div>
                    <a href="https://github.com/rocketacademy/scheduler">link to GitHub repo</a>
                </div>
            </div>
        </div>
        </>
    )
}

export default DatePicker;
