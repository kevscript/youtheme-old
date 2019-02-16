import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import deepPurple from '@material-ui/core/colors/deepPurple'

import CreateThemeModal from '../CreateThemeModal'
import AddChannelModal from '../AddChannelModal'
import ThemesList from '../ThemesList'



const styles = () => ({
  bodyContainer: {
    width: '100%',
    height: '100vh'
  },
  appBar: {
    height: '64px',
    boxShadow: 'none',
    background: deepPurple[500],
  },
  toolBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    margin: '0 auto',
  },
  toolBarRight: {
    display: 'flex'
  },
  addButton: {
    marginRight: '20px',
  },
  themesListContainer: {
    width: '30%',
    height: 'calc(100vh - 64px)',
    minWidth: '250px',
    maxWidth: '300px',
    boxShadow: '2px 0px 5px 1px rgba(0,0,0,0.1)'
  },
})

const App = (props) => {
    const { classes } = props

    // HOOKS
    const [themes, setThemes] = useState([])
    const [themeName, setThemeName] = useState('')
    const [channelName, setChannelName] = useState('')
    const [channelUrl, setChannelUrl] = useState('')
    const [selectedTheme, setSelectedTheme] = useState('')

    const [openTheme, setOpenTheme] = useState(false)
    const [openChannel, setOpenChannel] = useState(false)

    // FUNCTIONS
    const handleOpenThemeModal = () => {setOpenTheme(true)}
    const handleCloseThemeModal = () => {setOpenTheme(false)}

    const handleCloseChannelModal = () => {setOpenChannel(false)}

    const handleThemeName = (e) => {setThemeName(e.target.value)}
    const handleChannelName = (e) => {setChannelName(e.target.value)}
    const handleChannelUrl = (e) => {setChannelUrl(e.target.value)}

    const handleSelectedTheme = (e) => {
      setOpenChannel(true)
      setSelectedTheme(e.target.getAttribute("data-theme"))
    }

    const addTheme = (e) => {
      if (themeName !== '' && !themes.find(el => el.name === themeName)) {
        let newThemes = [...themes]
        setThemes([
          ...newThemes,
          {
            name: themeName,
            channels: [],
            open: false
          }
        ])
        setThemeName('')
        handleCloseThemeModal()
      }
    }

    const addChannel = () => {
      let newThemes = [...themes]
      let currentTheme =  newThemes.find(theme => theme.name === selectedTheme) || ''
      if (channelName !== '' && channelUrl !== '' && currentTheme) {
        currentTheme.channels = [...currentTheme.channels, { name: channelName, url: channelUrl }]
        setThemes([...newThemes])
        setChannelName('')
        setChannelUrl('')
        setSelectedTheme('')
        handleCloseChannelModal()
      }
    }

    const expandThemeOnClick = (e) => {
      e.stopPropagation()
      let current = e.currentTarget.getAttribute("data-key")
      let newThemes = [...themes]
      let currentTheme = newThemes.find(theme => theme.name === current) || ''
      currentTheme.open = !currentTheme.open
      setThemes([...newThemes])
    }

    return (
      <div className={classes.bodyContainer}>
        <CssBaseline/>

        <AppBar className={classes.appBar} position="sticky">
          <Toolbar className={classes.toolBar}>
            <Typography variant="h6" color="inherit">
              YouTheme
            </Typography>
            <div className={classes.toolBarRight}>
              <Button 
                className={classes.addButton} 
                color="inherit" variant="outlined" 
                onClick={handleOpenThemeModal}>
                Add Theme
              </Button>
              <Button color="inherit">Login</Button>
            </div>
          </Toolbar>
        </AppBar>

        <CreateThemeModal
          open={openTheme} 
          closeModal={handleCloseThemeModal} 
          themeName={themeName}
          handleThemeName={handleThemeName}
          addTheme={addTheme}
        />

        <AddChannelModal
          open={openChannel}
          closeModal={handleCloseChannelModal}
          channelName={channelName}
          handleChannelName={handleChannelName}
          channelUrl={channelUrl}
          handleChannelUrl={handleChannelUrl}
          addChannel={addChannel}
        />
        <div className={classes.themesListContainer}>
          <ThemesList 
            themes={themes}
            handleSelectedTheme={handleSelectedTheme}
            expandThemeOnClick={expandThemeOnClick}
          />
        </div>
      </div>
    )
  }


export default withStyles(styles)(App)
