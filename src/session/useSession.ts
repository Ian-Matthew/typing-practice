import React from "react";
import {
  getCompletedWords,
  getWordsPerMinute,
} from "../game/game-logic-helpers";
import { Game, Typo, Word } from "../types";
import { useLocalStorageState } from "../utils/useLocalStorageState";
export function useSession() {
  const [session, setSession] = useLocalStorageState(
    {
      games: [] as Game[],
    },
    "typing-session"
  );

  const [isActive, setIsActive] = React.useState(false);

  function recordGame(game: Game) {
    setSession({ ...session, games: [...session.games, game] });
  }

  function startSession() {
    console.log("starting....");
    setIsActive(true);
  }

  function endSession() {
    setIsActive(false);
  }

  function resetSession() {
    setSession({
      games: [] as Game[],
    });
  }

  function getAggregateStats() {
    const aggregateStats = session.games.reduce(
      (stats, game) => {
        const completedWords = getCompletedWords(game.words);
        stats.words = [...stats.words, ...completedWords];
        stats.typos = [...stats.typos, ...game.typos];
        stats.time += game.time;
        return stats;
      },
      {
        words: [] as Word[],
        typos: [] as Typo[],
        time: 0 as number,
      }
    );

    return {
      ...aggregateStats,
      gamesPlayed: session.games.length,
      wpm: getWordsPerMinute(aggregateStats.words, aggregateStats.time),
    };
  }

  return {
    ...session,
    startSession,
    endSession,
    resetSession,
    recordGame,
    isActive,
    getAggregateStats,
  };
}
