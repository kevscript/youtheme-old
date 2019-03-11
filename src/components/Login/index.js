import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'

const styles = () => ({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex'
  },
  auth: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid rgba(0,0,0,0.4)',
    padding: '3em 6em'
  },
  authContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: '100%'
  },
  authButtonsContainer: {
    marginTop: '1.5em'
  },
  authButton: {
    margin: '0.75em 0',
    background: purple[800],
    color: '#fff',
    '&:hover': {
      background: purple[500]
    }
  },
  authInputContainer: {
    margin: '0.75em 0'
  }
})

const Login = ({firebaseEmail, firebasePassword, handleFirebaseEmail, handleFirebasePassword, login, signUp, classes}) => {

  return (
    <div className={classes.container}>
      <div className={classes.authContainer}>
        <div className={classes.auth}>    
          <FormControl className={classes.authInputContainer}>
            <InputLabel>Email</InputLabel>
            <Input type="email" placeholder="your@email.com" value={firebaseEmail} onChange={handleFirebaseEmail} autoComplete="email"></Input>
          </FormControl>
          <FormControl className={classes.authInputContainer}>
            <InputLabel>Password</InputLabel>
            <Input type="password" value={firebasePassword} onChange={handleFirebasePassword} autoComplete="current-password"></Input>
          </FormControl>
          <FormControl className={classes.authButtonsContainer}>
            <Button className={classes.authButton} type="submit" onClick={login} variant="contained">Login</Button>
            <Button type="submit" onClick={signUp}>Sign Up</Button>
          </FormControl>
        </div>
      </div>
    </div>
  )
}


export default withStyles(styles)(Login)