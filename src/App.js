import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }
  componentDidMount() {
    fetch('https://thereportoftheweek-api.herokuapp.com/reports')
      .then(response => response.json())
      .then(items => this.setState({ items }));
  }

  render() {
    return (
      <div className="App">
        {this.state.items.map(item => (
          <p>{item.videoTitle}</p>
        ))}
      </div>
    );
  }
}

export default App;
