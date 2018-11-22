import React, { Component } from 'react';
//import YouTube from 'react-youtube';
import './New.css';

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first: {},
      remaining: [],
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
      .then(items => items.sort((a, b) => b.dateReleased.localeCompare(a.dateReleased)).slice(0, 5))
      .then(items => {
        const [first, ...remaining] = items;
        return this.setState({ first, remaining });
      });
  }

  render() {
    return (
      <div className="New">
        <h1>Latest Reviews</h1>
        {this.state.first.rating && (
          <div className="new-top">
            <h4>{this.state.first.videoTitle}</h4>
            <button>Watch</button>
            <span className="stars">
              <i className="fas fa-star" />
              {this.state.first.rating}
            </span>
            <span className="label">{this.state.first.manufacturer}</span>
            <img
              alt={this.state.first.videoTitle}
              src={`https://img.youtube.com/vi/${this.state.first.videoCode}/maxresdefault.jpg`}
            />
            <div className="new-bottom">
              {this.state.remaining.map(item => (
                <div key={item._id} className="bottom-image">
                  <img alt={item.videoTitle} src={`https://img.youtube.com/vi/${item.videoCode}/mqdefault.jpg`} />
                  <span className="stars-bottom">
                    <i className="fas fa-star" />
                    {item.rating}
                  </span>
                  <span className="label-bottom">{item.manufacturer}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default New;
