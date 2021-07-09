import logo from './logo.svg';
import './App.css';
import schedule from './data/data.json';
import holidays from './data/static-dates.json';

function App() {

  console.log( schedule );
  const day = schedule.dates[Object.keys(schedule.dates)[0]];

  const download = () => {
    // from: https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(schedule));
    var dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "schedule-data.json");
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
