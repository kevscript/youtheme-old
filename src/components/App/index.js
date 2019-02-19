import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import deepPurple from '@material-ui/core/colors/deepPurple'

import CreateThemeModal from '../CreateThemeModal'
import DeleteThemeModal from '../DeleteThemeModal'
import AddChannelModal from '../AddChannelModal'
import DeleteChannelModal from '../DeleteChannelModal'
import ThemesList from '../ThemesList'
import VideosList from '../VideosList'

import API from '../../keys'


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
  mainContainer: {
    display: 'flex',
    width: '100%',
    height: 'calc(100vh - 64px)',
  },
  themesListContainer: {
    width: '300px',
    height: '100%',
    boxShadow: '2px 0px 5px 1px rgba(0,0,0,0.1)'
  },
  videosListContainer: {
    flex: '1',
    height: '100%',
    overflowY: 'scroll',
  }
})

const App = (props) => {
    const { classes } = props

    // HOOKS
    const [themes, setThemes] = useState([])
    const [themeName, setThemeName] = useState('')
    const [channelName, setChannelName] = useState('')
    const [channelUrl, setChannelUrl] = useState('')
    const [selectedTheme, setSelectedTheme] = useState('')
    const [selectedChannel, setSelectedChannel] = useState('')

    const [openCreateTheme, setOpenCreateTheme] = useState(false)
    const [openDeleteTheme, setOpenDeleteTheme] = useState(false)
    const [openCreateChannel, setOpenCreateChannel] = useState(false)
    const [openDeleteChannel, setOpenDeleteChannel] = useState(false)

    const [videosData, setVideoData] = useState({})

    // FUNCTIONS
    const fetchChannelVideos = async (e) => {
      e.stopPropagation()
      let url = e.currentTarget.getAttribute("data-url")
      const reg = RegExp(/channel\/(.*)/)
      const matching = url.match(reg)
      
      if (matching) {
        await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API.key}&channelId=${matching[1]}&part=snippet,id&order=date&maxResults=20`)
          .then(res => res.json())
          .then(data => setVideoData(data))
          .catch(err => console.error(err))
      } else {
        alert('The provided channel Url is invalid. We suggest deleting the channel from the theme and recreating one with a valid Url which should look like this: https://www.youtube.com/channel/{the channel id...}')
      }
    }
    
    // handlers for the modal that create themes
    const handleOpenCreateThemeModal = () => {setOpenCreateTheme(true)}
    const handleCloseCreateThemeModal = () => {setOpenCreateTheme(false)}

    // handlers for the modal that confirms theme deletion
    const handleOpenDeleteThemeModal = (e) => {
      e.stopPropagation()
      let selected = e.currentTarget.getAttribute("data-theme")
      setSelectedTheme(selected)
      setOpenDeleteTheme(true)
    }
    const handleCloseDeleteThemeModal = () => {setOpenDeleteTheme(false)}

    // handlers for the modal that add channels
    const handleOpenCreateChannelModal = (e) => {
      e.stopPropagation()
      let selected = e.currentTarget.getAttribute("data-theme")
      setSelectedTheme(selected)
      setOpenCreateChannel(true)
    }
    const handleCloseCreateChannelModal = () => {setOpenCreateChannel(false)}

    // handlers for the modal that deletes a channel
    const handleOpenDeleteChannelModal = (e) => {
      e.stopPropagation()
      let themeSelected = e.currentTarget.getAttribute("data-theme")
      let channelSelected = e.currentTarget.getAttribute("data-channel")
      setSelectedTheme(themeSelected)
      setSelectedChannel(channelSelected)
      setOpenDeleteChannel(true)
    }
    const handleCloseDeleteChannelModal = () => {setOpenDeleteChannel(false)}

    const handleThemeName = (e) => {setThemeName(e.target.value)}
    const handleChannelName = (e) => {setChannelName(e.target.value)}
    const handleChannelUrl = (e) => {setChannelUrl(e.target.value)}

    const addTheme = () => {
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
        handleCloseCreateThemeModal()
      }
    }

    const deleteTheme = () => {
      let themesCopy = [...themes]
      let newThemes = themesCopy.filter(theme => theme.name !== selectedTheme)
      setThemes([...newThemes])
      setSelectedTheme('')
      handleCloseDeleteThemeModal()
    }

    const addChannel = () => {
      let newThemes = [...themes]
      let currentTheme = newThemes.find(theme => theme.name === selectedTheme) || ''
      if (channelName !== '' && channelUrl !== '' && currentTheme) {
        currentTheme.channels = [...currentTheme.channels, { name: channelName, url: channelUrl }]
        setThemes([...newThemes])
        setChannelName('')
        setChannelUrl('')
        setSelectedTheme('')
        handleCloseCreateChannelModal()
      }
    }

    const deleteChannel = () => {
      let themesCopy = [...themes]
      let theTheme = themesCopy.find(theme => theme.name === selectedTheme)
      let withoutChannel = theTheme.channels.filter(channel => channel.name !== selectedChannel)
      theTheme.channels = withoutChannel
      setThemes([...themesCopy])
      setSelectedTheme('')
      setSelectedChannel('')
      handleCloseDeleteChannelModal()
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
                onClick={handleOpenCreateThemeModal}>
                Add Theme
              </Button>
              <Button color="inherit">Login</Button>
            </div>
          </Toolbar>
        </AppBar>

        <CreateThemeModal
          open={openCreateTheme} 
          closeModal={handleCloseCreateThemeModal} 
          themeName={themeName}
          handleThemeName={handleThemeName}
          addTheme={addTheme}
        />

        <DeleteThemeModal
          open={openDeleteTheme}
          closeModal={handleCloseDeleteThemeModal}
          deleteTheme={deleteTheme}
          selectedTheme={selectedTheme}
        />

        <AddChannelModal
          open={openCreateChannel}
          closeModal={handleCloseCreateChannelModal}
          channelName={channelName}
          handleChannelName={handleChannelName}
          channelUrl={channelUrl}
          handleChannelUrl={handleChannelUrl}
          addChannel={addChannel}
        />

        <DeleteChannelModal
          open={openDeleteChannel}
          closeModal={handleCloseDeleteChannelModal}
          deleteChannel={deleteChannel}
        />

        <div className={classes.mainContainer}>
          <div className={classes.themesListContainer}>
            <ThemesList 
              themes={themes}
              handleOpenCreateChannelModal={handleOpenCreateChannelModal}
              handleOpenDeleteThemeModal={handleOpenDeleteThemeModal}
              handleOpenDeleteChannelModal={handleOpenDeleteChannelModal}
              expandThemeOnClick={expandThemeOnClick}
              fetchChannelVideos={fetchChannelVideos}
            />
          </div>
          <div className={classes.videosListContainer}>
            <VideosList videosData={videosData}/>
          </div>
        </div>
      </div>
    )
  }


export default withStyles(styles)(App)
