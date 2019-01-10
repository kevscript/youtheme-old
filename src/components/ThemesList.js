import React from 'react'

export default function ThemesList({themes}) {
  return (
    <ul className="themes-list">
      {themes && themes.map(item => <li key={item.theme}>{item.theme}</li> )}
    </ul>
  )
}
