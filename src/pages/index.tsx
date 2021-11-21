import type { NextPage } from 'next'

import React from 'react'
import { SessionProvider } from '../session/SessionProvider'
import StartScreen from '../StartScreen'

const Home: NextPage = () => {
  return (
    <SessionProvider>
      <div className="flex flex-col items-center justify-center font-display min-h-screen">
       <StartScreen/>
      </div>
    </SessionProvider>
    
  )
}

export default Home
