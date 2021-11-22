import React from "react";
import { GameBoard } from "./game/GameBoard";
import { Button } from "./Button";
import { useGameContext } from "./game/GameContext";
import { useSessionContext } from "./session/SessionProvider";
export default function StartScreen() {
  const { preloadWords, playAgain } = useGameContext();
  const { startSession, isActive, endSession } = useSessionContext();

  React.useEffect(() => {
    preloadWords();
  }, []);
  if (!isActive)
    return (
      <>
        <div className="w-80 p-5">
          <img src="/WFH.svg"></img>
        </div>
        <h1 className="text-5xl font-semibold mt-5">Typing Practice</h1>
        <div className="space-x-5 mt-5 flex ">
          <Button
            onClick={() => {
              startSession();
              playAgain();
            }}
          >
            Start Practice
          </Button>
        </div>
      </>
    );

  return <GameBoard />;
}
