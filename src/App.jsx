import { useState } from 'react'
import './App.css'
import Board from './Board'

function App() {

  return (
    <>
      <div className='app-container'>
        <h1 className='title'>Tic Tac Toe Game</h1>
        <div className='game-board'>
          <Board />
        </div>
      </div >
    </>
  )
}

export default App
