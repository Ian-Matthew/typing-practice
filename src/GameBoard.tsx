import React from "react"
import { useGame } from "./useGame"
export function GameBoard(){
  const {status, inputValue, handleInputChange, words, activeWord, playAgain, endGame, time, currentWordIndex } = useGame()
  const wordsSpelled = words.filter(w => !!w.completed)
  const wpm = wordsSpelled.length ? ((wordsSpelled.length / time) * 60).toFixed(2) : 0
  if(status === 'Active') return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <span className="text-5xl">{activeWord}</span>
      <input value={inputValue} onChange={handleInputChange} className='border text-2xl border-black px-3 py-2 text-center' autoFocus type="text" />
      <span>{time}</span>
      <button onClick={() => endGame()}>End Practice</button>
    </div>
  )
  if(status === 'Over') {
    return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <div>Total Words: {wordsSpelled.length}</div>
      <div>WPM {wpm}</div>
      <button onClick={playAgain}>Play Again</button>
    </div>
    )
  }
  else return <div >
        Loading...  
  </div>
 
}