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

function clampPing(activeWordLength: number) {
  const value = activeWordLength * 25;
  const low = 176;
  const high = Math.min(value, 320);
  return Math.max(low, high);
}

function ScorePing() {
  const { words } = useGameContext();
  const wordsSpelled = getCompletedWords(words);
  return wordsSpelled.length > 0 ? (
    <div
      key={wordsSpelled.length}
      style={{
        zIndex: -1,
        width: clampPing(wordsSpelled[wordsSpelled.length - 1].value.length),
        height: clampPing(wordsSpelled[wordsSpelled.length - 1].value.length),
      }}
      className="absolute w-80 h-44 rounded-full opacity-0  bg-[#FCD16B] bg-opacity-20 animate-score"
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
  const { currentWordIndex, words, inputValue, typos } = useGameContext();
  return (
    // Wrapper to only show the active word
    <div className="relative overflow-hidden h-12  w-full">
      {/* Vertical track of all words */}

      <div
        className={classNames(
          "flex absolute w-full top-0 flex-col items-center justify-center transition-transform"
        )}
        // Moves the track to be positioned over the active word
        style={{ transform: `translateY(${currentWordIndex * -3}rem)` }}
      >
        {/* Map thru each word, if the active word apply the character by character colors and typo animation
        ......otherwise we can just show the word */}
        {words.map((word, index) => {
          const isCurrentWord = index === currentWordIndex;
          return (
            <div
              key={`word-${word.value}`}
              className={classNames(
                "w-full text-4xl text-center py-1 h-12 transition-all transform scale-100",
                index < currentWordIndex && "text-[#76A08A] "
              )}
            >
              {isCurrentWord ? (
                <div
                  key={typos.length}
                  className={classNames(
                    typos &&
                      typos.length &&
                      typos[typos.length - 1]?.expected === word.value &&
                      "animate-typo"
                  )}
                >
                  {[...word.value].map((letter, index) => {
                    const inputLetter = [...inputValue][index];
                    const isClean = index > inputValue.length - 1;
                    const isCorrect =
                      (!isClean && inputLetter === letter) ||
                      word.value === inputValue;
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
              ) : (
                <span>{word.value}</span>
              )}
            </div>
          );
        })}
      </div>
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
