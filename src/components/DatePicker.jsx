import React , { useState } from 'react';
import generateDataObject from '../logicModule';

const DatePicker = ({setJsonContent, setFileName}) => {
    const [startDate, setStartDate] = useState('');
    const [courseName, setCourseName] = useState('');
    const [courseType, setCourseType] = useState('');
    
    const handleSubmit = () => {
        const data = generateDataObject(startDate, courseName, courseType, setFileName);
        console.log('data', data);

        const jsonContentStr = JSON.stringify(data);
        setJsonContent(jsonContentStr);
    }

    return (
        <>
        <div>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
            <input type="number" value={courseName} onChange={(e) => setCourseName(e.target.value)} />
        </div>
        <div>
            <select name="courseType" onChange={(e) => setCourseType(e.target.value)}>
                <option>select course type</option>
                <option value="Bootcamp">Bootcamp</option>
                <option value="Basics">Basics</option>
            </select>
        </div>
        <div>
            <button onClick={handleSubmit}>Submit</button>
        </div>
        </>
    )
}

export default DatePicker;
