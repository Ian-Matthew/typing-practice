import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useTimer } from '../src/useTimer'
import { useWords } from '../src/useWords'
import styles from '../styles/Home.module.css'
import React from 'react'
const Home: NextPage = () => {
  const [isActiveGame, setIsActiveGame] = React.useState(false)
  return (
    <div className="flex flex-col items-center justify-center font-display min-h-screen">
       {!isActiveGame ? (
         <NewGameScreen doStartGame={()=>setIsActiveGame(true)}/>
       ) : <GameBoard/>}


    </div>
  )
}

function GameBoard(){
  const { seconds, toggle, isActive, reset } = useTimer({defaultActive: false});
  const { activeWord, goToNextWord} = useWords();
  const isReady = !!activeWord
  const [inputValue, setInputValue] = React.useState("")
  const [wordsSpelled, setWordsSpelled] = React.useState([])
  const hasPlayed = React.useRef(false)

  React.useEffect(()=> {
    if(isReady) {
      toggle()
      hasPlayed.current = true
    }
  }, [isReady])
  if(!isActive && !hasPlayed) return "getting words"
  
  function handleInputChange(e){
    let { value } = e.target;
    console.log("value", value)
    value = value.trim().toLowerCase()
    const lowerCasedWord = activeWord.toLowerCase()
    // partial match
    const possibleFullMatch = value.length === lowerCasedWord.length
    if(possibleFullMatch){
      if(value === lowerCasedWord){
        setWordsSpelled([...wordsSpelled, activeWord])
        goToNextWord()
        setInputValue("")
      }
    }
    else if(value !== activeWord.substring(0, value.length)){
      setInputValue("")
    }
    else {
      setInputValue(value)
    }
  }
  return (
    <div className="flex flex-col space-y-4 items-center justify-center">
      {isActive ? (
        <>
         <span className="text-5xl">{activeWord}</span>
      <input value={inputValue} onChange={handleInputChange} className='border text-2xl border-black px-3 py-2 text-center' autoFocus type="text" />
      <span>{seconds}</span>
      <button onClick={() => toggle()}>End Practice</button>
        </>
      ) : (
        <>
          <div>Total Words: {wordsSpelled.length}</div>
          <div>WPM {((wordsSpelled.length / seconds) * 60)}</div>
        </>
        
      )}
     
    </div>
  )
}

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
