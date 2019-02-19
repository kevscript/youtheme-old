import React, { Fragment } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { withStyles } from '@material-ui/core/styles'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import Collapse from '@material-ui/core/Collapse'
import AddButton from '@material-ui/icons/Add'
import DeleteButton from '@material-ui/icons/Delete'
import deepPurple from '@material-ui/core/colors/deepPurple'

const styles = () => ({
  themeItem: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  channelItem: {
    display: "flex",
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  addButton: {
    '&:hover': {
      background: deepPurple[500],
      color: 'white'
    },
    color: 'rgba(0,0,0,0.3)',
    borderRadius: '50%',
    transition: '0.3s',
    margin: '0 5px'
  },
  deleteButton: {
    '&:hover': {
      color: deepPurple[500]
    },
    color: 'rgba(0,0,0,0.3)',
    transition: '0.3s',
  }
})

const ThemesList = ({classes, themes, handleOpenCreateChannelModal, expandThemeOnClick, fetchChannelVideos, handleOpenDeleteThemeModal, handleOpenDeleteChannelModal}) => {
  return (
    <List style={{paddingTop: 0}}>
      {themes && themes.map(theme => {
        return (
          <Fragment key={theme.name}>
            <ListItem button onClick={expandThemeOnClick} key={theme.name} data-theme={theme.name} className={classes.themeItem}>
              <div className={classes.themeNameContainer}>
                <span className={classes.themeItemText}>{theme.name}</span>
                {theme.channels.length > 0 ? (theme.open ? <ExpandLess /> : <ExpandMore />) : null}
              </div>
              <div>
                <AddButton className={classes.addButton} onClick={handleOpenCreateChannelModal} data-theme={theme.name}/>
                <DeleteButton className={classes.deleteButton} onClick={handleOpenDeleteThemeModal} data-theme={theme.name}/>
              </div>
            </ListItem>
            <Collapse in={theme.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {theme.channels.map(channel => {
                  return (
                  <ListItem button key={channel.name} className={classes.channelItem} data-url={channel.url} onClick={fetchChannelVideos}>
                    <span className={classes.channelItemText}>{channel.name}</span>
                    <DeleteButton className={classes.deleteButton} onClick={handleOpenDeleteChannelModal} data-theme={theme.name} data-channel={channel.name}/>
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