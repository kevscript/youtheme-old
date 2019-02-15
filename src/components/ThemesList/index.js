import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

const styles = () => ({

})

const ThemesList = ({classes, themes, handleSelectedTheme}) => {
  return (
    <List>
      {themes && themes.map(theme => {
        return (
          <ListItem button key={theme.name}>
            <ListItemText>
              {theme.name}
            </ListItemText>
            <IconButton className={classNames(classes.icon, 'fas fa-plus')} onClick={handleSelectedTheme} data-theme={theme.name}/>
            <ul>
            {theme.channels && theme.channels.map(channel => <li>{channel.name}</li>)}
            </ul>
          </ListItem>
        )
      })}
    </List>
  )
}

export default withStyles(styles)(ThemesList)