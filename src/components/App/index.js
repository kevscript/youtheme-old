import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import InputBase from '@material-ui/core/InputBase'

import ThemesList from '../ThemesList'

const styles = theme => ({
  bodyContainer: {
    width: '100%',
    height: '100vh'
  },
  appBar: {
    height: '64px',
    boxShadow: 'none',
  },
  toolBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toolBarLeft: {
    display: 'flex'
  },
  input: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing.unit * 10,
    marginRight: theme.spacing.unit,
    padding: theme.spacing.unit / 4,
    paddingLeft: theme.spacing.unit,
    color: theme.palette.common.white
  },
  themesListContainer: {
    width: '30%',
    height: 'calc(100vh - 64px)',
    maxWidth: '250px',
    boxShadow: '2px 0px 5px 1px rgba(0,0,0,0.1)'
  },
})

const App = (props) => {
    const { classes } = props

    // hooks
    const [themeInput, setThemeInput] = useState('')
    const [themes, setThemes] = useState([])

    // functions
    const addNewTheme = () => {
      if (themeInput !== '' && themes === []) {
        setThemes([...themes, {name: themeInput}])
        setThemeInput('')
      }
      if (themeInput !== '' && !themes.find(el => el.name === themeInput)) {
        setThemes([...themes, {name: themeInput}])
        setThemeInput('')
      }
    }

    const addNewThemeOnKeypress = (e) => {
      return themeInput !== '' ? (e.key === 'Enter' ? addNewTheme(e) : null) : null
    }

    const deleteTheme = (e) => {
      let name = e.target.getAttribute("data-theme")
      let newList = themes.filter(el => el.name !== name)
      setThemes(newList)
    }

    return (
      <div className={classes.bodyContainer}>
        <CssBaseline/>

        <AppBar className={classes.appBar} position="sticky">
          <Toolbar className={classes.toolBar}>
            <div className={classes.toolBarLeft}>
              <Typography variant="h6" color="inherit">
                YouTheme
              </Typography>
              <div>
                <InputBase placeholder="Theme..." className={classes.input} value={themeInput} onChange={e => setThemeInput(e.target.value)} onKeyPress={addNewThemeOnKeypress}/>
                <Button color="inherit" onClick={addNewTheme}>Add</Button>
              </div>
            </div>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>

        <div className={classes.themesListContainer}>
          <ThemesList themes={themes} deleteTheme={deleteTheme}/>
        </div>


      </div>
    )
  }


export default withStyles(styles)(App)
