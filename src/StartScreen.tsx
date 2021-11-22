import React from "react";
import { GameBoard } from "./game/GameBoard";
import { Button } from "./Button";
import { useGameContext } from "./game/GameContext";
import { SessionStats } from "./Stats";
export default function StartScreen() {
  const { preloadWords, playAgain } = useGameContext();
  const [isPlaying, setIsPlaying] = React.useState(false);

  React.useEffect(() => {
    preloadWords();
  }, []);
  if (!isPlaying)
    return (
      <>
        <div className="w-80 p-5">
          <img src="/WFH.svg"></img>
        </div>
        <h1 className="text-5xl font-semibold mt-5">Typing Practice</h1>
        <div className="space-x-5 mt-5 flex ">
          <Button
            onClick={() => {
              setIsPlaying(true);
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
