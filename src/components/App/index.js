import React, { useState, useEffect } from 'react'

// Material-UI imports
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import deepPurple from '@material-ui/core/colors/deepPurple'

// Created components
import CreateThemeModal from '../CreateThemeModal'
import DeleteThemeModal from '../DeleteThemeModal'
import AddChannelModal from '../AddChannelModal'
import DeleteChannelModal from '../DeleteChannelModal'
import ThemesList from '../ThemesList'
import VideosList from '../VideosList'

// import the API keys
import API from '../../keys'

// import Firebase setup
import { fire, db } from '../../config/fire'
import Login from '../Login'

// MAterial-UI styles object
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
    // Material-UI classes
    const { classes } = props


    // HOOKS //

    //--- Array of all the Themes
    const [themes, setThemes] = useState([])

    //--- Dynamic input value of the theme name from the Theme creation modal
    const [themeName, setThemeName] = useState('')

    //--- Dynamic input value of the channel name/url from the Channel creation modal 
    const [channelName, setChannelName] = useState('')
    const [channelUrl, setChannelUrl] = useState('')

    //--- Used to store the name of the active/selected theme and channel
    const [selectedTheme, setSelectedTheme] = useState('')
    const [selectedChannel, setSelectedChannel] = useState('')

    //--- Booleans that manage the state of all the modals
    const [openCreateTheme, setOpenCreateTheme] = useState(false)
    const [openDeleteTheme, setOpenDeleteTheme] = useState(false)
    const [openCreateChannel, setOpenCreateChannel] = useState(false)
    const [openDeleteChannel, setOpenDeleteChannel] = useState(false)

    //--- Stores the data fetched from the Youtube Api
    const [videosData, setVideoData] = useState({})


    //--- Firebase hook
    const [firebaseUser, setFirebaseUser] = useState(null)
    const [firebaseEmail, setFirebaseEmail] = useState('')
    const [firebasePassword, setFirebasePassword] = useState('')


    //--- useEffect to check if a firebase User is logged In
    useEffect(() => { authListener() }, [])


    // FIREBASE AUTHENTIFICATION

    const authListener = () => {
      fire.auth().onAuthStateChanged(user => {
        if (user) {
          setFirebaseUser(user)
        } else {
          setFirebaseUser(null)
        }
      })
    }

    const login = async (e) => {
      e.preventDefault()
      await fire.auth()
        .signInWithEmailAndPassword(firebaseEmail, firebasePassword)
        .catch(err => console.error(err))
      
      const userId = await fire.auth().currentUser.uid
      getUserThemes(userId)
    }

    const logout = () => {
      // reset the entire State Tree before loging out
      setThemes([])
      setThemeName('')
      setChannelName('')
      setChannelUrl('')
      setFirebaseEmail('')
      setFirebasePassword('')
      setFirebaseUser('')
      setOpenCreateChannel(false)
      setOpenCreateTheme(false)
      setOpenDeleteChannel(false)
      setOpenDeleteTheme(false)
      setVideoData({})
      setSelectedChannel('')
      setSelectedTheme('')
      fire.auth().signOut()
    };


    const signUp = async (e) => {
      e.preventDefault()
      await fire.auth()
        .createUserWithEmailAndPassword(firebaseEmail, firebasePassword)
        .catch(err => console.error(err))
        setFirebaseEmail('')
        setFirebasePassword('')
      
      // pushing an empty array to the database, which going to be used to set the themes list of the user
      // we use an empty array because its a new user that just signed up and has no data inputed yet
      const userId = await fire.auth().currentUser.uid
      pushUserThemes(userId, [])
    }


    // FIREBASE DATABASE

    //--- Push the state of the specific user to the realtime database
    const pushUserThemes = (userId, obj) => db.ref().child(userId).set(JSON.stringify(obj))
    
    const getUserThemes = (userId) => {
      db.ref().child(userId).once('value')
        .then(snapshot => setThemes([...JSON.parse(snapshot.val())]))
    }





    // METHODS & HANDLERS //

    //--- Handlers for the modal that create themes 
    const handleOpenCreateThemeModal = () => {setOpenCreateTheme(true)}
    const handleCloseCreateThemeModal = () => {setOpenCreateTheme(false)}

    //--- Handlers for the modal that confirms theme deletion
    const handleOpenDeleteThemeModal = (e) => {
      e.stopPropagation()
      // sets the selected theme to the one we want to delete and opens the theme delete modal
      let selected = e.currentTarget.getAttribute("data-theme")
      setSelectedTheme(selected)
      setOpenDeleteTheme(true)
    }
    const handleCloseDeleteThemeModal = () => {setOpenDeleteTheme(false)}

    //--- Handlers for the modal that add channels
    const handleOpenCreateChannelModal = (e) => {
      e.stopPropagation()
      // sets the selected theme to the one where we want to create the new channel and opens the channel creation modal
      let selected = e.currentTarget.getAttribute("data-theme")
      setSelectedTheme(selected)
      setOpenCreateChannel(true)
    }
    const handleCloseCreateChannelModal = () => {setOpenCreateChannel(false)}

    //--- Handlers for the modal that deletes a channel
    const handleOpenDeleteChannelModal = (e) => {
      e.stopPropagation()
      // sets the selected channel and the selected theme where its stored, opens the channel deletion modal
      let themeSelected = e.currentTarget.getAttribute("data-theme")
      let channelSelected = e.currentTarget.getAttribute("data-channel")
      setSelectedTheme(themeSelected)
      setSelectedChannel(channelSelected)
      setOpenDeleteChannel(true)
    }
    const handleCloseDeleteChannelModal = () => {setOpenDeleteChannel(false)}

    //--- Handlers for the dynamic input values (as we cant pass setState to child components directly)
    const handleThemeName = (e) => {setThemeName(e.target.value)}
    const handleChannelName = (e) => {setChannelName(e.target.value)}
    const handleChannelUrl = (e) => {setChannelUrl(e.target.value)}

    //--- Handlers for Firebase Form inputs
    const handleFirebaseEmail = (e) => {setFirebaseEmail(e.target.value)}
    const handleFirebasePassword = (e) => {setFirebasePassword(e.target.value)}


    //--- Function that fetches data from the Youtube Api
    const fetchChannelVideos = async (e) => {
      e.stopPropagation()
      // stores the url from the dataset of the event object and looks for the matching part that represents the ID we need to fetch the data
      let url = e.currentTarget.getAttribute("data-url")
      const reg = RegExp(/channel\/(.*)/)
      const matching = url.match(reg)
      
      // if there is a match we fetch the data and store it in the videoData object, otherwise we display an alert with the steps to follow
      if (matching) {
        await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API.key}&channelId=${matching[1]}&part=snippet,id&order=date&maxResults=20`)
          .then(res => res.json())
          .then(data => setVideoData(data))
          .catch(err => console.error(err))
      } else {
        alert('The provided channel Url is invalid. We suggest deleting the channel from the theme and recreating one with a valid Url which should look like this: https://www.youtube.com/channel/{the channel id...}')
      }
    }

    //--- Function that adds a new theme Object to the Array of themes (onClick)
    const addTheme = async () => {
      // if the field isn't empty and the theme name isn't already taken, we create a new theme
      if (themeName !== '' && !themes.find(el => el.name === themeName)) {
        let prevThemes = [...themes]
        let newThemes = [
          ...prevThemes,
          {
            name: themeName,
            channels: [],
            open: false
          }
        ]

        setThemes(newThemes)

        const userId = fire.auth().currentUser.uid
        pushUserThemes(userId, newThemes)

        // reset theme name dynamic input value
        setThemeName('')
        // close the theme creation modal
        handleCloseCreateThemeModal()
      }


    }

    //--- Function that deletes the selected theme (onClick)
    const deleteTheme = async () => {
      let themesCopy = [...themes]
      // we filter the theme that matches the name of the selected one
      let newThemes = themesCopy.filter(theme => theme.name !== selectedTheme)
      setThemes(newThemes)

      const userId = fire.auth().currentUser.uid
      pushUserThemes(userId, newThemes)
      // reset selected theme state
      setSelectedTheme('')
      // close the theme deletion modal
      handleCloseDeleteThemeModal()
    }

    //--- Function that adds a new channel to the selected theme (onClick)
    const addChannel = async () => {
      let themesCopy = [...themes]
      // we store the theme object that has the same name value as the selectedTheme state
      let currentTheme = themesCopy.find(theme => theme.name === selectedTheme) || ''
      // if the channel name/url fields are not empty and if the parent theme exists in the themes state Object
      if (channelName !== '' && channelUrl !== '' && currentTheme) {
        // pushes a new channel Object to the Array of channels in the specific theme
        currentTheme.channels = [...currentTheme.channels, { name: channelName, url: channelUrl }]

        let newThemes = [...themesCopy]
        setThemes(newThemes)

        const userId = fire.auth().currentUser.uid
        pushUserThemes(userId, newThemes)
        // reset state
        setChannelName('')
        setChannelUrl('')
        setSelectedTheme('')
        // close the channel creation modal
        handleCloseCreateChannelModal()
      }
    }

    //--- Function that deletes the selected channel from the selected theme Object(onClick)
    const deleteChannel = () => {
      let themesCopy = [...themes]
      // store the theme objejct that has the same name value as the selectedTheme state
      let theTheme = themesCopy.find(theme => theme.name === selectedTheme)
      // filter the Array of channels of that theme object to exclude the channel object that has the same name as the selectedChannel state
      let withoutChannel = theTheme.channels.filter(channel => channel.name !== selectedChannel)
      // set the channels Array to the one without the channel we want to delete
      theTheme.channels = withoutChannel

      let newThemes = [...themesCopy]
      setThemes(newThemes)

      const userId = fire.auth().currentUser.uid
      pushUserThemes(userId, newThemes)
      // reset state
      setSelectedTheme('')
      setSelectedChannel('')
      // close the channel deletion modal
      handleCloseDeleteChannelModal()
    }

    //--- Function that expands the list of channels from the clicked theme (onClick)
    const expandThemeOnClick = (e) => {
      e.stopPropagation()
      let newThemes = [...themes]
      // stores the clicked theme name
      let current = e.currentTarget.getAttribute("data-theme")
      // find the theme Object that has the same name value as the current variable
      let currentTheme = newThemes.find(theme => theme.name === current)
      // set the open attribute to its opposite, toggling the expandable list
      currentTheme.open = !currentTheme.open
      setThemes([...newThemes])
    }






    return (
      <div className={classes.bodyContainer}>
        <CssBaseline/>

        {!firebaseUser 
          ? (
            <Login 
              login={login} 
              signUp={signUp}
              firebaseEmail={firebaseEmail}
              firebasePassword={firebasePassword}
              handleFirebaseEmail={handleFirebaseEmail} 
              handleFirebasePassword={handleFirebasePassword}
            />
          ) 
          : (
            <div>
              <AppBar className={classes.appBar} position="sticky">
                <Toolbar className={classes.toolBar}>
                  <Typography variant="h6" color="inherit">
                    {firebaseUser.email}
                  </Typography>
                  <div className={classes.toolBarRight}>
                    <Button 
                      className={classes.addButton} 
                      color="inherit" variant="outlined" 
                      onClick={handleOpenCreateThemeModal}>
                      Add Theme
                    </Button>
                    <Button color="inherit" onClick={logout}>Logout</Button>
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
        )}
      </div>
    )
  }


export default withStyles(styles)(App)

