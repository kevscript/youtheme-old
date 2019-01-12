import React, { Component } from 'react'
import API from '../keys'
import '../styles/App.css'

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
        },
        {
          theme: 'video games',
          selected: false,
          channels: [],
        },
        {
          theme: 'coding',
          selected: false,
          channels: [],
        }
      ],
      themeInput: '',
      channelInput: '',
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
      if (targetedTheme.selected = !targetedTheme.selected)

      this.setState({ themes: [...newThemesList] })
    }
  }

  handleThemeDelete = (e) => {}

  handleChannelInput = (e) => {this.setState({channelInput: e.target.value})}

  addChannel = (e) => {
    const { themes, channelInput } = this.state
    let themeName = e.target.getAttribute("data-theme")
    let newThemesList = themes

    let theTheme = newThemesList.find(el => el.theme === themeName)
    theTheme.channels = [...theTheme.channels, channelInput]

    this.setState({ 
      themes: [...newThemesList],
      channelInput: ''
    })
  }

  render() {
    const { data, themes, themeInput, channelInput } = this.state
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
            <ThemesList themes={themes} selectTheme={this.handleThemeSelect} />
          </section>
          <section className="main">
            <ThemeBox 
              themes={themes} 
              handleInput={this.handleChannelInput} 
              channelInput={channelInput}
              addChannel={this.addChannel}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
