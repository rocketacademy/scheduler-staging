import logo from './logo.svg';
import './App.css';
import schedule from './data/data.json';

function App() {

  console.log( schedule );
  const day = schedule.dates[Object.keys(schedule.dates)[0]];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          First Schedule Date: {day.courseDay}
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
