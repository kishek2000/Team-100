import React, { useState } from 'react'
import './App.css'

import { SearchBar } from './components/SearchBar'
import { MediaSelector } from './components/MediaSelector'
import { OPTIONS, SEARCHTEXT } from './components/constants'
import { Experience } from './components/Experience'

function App() {
  const [mediaSelected, setMediaSelected] = useState('WATCH')
  return (
    <div className="App">
      <header className="App-header">
        <p className="myLounge-heading">myLounge</p>
        <p className="myLounge-subtitle">Listen. Watch. Relax.</p>
        <SearchBar
          name="searchbar-menu"
          inputname="searchinput-menu"
          imagename="searchbutton-menu"
          placeholder="Search for Movie, TV Show, Podcast or Music by name..."
        />
      </header>
      <section className="App-media-options">
        <div className="filters-header">
          <div className="media-selection">
            <p className="selection-label">I want to</p>
            {OPTIONS.map(option => (
              <MediaSelector
                key={option}
                option={option}
                isSelected={mediaSelected === option}
                onClick={option => {
                  setMediaSelected(option)
                }}
              />
            ))}
          </div>
          <SearchBar
            name="searchbar"
            inputname="searchinput"
            imagename="searchbutton"
            placeholder={SEARCHTEXT[mediaSelected]}
          />
        </div>
        <Experience currentExperience={mediaSelected} />
      </section>
    </div>
  )
}

export default App
