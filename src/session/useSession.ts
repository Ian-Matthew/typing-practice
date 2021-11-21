import React from "react";
import { Game } from "../types";
export function useSession() {
  const [session, setSession] = React.useState({
    games: [] as Game[],
    isActive: false,
  });

  function recordGame(game: Game) {
    setSession({ ...session, games: [...session.games, game] });
  }

  function startSession() {
    setSession({ ...session, isActive: true });
  }

  function endSession() {
    setSession({ ...session, isActive: false });
  }

  return {
    ...session,
    startSession,
    endSession,
    recordGame,
  };
}
