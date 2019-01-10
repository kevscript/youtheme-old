import React, { Component } from 'react';
import API from './keys';

class App extends Component {
  constructor() {
    super()

    this.state = {
      data: []
    }
  }

  componentDidMount() {

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API.key}&channelId=UC29ju8bIPH5as8OGnQzwJyA&part=snippet,id&order=date&maxResults=10`)
      .then(res => res.json())
      .then(data => this.setState({
        data: data
      }))
  }

  render() {
    return (
      <div className="App">
        Hi from App component
      </div>
    );
  }
}

export default App;
