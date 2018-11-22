import React, { Component } from 'react';
import Header from './components/Header/Header';
import New from './components/New/New';
import Top from './components/Top/Top';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <div className="top-section">
          <hr />
          <New />
          <Top />
        </div>
      </div>
    );
  }
}

export default App;
