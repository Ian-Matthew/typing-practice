import React from "react";
import { useGameContext } from "./useGame/GameContext";
import classNames from "classnames";
export function ScorePing() {
  const { typos, completedWords } = useGameContext();
  const lastCompletedWord = completedWords[completedWords.length - 1];
  console.log("words", completedWords);
  const hadTypo = typos.find((t) => t.expected === lastCompletedWord?.value);

  const pingSize = clampPing(lastCompletedWord?.value?.length || 0);

  return completedWords.length > 0 ? (
    <>
      <div
        key={completedWords.length}
        style={{
          zIndex: -1,
          width: pingSize,
          height: pingSize,
        }}
        className={classNames(
          "absolute w-80 h-44 rounded-full opacity-0  bg-[#FCD16B] bg-opacity-20 animate-score"
        )}
      />

      <div
        key={completedWords.length}
        style={{
          zIndex: -2,
          width: pingSize + 50,
          height: pingSize + 50,
        }}
        className={classNames(
          "absolute w-80 h-44 rounded-full filter blur-lg opacity-0 bg-opacity-10 animate-score-perfect",
          hadTypo ? "bg-transparent" : "bg-yellow-500"
        )}
      ></div>
    </>
  ) : null;
}

// Keeps ping within reasonable sizes
function clampPing(activeWordLength: number) {
  const value = activeWordLength * 25;
  const low = 190;
  const high = Math.min(value, 320);
  return Math.max(low, high);
}
