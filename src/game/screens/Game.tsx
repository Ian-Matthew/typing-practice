import React from "react";
import { useGameContext } from "../useGame/GameContext";
import { GameOver } from "./GameOver";
import { ActiveGame } from "./Playing";
export function Game() {
  const { status } = useGameContext();
  return status === "Active" || status === "Ready" ? (
    <ActiveGame />
  ) : (
    <GameOver />
  );
}
