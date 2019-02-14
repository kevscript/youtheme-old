import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import deepPurple from '@material-ui/core/colors/deepPurple'

import ModalForm from '../ModalForm'



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
    maxWidth: '250px',
    boxShadow: '2px 0px 5px 1px rgba(0,0,0,0.1)'
  },
})

const App = (props) => {
    const { classes } = props

    // HOOKS
    const [themes, setThemes] = useState([])
    const [inputName, setName] = useState('')

    const [open, setOpen] = useState(false)

    // FUNCTIONS
    const handleOpenModal = () => {setOpen(true)}
    const handleCloseModal = () => {setOpen(false)}
    const handleInputName = (e) => {setName(e.target.value)}

    const addTheme = () => {
      let newThemes = [...themes]
      setThemes([
        ...newThemes,
        {
          name: inputName
        }
      ])
      setName('')
      handleCloseModal()
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
                onClick={handleOpenModal}>
                Add Theme
              </Button>
              <Button color="inherit">Login</Button>
            </div>
          </Toolbar>
        </AppBar>

        <ModalForm 
          open={open} 
          closeModal={handleCloseModal} 
          inputName={inputName}
          handleInputName={handleInputName}
          addTheme={addTheme}
          />

        <div>
          {themes && themes.map(theme => <p>{theme.name}</p>)}
        </div>
      </div>
    )
  }


export default withStyles(styles)(App)
