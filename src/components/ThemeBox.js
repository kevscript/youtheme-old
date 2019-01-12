import React from 'react'
import '../styles/ThemeBox.css'
import { list } from 'postcss';

export default function ThemeBox({themes, handleInput, channelInput, addChannel}) {

  let theTheme = themes.find(el => el.selected === true)

  return (
    <div className="box-container">
      <div className="box-header">
        <div className="box-header-left">
          <span className="box-theme-name">#{theTheme.theme}</span>
          <input type="text" onChange={handleInput } value={channelInput} className="box-header-input" placeholder="paste channel id..."/>
          <button className="box-add-channel-button" data-theme={theTheme.theme} onClick={addChannel}>Add Channel</button>
        </div>
        <div className="box-header-right">
          <button className="box-delete-button">Delete Theme</button>
        </div>
      </div>
      <div className="main-content">
        {theTheme.channels && theTheme.channels.map(channel => <p>{channel}</p>)}
      </div>
    </div>
  )
}
