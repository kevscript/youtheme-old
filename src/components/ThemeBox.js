import React from 'react'

export default function ThemeBox({themes, editTheme}) {

  let theTheme = themes.find(el => el.selected === true)

  return (
    <div className="box-container">
      <h1>{theTheme.theme}</h1>
      <button>Edit</button>
    </div>
  )
}
