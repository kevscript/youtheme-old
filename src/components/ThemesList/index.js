import React, { Fragment } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import IconButton from '@material-ui/core/IconButton'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'

const styles = () => ({
  themeItem: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  channelItem: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  themeItemText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: '1rem',
    fontWeight: 500,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    lineHeight: '1.5em',
  },
  channelItemText: {
    color: 'rgba(0, 0, 0, 0.75)',
    fontSize: '1rem',
    fontWeight: 400,
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    lineHeight: '1em',
    marginLeft: '20px',
  },
  themeNameContainer: {
    display: 'flex'
  }
})

const ThemesList = ({classes, themes, handleSelectedTheme, expandThemeOnClick}) => {
  return (
    <List style={{paddingTop: 0}}>
      {themes && themes.map(theme => {
        return (
          <Fragment key={theme.name}>
            <ListItem button onClick={expandThemeOnClick} key={theme.name} data-key={theme.name} className={classes.themeItem}>
              <div className={classes.themeNameContainer}>
                <span className={classes.themeItemText}>{theme.name}</span>
                {theme.channels.length > 0 ? (theme.open ? <ExpandLess /> : <ExpandMore />) : null}
              </div>
              <IconButton className={classNames(classes.icon, 'fas fa-plus')} onClick={handleSelectedTheme} data-theme={theme.name}/>
            </ListItem>
            <Collapse in={theme.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {theme.channels.map(channel => {
                  return (
                  <ListItem button key={channel.name} className={classes.channelItem}>
                    <span className={classes.channelItemText}>{channel.name}</span>
                  </ListItem>
                  )
                })}
              </List>
            </Collapse>
          </Fragment>
        )
      })}
    </List>
  )
}

export default withStyles(styles)(ThemesList)