import React, { Component } from 'react';
import YouTube from 'react-youtube';
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

  printStars(number) {
    return Array(Math.floor(number)).fill(<i className="fas fa-star" />);
  }

  render() {
    return (
      <div className="App">
        {this.state.items
          .sort((a, b) => b.dateReleased.localeCompare(a.dateReleased))
          .map(
            (item, index) =>
              index < 6 && (
                <div>
                  <h2>
                    {item.manufacturer} | {item.product}
                  </h2>
                  <p>Rating: {this.printStars(item.rating)}</p>
                  <YouTube videoId={item.videoCode} />
                </div>
              ),
          )}
      </div>
    );
  }
}

export default App;
