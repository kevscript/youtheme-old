import React, { Component } from 'react'
import API from '../keys'

import Header from './Header'
import VideosList from './VideosList'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: ''
    }
  }

  componentDidMount() {

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API.key}&channelId=UC29ju8bIPH5as8OGnQzwJyA&part=snippet,id&order=date&maxResults=50`)
      .then(res => res.json())
      .then(data => this.setState({
        data: data
      }))
      .catch(err => console.error(err))
  }

  render() {
    const { data } = this.state
    return (
      <div className="App">
        <Header />
        <VideosList videos={data.items}/>
      </div>
    );
  }
}

export default App;
