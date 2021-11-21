import type { NextPage } from 'next'

import React from 'react'
import { SessionProvider } from '../src/SessionProvider'
import StartScreen from '../src/StartScreen'
// const Home: NextPage = () => {
//   const [isActiveGame, setIsActiveGame] = React.useState(false)
//   return (
//     <div className="flex flex-col items-center justify-center font-display min-h-screen">
//        {!isActiveGame ? (
//          <NewGameScreen doStartGame={()=>setIsActiveGame(true)}/>
//        ) : <GameBoard/>}


//     </div>
//   )
// }

const Home: NextPage = () => {
  const [isActiveGame, setIsActiveGame] = React.useState(false)
  return (
    <SessionProvider>
      <div className="flex flex-col items-center justify-center font-display min-h-screen">
       <StartScreen/>
      </div>
    </SessionProvider>
    
  )
}

// function GameBoard(){
//   const { seconds, toggle, isActive, reset } = useTimer({defaultActive: false});
//   const { activeWord, goToNextWord} = useWords();
//   const isReady = !!activeWord
//   const [inputValue, setInputValue] = React.useState("")
//   const [wordsSpelled, setWordsSpelled] = React.useState([])
//   const hasPlayed = React.useRef(false)

//   function resetGame(){
//     goToNextWord()
//     setWordsSpelled([])
//     setInputValue("")
//     reset()
//     toggle()
//     hasPlayed.current = false
//   }

//   React.useEffect(()=> {
//     if(isReady) {
//       toggle()
//       hasPlayed.current = true
//     }
//   }, [isReady])
//   if(!isActive && !hasPlayed) return "getting words"
  
//   function handleInputChange(e){
//     let { value } = e.target;
//     console.log("value", value)
//     value = value.trim().toLowerCase()
//     const lowerCasedWord = activeWord.toLowerCase()
//     // partial match
//     const possibleFullMatch = value.length === lowerCasedWord.length
//     if(possibleFullMatch){
//       if(value === lowerCasedWord){
//         setWordsSpelled([...wordsSpelled, activeWord])
//         goToNextWord()
//         setInputValue("")
//       }
//     }
//     else if(value !== activeWord.substring(0, value.length)){
//       setInputValue("")
//     }
//     else {
//       setInputValue(value)
//     }
//   }
//   const WPM = wordsSpelled.length ? ((wordsSpelled.length / seconds) * 60).toFixed(2) : 0
//   return (
//     <div className="flex flex-col space-y-4 items-center justify-center">
//       {isActive ? (
//         <>
//          <span className="text-5xl">{activeWord}</span>
//       <input value={inputValue} onChange={handleInputChange} className='border text-2xl border-black px-3 py-2 text-center' autoFocus type="text" />
//       <span>{seconds}</span>
//       <button onClick={() => toggle()}>End Practice</button>
//         </>
//       ) : (
//         <>
//           <div>Total Words: {wordsSpelled.length}</div>
//           <div>WPM {WPM}</div>
//           <button onClick={() => resetGame()}>Play Again</button>
//         </>
        
//       )}
     
//     </div>
//   )
// }

function NewGameScreen({doStartGame}){
  return (
    <>
      <div className="w-80 p-5">
          <img src="/WFH.svg"></img>
      </div>
      <h1 className="text-3xl mt-5">Typing Practice</h1>
      <div className="space-x-5 mt-5 flex ">
        <button className="px-4 my-1 rounded-md border border-black text-center" onClick={doStartGame}>Start Practice</button>
      </div>
    </>
  )
}

export default Home
