import React, { Component } from 'react';
import './Top.css';

class Top extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top: [],
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch('https://rotw-api.herokuapp.com/reports')
      .then(response => response.json())
      .then(items => items.filter(item => item.rating))
      .then(items =>
        items.map(item => {
          item.rating = item.rating.toFixed(1);
          return item;
        }),
      )
      .then(items =>
        items
          .filter(item => item.rating)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 6),
      )
      .then(top => this.setState({ top }));
  }

  render() {
    return (
      <div className="Top">
        <h1>Top Rated</h1>
        <div className="top-container">
          {this.state.top.map(item => (
            <div className="top-images" key={item.videoCode}>
              <div data-videoid={item.videoCode} onClick={this.props.openModal} className="text-overlay">
                <p data-videoid={item.videoCode}>{item.videoTitle}</p>
              </div>
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

export default Top;
