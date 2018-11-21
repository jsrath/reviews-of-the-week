import React, { Component } from 'react';
import New from './components/New/New';
import Top from './components/Top/Top';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <New />
        <Top />
      </div>
    );
  }
}

export default App;
