import React from "react";
import classNames from "classnames";
import { useGameContext } from "./useGame/GameContext";

export function ActiveWord({
  shouldAnimate = true,
}: {
  shouldAnimate?: boolean;
}) {
  return shouldAnimate ? <AnimatedWords /> : <Word />;
}

function AnimatedWords() {
  const { activeWordIndex, words } = useGameContext();
  return (
    // Wrapper to only show the active word
    <div className="relative overflow-hidden h-14  w-full">
      {/* Vertical track of all words */}

      <div
        className={classNames(
          "flex absolute w-full top-0 flex-col items-center justify-center transition-transform"
        )}
        // Moves the track to be positioned over the active word
        style={{ transform: `translateY(${activeWordIndex * -56}px)` }}
      >
        {/* Map thru each word, if the active word apply the character by character colors and typo animation
        ......otherwise we can just show the word */}
        {words.map((word, index) => {
          const isCurrentWord = index === activeWordIndex;
          return (
            <div
              key={`word-${word.value}`}
              className={classNames(
                "w-full text-5xl text-center py-1 h-14 transition-all transform scale-100",
                index < activeWordIndex && "text-[#76A08A] "
              )}
            >
              {isCurrentWord ? <Word /> : <span>{word.value}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Word() {
  const { inputValue, typos, activeWord } = useGameContext();
  return (
    <div
      key={typos.length}
      className={classNames(
        "text-5xl",
        typos &&
          typos.length &&
          typos[typos.length - 1]?.expected === activeWord &&
          "animate-typo"
      )}
    >
      {[...(activeWord as string)].map((letter, index) => {
        const inputLetter = [...inputValue][index];
        const isClean = index > inputValue.length - 1;
        const isCorrect =
          (!isClean && inputLetter === letter) || activeWord === inputValue;

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
