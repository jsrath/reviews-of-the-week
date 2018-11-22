import React, { Component } from 'react';
//import YouTube from 'react-youtube';
import './Find.css';

class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
    };
  }
  componentDidMount() {
    this.getData();
  }

  printStars(number) {
    return Array(Math.floor(number)).fill(<i className="fas fa-star" />);
  }

  getData() {
    fetch('https://thereportoftheweek-api.herokuapp.com/reports')
      .then(response => response.json())
      .then(items => items.map(item => item.manufacturer))
      .then(items => [...new Set(items)].sort((a, b) => a.localeCompare(b)))
      .then(brands => this.setState({ brands }));
  }

  render() {
    return (
      <div className="Find">
        <h1>Find a Review</h1>
        <input type="text" />
        <select className="brand-select">
          <option>Choose a Brand</option>
          {this.state.brands.map(brand => (
            <option>{brand}</option>
          ))}
        </select>
      </div>
    );
  }
}

export default Find;
