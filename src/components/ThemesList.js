import React from 'react'
import '../styles/ThemesList.css'

export default function ThemesList({themes, selectTheme, deleteTheme}) {


  return (
    <div className="themes-container">
      <ul className="themes-list">
        {themes && themes.map(item => 
          <li 
            className="themes-item" 
            key={item.theme} 
            data-key={item.theme} 
            onClick={selectTheme} 
            style={{backgroundColor: item.selected ? 'aquamarine' : null}}
          >
            {item.theme}
          </li>
        )}
      </ul>
    </div>
  )
}
