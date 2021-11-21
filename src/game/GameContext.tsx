import React from "react";
import { GameState } from "../types";
import { useGame } from "./useGame";

type GameProviderProps = { children: React.ReactNode };
export const GameContext = React.createContext<GameState | undefined>(
  undefined
);

export function GameProvider({ children }: GameProviderProps) {
  const game = useGame();
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const context = React.useContext(GameContext);
  if (context === undefined) {
    throw new Error("game context must be used within provider");
  }
  return context;
}
