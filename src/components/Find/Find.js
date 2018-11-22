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
      rating: '',
    };
  }
  componentDidMount() {
    this.getBrands();
    this.getData();
  }

  getBrands() {
    fetch('https://thereportoftheweek-api.herokuapp.com/reports')
      .then(response => response.json())
      .then(items => items.filter(item => item.rating).map(item => item.manufacturer))
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

  filterByRating = event => {
    this.setState({ rating: event.target.value.slice(0, 1) }, () => {
      const filtered = this.state.items.filter(item => item.rating >= this.state.rating);
      this.setState({ filtered });
    });
  };

  render() {
    return (
      <div className="container">
        <h1>Find a Review</h1>
        <div className="Find">
          <input type="text" placeholder="Filter by Title" onChange={this.filterByText} value={this.state.text} />
          <select className="brand-select" onChange={this.filterByBrand}>
            <option>Filter by Brand</option>
            {this.state.brands.map(brand => (
              <option key={brand}>{brand}</option>
            ))}
          </select>
          <select onChange={this.filterByRating}>
            <option>Filter by Rating</option>
            <option>1+</option>
            <option>2+</option>
            <option>3+</option>
            <option>4+</option>
            <option>5+</option>
            <option>6+</option>
            <option>7+</option>
            <option>8+</option>
            <option>9+</option>
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
        <hr />
        <p className="footer-text">
          Developed by <a href="http://www.jsrath.com">jsrath</a>
        </p>
      </div>
    );
  }
}

export default Find;
