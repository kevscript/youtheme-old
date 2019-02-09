import React from 'react'
import '../styles/ThemeBox.css'

import VideosList from './VideosList'
import ChannelsList from './ChannelsList'

export default function ThemeBox({themes, handleUrl, handleName, channelUrl, channelName, addChannel, handleChannelSelect, handleThemeDelete, videosData}) {

  let theTheme = themes.find(el => el.selected === true)

  if (theTheme) {
    return (
      <div className="box-container">
        <div className="box-header">
          <div className="box-header-left">
            <span className="box-theme-name">#{theTheme.theme}</span>
            <input type="text" onChange={handleName} value={channelName} className="box-header-input" placeholder="channel name..."/>
            <input type="text" onChange={handleUrl} value={channelUrl} className="box-header-input" placeholder="channel url..."/>
            <button className="box-add-channel-button" data-theme={theTheme.theme} onClick={addChannel}>Add Channel</button>
          </div>
          <div className="box-header-right">
            <button className="box-delete-button" onClick={handleThemeDelete}>Delete Theme</button>
          </div>
        </div>

        <div className="box-main">
          <ChannelsList 
            channels={theTheme.channels} 
            selectChannel={handleChannelSelect} 
          />
          <VideosList videosData={videosData}/>
        </div>
      </div>
    )
  } else {
    return (
      <div className="box-container">
        <p>No themes yet, add one :)</p>
      </div>
    )
  }
}
