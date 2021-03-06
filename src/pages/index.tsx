import type { NextPage } from "next";

import React from "react";
import { GameProvider } from "../game/useGame/GameContext";
import { SessionProvider } from "../session/SessionProvider";
import StartScreen from "../game/screens/StartScreen";
import { SessionStats } from "../game/Stats";
const Home: NextPage = () => {
  return (
    <SessionProvider>
      <GameProvider>
        <div className="flex flex-col h-screen justify-between mt-5">
          <SessionStats />

          <div
            style={{ fontVariantLigatures: "none" }}
            className="flex flex-col mt-auto items-center justify-center font-fancy mx-auto min-h-screen"
          >
            <StartScreen />
          </div>
        </div>
      </GameProvider>
    </SessionProvider>
  );
};

export default Home;
