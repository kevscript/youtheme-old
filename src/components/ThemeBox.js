import React from 'react'
import '../styles/ThemeBox.css'

import ChannelsList from './ChannelsList'

export default function ThemeBox({themes, handleId, handleName, channelId, channelName, addChannel}) {

  let theTheme = themes.find(el => el.selected === true)

  return (
    <div className="box-container">
      <div className="box-header">
        <div className="box-header-left">
          <span className="box-theme-name">#{theTheme.theme}</span>
          <input type="text" onChange={handleName} value={channelName} className="box-header-input" placeholder="channel name..."/>
          <input type="text" onChange={handleId} value={channelId} className="box-header-input" placeholder="channel id..."/>
          <button className="box-add-channel-button" data-theme={theTheme.theme} onClick={addChannel}>Add Channel</button>
        </div>
        <div className="box-header-right">
          <button className="box-delete-button">Delete Theme</button>
        </div>
      </div>

      <div className="box-main">
        <div className="box-main-videos"></div>
        <ChannelsList channels={theTheme.channels}/>
      </div>
    </div>
  )
}
