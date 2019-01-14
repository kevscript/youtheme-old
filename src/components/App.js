import React, { Component } from 'react'
import '../styles/App.css'
import API from '../keys'

import ThemesList from './ThemesList'
import ThemeBox from './ThemeBox'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: {},
      themes: [
        {
          theme: 'sport',
          selected: true,
          channels: [],
          videos: [],
        },
        {
          theme: 'video games',
          selected: false,
          channels: [],
          videos: [],
        },
        {
          theme: 'coding',
          selected: false,
          channels: [],
          videos: []
        }
      ],
      themeInput: '',
      channelId: '',
      channelName: ''
    }
  }

  fetchChannelVideos = (channelId) => {
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API.key}&channelId=${channelId}&part=snippet,id&order=date&maxResults=5`)
    .then(res => res.json())
    .then(data => this.setState({data: data}))
    .catch(err => console.error(err))
  }

  handleNewThemeInput = (e) => { this.setState({themeInput: e.target.value}) }

  handleNewThemeAdd = () => {
    const { themes, themeInput } = this.state
    let match = themes.filter(el => el.theme === themeInput)
    if (match.length === 0) {
      this.setState((prevState) => ({
        themes: [
          ...prevState.themes,
          {
            theme: themeInput,
            selected: false,
            channels: []
          },
        ],
        themeInput: '',
      }))
    }
  }

  handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      this.handleNewThemeAdd()
    }
  }
  
  handleThemeSelect = (e) => {
    const { themes } = this.state
    if (e.target.className === "themes-item") {
      let themeName = e.target.getAttribute("data-key")
      let newThemesList = themes

      let prevSelectedTheme = newThemesList.find(el => el.selected === true)
      if (typeof prevSelectedTheme != "undefined") {
        prevSelectedTheme.selected = false 
      } 

      let targetedTheme = newThemesList.find(el => el.theme === themeName)
      targetedTheme.selected = !targetedTheme.selected

      this.setState({ themes: [...newThemesList] })
    }
  }

  handleChannelSelect = (e) => {
    const { themes } = this.state
    let newThemesList = themes
    let theTheme = newThemesList.find(el => el.selected === true)

    if (e.target.className === "channels-item") {
      let channelId = e.target.getAttribute("data-key")
      
      let prevSelectedChannel = theTheme.channels.find(el => el.selected === true)
      if(typeof prevSelectedChannel != 'undefined') {
        prevSelectedChannel.selected = false
      }

      let targetedChannel = theTheme.channels.find(el => el.id === channelId)
      targetedChannel.selected = !targetedChannel.selected

      this.fetchChannelVideos(channelId)
      this.setState({ themes: [...newThemesList] })
    }
  }

  handleChannelName = (e) => {this.setState({channelName: e.target.value})}
  handleChannelId = (e) => {this.setState({channelId: e.target.value})}

  addChannel = (e) => {
    const { themes, channelId, channelName } = this.state
    let themeName = e.target.getAttribute("data-theme")
    let newThemesList = themes

    let theTheme = newThemesList.find(el => el.theme === themeName)
    theTheme.channels = [
      ...theTheme.channels, 
      { name: channelName, id: channelId, selected: false }
    ]

    this.setState({ 
      themes: [...newThemesList],
      channelId: '',
      channelName: ''
    })
  }

  render() {
    const { data, themes, themeInput, channelId, channelName } = this.state
    return (
      <div className="App">
        <header className="header">
          <h1 className="header-title">Sortube</h1>
          <div className="header-form">
            <input 
              type="text" 
              className="header-input" 
              onKeyUp={this.handleEnterKey} 
              onChange={this.handleNewThemeInput} 
              value={themeInput}
            />
            <button className="header-button" onClick={this.handleNewThemeAdd}>Add Theme</button>
          </div>
        </header>
        <div className="main-container">
          <section className="sidebar">
            <ThemesList 
              themes={themes} 
              selectTheme={this.handleThemeSelect} 
            />
          </section>
          <section className="main">
            <ThemeBox 
              themes={themes} 
              handleId={this.handleChannelId} 
              handleName={this.handleChannelName}
              channelId={channelId}
              channelName={channelName}
              addChannel={this.addChannel}
              handleChannelSelect = {this.handleChannelSelect}
              videosData={data}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
