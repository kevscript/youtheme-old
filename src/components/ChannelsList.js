import React from 'react'
import '../styles/ChannelsList.css'

export default function ChannelsList({channels, selectChannel}) {


  return (
    <div className="channels-container">
      <ul className="channels-list">
        {channels && channels.map(item => 
          <li 
            className="channels-item" 
            key={item.id} 
            data-key={item.id} 
            onClick={selectChannel} 
            style={{backgroundColor: item.selected ? 'aquamarine' : null}}
          >
            {item.name}
          </li>
        )}
      </ul>
    </div>
  )
}
