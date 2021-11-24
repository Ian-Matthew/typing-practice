import React from "react";
import { Game, GameMethods } from "../types";
// todo: why cant i import just GameContext? why have to do remerge?
import { useGame } from "./useGame";
type GameContext = Game & GameMethods;
type GameProviderProps = { children: React.ReactNode };
export const GameContext = React.createContext<GameContext | undefined>(
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
