import { useState } from 'react'
import './App.css'
import CreateNote from './components/createNote'
import AllNotes from './components/AllNotes'


function App() {

  return (
    <div className='create__comp'>
      <CreateNote />
      <AllNotes />
    </div>
  )
}

export default App
