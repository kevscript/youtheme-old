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
      themes: [],
      themeInput: '',
      channelUrl: '',
      channelName: ''
    }
  }

  fetchChannelVideos = async (channelUrl) => {
    let channelUser = channelUrl.match(/user\/(.*)/)[1]
    let channelId = await fetch(`https://www.googleapis.com/youtube/v3/channels?key=${API.key}&forUsername=${channelUser}&part=id`)
      .then(res => res.json())
      .then(data => channelId = data.items[0].id)
      .catch(err => console.error(err))
    
    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API.key}&channelId=${channelId}&part=snippet,id&order=date&maxResults=5`)
      .then(res => res.json())
      .then(data => this.setState({data: data}))
      .catch(err => console.error(err))
  }

  handleNewThemeInput = (e) => { this.setState({themeInput: e.target.value}) }

  handleNewThemeAdd = () => {
    const { themes, themeInput } = this.state

    if (themes.length !== 0) {
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
    } else {
      this.setState({
        themes: [
          {
            theme: themeInput,
            selected: true,
            channels: []
          },
        ],
        themeInput: '',
      })
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

  handleThemeDelete = () => {
    const { themes } = this.state
    let themesCopy = themes
    let newThemes = themesCopy.filter(el => el.selected !== true)

    if (Object.keys(newThemes).length !== 0) {
      newThemes[0].selected = true
    }

    this.setState({ themes: [...newThemes]})
  }

  handleChannelSelect = (e) => {
    const { themes } = this.state
    let newThemesList = themes
    let theTheme = newThemesList.find(el => el.selected === true)

    if (e.target.className === "channels-item") {
      let channelUrl = e.target.getAttribute("data-key")
      
      let prevSelectedChannel = theTheme.channels.find(el => el.selected === true)
      if(typeof prevSelectedChannel != 'undefined') {
        prevSelectedChannel.selected = false
      }

      let targetedChannel = theTheme.channels.find(el => el.url === channelUrl)
      targetedChannel.selected = !targetedChannel.selected

      this.fetchChannelVideos(channelUrl)
      this.setState({ themes: [...newThemesList] })
    }
  }

  handleChannelName = (e) => {this.setState({channelName: e.target.value})}
  handleChannelUrl = (e) => {this.setState({channelUrl: e.target.value})}

  addChannel = (e) => {
    const { themes, channelUrl, channelName } = this.state
    let themeName = e.target.getAttribute("data-theme")
    let newThemesList = themes

    let theTheme = newThemesList.find(el => el.theme === themeName)
    theTheme.channels = [
      ...theTheme.channels, 
      { name: channelName, url: channelUrl, selected: false }
    ]

    this.setState({ 
      themes: [...newThemesList],
      channelUrl: '',
      channelName: ''
    })
  }

  render() {
    const { data, themes, themeInput, channelUrl, channelName } = this.state
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
              placeholder='theme name...'
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
              handleUrl={this.handleChannelUrl} 
              handleName={this.handleChannelName}
              channelUrl={channelUrl}
              channelName={channelName}
              addChannel={this.addChannel}
              handleChannelSelect = {this.handleChannelSelect}
              handleThemeDelete  ={this.handleThemeDelete}
              videosData={data}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
