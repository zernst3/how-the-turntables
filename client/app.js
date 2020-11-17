import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import './main.css'

const App = () => {
  return (
    <div>
      <Navbar />
      <div id="main">
        <Routes />
      </div>
    </div>
  )
}

export default App
