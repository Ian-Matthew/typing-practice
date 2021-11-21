import React from "react"
import { useGame } from "./useGame"

function ActiveWord({activeWord, inputValue}){


  
  if(inputValue){
    return <div className="active-word">
      {[...activeWord].map((letter, index) => {
        const inputLetter = [...inputValue][index];
        console.log("inputLetter", inputLetter)
        console.log("correct letter", letter)
        const isCorrect = inputLetter === letter
        let className = isCorrect ? 'text-green-500' : 'text-red-500';
        if(index > inputValue.length -1) className = 'text-black'
        return <span className={className}>{letter}</span>
      })}
    </div>
  }
  return <span>{activeWord}</span>

}
export function GameBoard(){
  const {status, inputValue, handleInputChange, words, activeWord, playAgain, endGame, time, currentWordIndex, typos } = useGame()
  
  const wordsSpelled = words.filter(w => !!w.completed)
  const wpm = wordsSpelled.length ? ((wordsSpelled.length / time) * 60).toFixed(2) : 0
  if(status === 'Active') return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      <span className="text-5xl"><ActiveWord activeWord={activeWord} inputValue={inputValue}/></span>
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