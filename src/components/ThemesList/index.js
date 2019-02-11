import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import indigo from '@material-ui/core/colors/indigo'

const styles = (theme) => ({
  list: {
    paddingTop: '0',
    paddingBottom: '0'
  },
  iconButton: {
    padding: '0',
    marginRight: theme.spacing.unit * 2,
  },
})

const ThemesList = ({classes, themes, deleteTheme, selectTheme}) => {
  return (
    <List className={classes.list} >
      {themes.map(theme => (
        <ListItem button key={theme.name} style={theme.selected ? {background: indigo[300]} : null} data-theme={theme.name} onClick={selectTheme}>
          <ListItemText>
            {theme.name}
            <ListItemSecondaryAction className={classes.iconButton}>
              <i className="fas fa-trash-alt" onClick={deleteTheme} data-theme={theme.name} data-type="icon"></i>
            </ListItemSecondaryAction>
          </ListItemText>
        </ListItem>
      ))}
    </List>
  )
}

export default withStyles(styles)(ThemesList)