import React from "react";
import classNames from "classnames";
import { GameProvider, useGameContext } from "./GameContext";
import { getCompletedWords, getWordsPerMinute } from "./game-logic-helpers";
import { Button } from "../Button";
export function GameBoard() {
  return (
    <GameProvider>
      <Screen />
    </GameProvider>
  );
}

function Screen(): JSX.Element | null {
  const { status } = useGameContext();
  if (status === "Loading") return <div>Loading...</div>;
  if (status === "Active") return <ActiveGame />;
  if (status === "Over") return <GameOver />;
  return null;
}

function ActiveGame() {
  const { endGame } = useGameContext();
  return (
    <div className="flex relative flex-col space-y-4 items-center justify-center">
      <ScorePing />
      <ActiveWord />
      <Input />
      <Timer />
      <Button onClick={() => endGame()}>End Practice</Button>
    </div>
  );
}

function ScorePing() {
  const { words } = useGameContext();
  const wordsSpelled = getCompletedWords(words);
  return wordsSpelled.length > 0 ? (
    <div
      key={wordsSpelled.length}
      style={{ zIndex: -1 }}
      className="absolute w-80 h-80 rounded-full opacity-0  bg-pink-50 animate-score"
    ></div>
  ) : null;
}

function GameOver() {
  const { playAgain, words, time } = useGameContext();
  const wordsSpelled = getCompletedWords(words);
  const wpm = getWordsPerMinute(wordsSpelled, time);
  return (
    <>
      <div>Total Words: {wordsSpelled.length}</div>
      <div>WPM {wpm}</div>
      <Button onClick={playAgain}>Play Again</Button>
    </>
  );
}

function ActiveWord() {
  const { activeWord, inputValue, typos } = useGameContext();
  return (
    <div
      key={typos.length}
      className={classNames(
        "text-4xl flex flex-row",
        typos && typos.length && "animate-typo"
      )}
    >
      {[...activeWord].map((letter, index) => {
        const inputLetter = [...inputValue][index];
        const isClean = index > inputValue.length - 1;
        const isCorrect = !isClean && inputLetter === letter;
        const isInCorrect = !isClean && inputLetter !== letter;
        return (
          <span
            key={`letter-${letter}-${index}`}
            className={classNames({
              "text-[#76A08A]": isCorrect,
              "text-[#D1362F]": isInCorrect,
              "text-black": isClean,
            })}
          >
            {letter}
          </span>
        );
      })}
    </div>
  );
}

function Input() {
  const { inputValue, handleInputChange } = useGameContext();
  return (
    <input
      value={inputValue}
      onChange={handleInputChange}
      className="border text-2xl transition-all border-black px-3 py-2 text-center focus:outline-none focus:ring focus:ring-black"
      autoFocus
      type="text"
    />
  );
}

function Timer() {
  const { time } = useGameContext();
  return <span>{time}</span>;
}
