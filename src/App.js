import React, { Component } from 'react';
import Header from './components/Header/Header';
import New from './components/New/New';
import Top from './components/Top/Top';
import Find from './components/Find/Find';
import ModalVideo from 'react-modal-video';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      videoId: '',
    };
  }

  openModal = event => {
    console.log(event.target);
    const videoId = event.target.dataset.videoid;
    this.setState({ videoId }, () => this.setState({ isOpen: true }));
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div className="top-section">
          <hr />
          <New openModal={this.openModal} />
          <Top openModal={this.openModal} />
        </div>
        <Find openModal={this.openModal} />
        <ModalVideo
          channel="youtube"
          isOpen={this.state.isOpen}
          videoId={this.state.videoId}
          onClose={() => this.setState({ isOpen: false })}
        />
      </div>
    );
  }
}

export default App;
