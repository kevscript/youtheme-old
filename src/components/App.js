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
          channels: []
        },
        {
          theme: 'video games',
          selected: false,
          channels: []
        },
        {
          theme: 'coding',
          selected: false,
          channels: []
        }
      ],
      themeInput: ''
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
            videos: []
          },
        ],
        themeInput: ''
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

  handleThemeDelete = (e) => {
    const { themes } = this.state
    let newThemesList = themes.filter(el => {
      return el.theme !== e.target.parentNode.parentNode.getAttribute("data-key")
    })
    this.setState({
      themes: newThemesList
    })
  }

  handleThemeEdit = (e) => {
    const { themes } = this.state

  }

  render() {
    const { data, themes } = this.state
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
              value={this.state.themeInput}
            />
            <button className="header-button" onClick={this.handleNewThemeAdd}>Add Theme</button>
          </div>
        </header>
        <div className="main-container">
          <section className="sidebar">
            <ThemesList themes={themes} selectTheme={this.handleThemeSelect} />
          </section>
          <section className="main">
            <ThemeBox editTheme={this.handleThemeEdit} themes={themes}/>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
