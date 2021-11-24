import React from "react";
import { useGameContext } from "../useGame/GameContext";
import { ActiveGameStats } from "../Stats";
import { Button } from "../../components/Button";
export function GameOver() {
  const { readyNewGame } = useGameContext();
  return (
    <div className="flex flex-col space-y-5 items-center justify-center">
      <div className="text-5xl font-semibold">Session Results</div>
      <blockquote className="font-display font-medium "></blockquote>
      <ActiveGameStats />
      <Button onClick={() => readyNewGame()}>Play Again</Button>
    </div>
  );
}
