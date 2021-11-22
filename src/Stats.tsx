import {
  getCompletedWords,
  getWordsPerMinute,
} from "./game/game-logic-helpers";
import { useSessionContext } from "./session/SessionProvider";
import React from "react";
import { useGameContext } from "./game/GameContext";
export function SessionStats({}) {
  const { getAggregateStats, resetSession } = useSessionContext();
  const stats = getAggregateStats();
  return (
    <>
      <div className="flex font-display mx-auto flex-row items-center divide-x divide-black">
        <StatItem label="Total Games Played" value={stats.gamesPlayed} />
        <StatItem label="Total Words Typed" value={stats.words.length} />
        <StatItem label="Total WPM" value={stats.wpm} />
        <StatItem label="Total Typos" value={stats.typos.length} />
        <button className="font-semibold px-3" onClick={() => resetSession()}>
          Reset Data
        </button>
      </div>
    </>
  );
}

export function ActiveGameStats() {
  const { time, words, typos } = useGameContext();
  const completedWords = getCompletedWords(words);
  const WPM = React.useMemo(
    () => getWordsPerMinute(completedWords, time),
    [completedWords.length]
  );
  return (
    <div className="flex font-display mx-auto flex-row items-center divide-x divide-black">
      <StatItem label="Time" value={time} />
      <StatItem label="Words Typed" value={completedWords.length} />
      <StatItem label="WPM" value={WPM} />
      <StatItem label="Typos" value={typos.length} />
    </div>
  );
}

function StatItem({ label, value }) {
  return (
    <div className="flex flex-row items-center justify-center px-2 space-x-1">
      <div className="font-light">{label}:</div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
