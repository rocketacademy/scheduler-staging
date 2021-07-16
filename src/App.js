import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';
import schedule from './data/data.json';
import DatePicker from './components/DatePicker.jsx';
function App() {
  const [jsonContent, setJsonContent] = useState({});
  const [fileName, setFileName] = useState('');
  console.log( schedule );
  console.log('data in app.js', jsonContent);
  const day = schedule.dates[Object.keys(schedule.dates)[0]];

  const download = () => {
    // from: https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonContent);
    var dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", `${fileName}.json`);
    dlAnchorElem.click();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          First Schedule Date: {day.courseDate}
        </p>
        <p>
          First Schedule DateTime TZ: {day.meetingDateTimeUTC}
        </p>
        <p>
          First Schedule Genral Schedule In Class:
          <a href={day.dateTypes.general.inClass[0].url}>
            {day.dateTypes.general.inClass[0].name}
          </a>
        </p>
        <p>
          <button onClick={download}>
            download schedule
          </button>
        </p>
        <p>
          <DatePicker setJsonContent={setJsonContent} setFileName={setFileName} />
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
