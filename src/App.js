import logo from './logo.svg';
import React from 'react';
import './App.css';
import schedule from './data/data.json';
import DatePicker from './components/DatePicker.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <DatePicker />      
    </div>
  );
}

export default App;
