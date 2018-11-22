import React, { Component } from 'react';
import './Find.css';

class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      text: '',
      items: [],
      filtered: [],
      brand: '',
    };
  }
  componentDidMount() {
    this.getBrands();
    this.getData();
  }

  getBrands() {
    fetch('https://thereportoftheweek-api.herokuapp.com/reports')
      .then(response => response.json())
      .then(items => items.map(item => item.manufacturer))
      .then(items => [...new Set(items)].sort((a, b) => a.localeCompare(b)))
      .then(brands => this.setState({ brands }));
  }

  getData() {
    fetch('https://thereportoftheweek-api.herokuapp.com/reports')
      .then(response => response.json())
      .then(items => items.filter(item => item.rating))
      .then(items => items.sort((a, b) => a.product.localeCompare(b.product)))
      .then(items => this.setState({ items, filtered: items.slice(0, 20) }));
  }

  filterByText = event => {
    this.setState({ text: event.target.value });
    const filtered = this.state.items.filter(item =>
      item.videoTitle.toLowerCase().includes(this.state.text.toLowerCase()),
    );
    this.setState({ filtered });
  };

  filterByBrand = event => {
    this.setState({ brand: event.target.value }, () => {
      const filtered = this.state.items.filter(item =>
        item.manufacturer.toLowerCase().includes(this.state.brand.toLowerCase()),
      );
      this.setState({ filtered });
    });
  };

  render() {
    return (
      <div className="container">
        <div className="Find">
          <h1>Find a Review</h1>
          <input type="text" onChange={this.filterByText} value={this.state.text} />
          <select className="brand-select" onChange={this.filterByBrand}>
            <option>Choose a Brand</option>
            {this.state.brands.map(brand => (
              <option>{brand}</option>
            ))}
          </select>
          <select>
            <option>Choose a Rating</option>
            <option>Under 5 Stars</option>
            <option>5+ Stars</option>
            <option>7+ Stars</option>
            <option>9+ Stars</option>
          </select>
        </div>
        <div className="display">
          {this.state.filtered.map(item => (
            <div className="videos" key={item._id}>
              <img
                key={item._id}
                alt={item.videoTitle}
                src={`https://img.youtube.com/vi/${item.videoCode}/mqdefault.jpg`}
              />
              <span className="stars-bottom">
                <i className="fas fa-star" />
                {item.rating}
              </span>
              <span className="label-bottom">{item.manufacturer}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Find;
