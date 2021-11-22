import React from "react";
import classNames from "classnames";
import { useGameContext } from "./GameContext";
import { getCompletedWords, getCompliment } from "./game-logic-helpers";
import { Button } from "../Button";
import { ActiveGameStats } from "../Stats";
import { useSessionContext } from "../session/SessionProvider";
import useSound from "use-sound";

export function GameBoard(): JSX.Element | null {
  const { status } = useGameContext();
  if (status === "Loading") return <div>Loading...</div>;
  if (status === "Active" || status === "Ready") return <ActiveGame />;
  if (status === "Over") return <GameOver />;
  return null;
}

function ActiveGame() {
  const { endGame, status } = useGameContext();
  const { endSession } = useSessionContext();
  useSoundEffects();
  return (
    <div className="flex  space-y-4 relative flex-col items-center justify-center">
      <ScorePing />
      <ActiveWord />
      <Input />
      <div className="max-w-prose mx-auto text-center h-12 flex items-center justify-center">
        {status === "Ready" && <GameDescription />}
        {status === "Active" && <ActiveGameStats />}
      </div>
      <Button
        onClick={() => {
          return status === "Active" ? endGame() : endSession();
        }}
      >
        {status === "Active" ? "End Game" : "Cancel"}
      </Button>
    </div>
  );
}

function clampPing(activeWordLength: number) {
  const value = activeWordLength * 25;
  const low = 190;
  const high = Math.min(value, 320);
  return Math.max(low, high);
}

function ScorePing() {
  const { words, typos } = useGameContext();
  const wordsSpelled = getCompletedWords(words);
  const hadTypo = typos.find(
    (t) => t.expected === wordsSpelled[wordsSpelled.length - 1]?.value
  );

  return wordsSpelled.length > 0 ? (
    <>
      <div
        key={wordsSpelled.length}
        style={{
          zIndex: -1,
          width: clampPing(wordsSpelled[wordsSpelled.length - 1].value.length),
          height: clampPing(wordsSpelled[wordsSpelled.length - 1].value.length),
        }}
        className={classNames(
          "absolute w-80 h-44 rounded-full opacity-0  bg-[#FCD16B] bg-opacity-20 animate-score"
        )}
      ></div>

      <div
        key={wordsSpelled.length}
        style={{
          zIndex: -2,
          width:
            clampPing(wordsSpelled[wordsSpelled.length - 1].value.length) + 50,
          height:
            clampPing(wordsSpelled[wordsSpelled.length - 1].value.length) + 50,
        }}
        className={classNames(
          "absolute w-80 h-44 rounded-full filter blur-lg opacity-0 bg-opacity-10 animate-score-perfect",
          hadTypo ? "bg-transparent" : "bg-yellow-500"
        )}
      ></div>
    </>
  ) : null;
}

function GameOver() {
  const { playAgain } = useGameContext();
  const compliment = React.useRef(getCompliment());
  return (
    <div className="flex flex-col space-y-5 items-center justify-center">
      <div className="text-5xl font-semibold">Session Results</div>
      <blockquote className="font-display font-medium ">
        {compliment.current}
      </blockquote>
      <ActiveGameStats />
      <Button onClick={playAgain}>Play Again</Button>
    </div>
  );
}

function usePrevious(value: any) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = React.useRef();
  // Store current value in ref
  React.useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes
  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

function useSoundEffects() {
  const { currentWordIndex, words, inputValue, typos, activeWord } =
    useGameContext();
  const [playLetter] = useSound("/sounds/pop.wav", { volume: 0.25 });
  const [playMistake] = useSound("/sounds/typo.wav", { volume: 0.2 });
  const [playWin] = useSound("/sounds/win.wav", { volume: 0.5 });
  const lastInputValue = usePrevious(inputValue);
  const lastActiveWord = usePrevious(activeWord);
  const lastLength = lastInputValue?.length || 0;

  React.useEffect(() => {
    const hasTypo = typos.find((typo) => typo.expected === lastActiveWord);
    if (currentWordIndex) {
      if (currentWordIndex > 0) {
        playWin({ playbackRate: 1.5 });
      }
    }
  }, [currentWordIndex]);

  React.useEffect(() => {
    const letterTyped = inputValue[inputValue.length - 1];
    if (inputValue.length >= lastLength) {
      const isMatch = letterTyped === activeWord[inputValue.length - 1];
      if (isMatch) {
        playLetter({
          playbackRate: (inputValue.length / activeWord.length) * 0.7 + 1,
        });
      } else {
        playMistake();
      }
    }
  }, [inputValue]);
}

function ActiveWord({ shouldAnimate = true }: { shouldAnimate?: boolean }) {
  const { currentWordIndex, words, inputValue, typos, activeWord } =
    useGameContext();

  return shouldAnimate ? (
    // Wrapper to only show the active word
    <div className="relative overflow-hidden h-14  w-full">
      {/* Vertical track of all words */}

      <div
        className={classNames(
          "flex absolute w-full top-0 flex-col items-center justify-center transition-transform"
        )}
        // Moves the track to be positioned over the active word
        style={{ transform: `translateY(${currentWordIndex * -56}px)` }}
      >
        {/* Map thru each word, if the active word apply the character by character colors and typo animation
        ......otherwise we can just show the word */}
        {words.map((word, index) => {
          const isCurrentWord = index === currentWordIndex;
          return (
            <div
              key={`word-${word.value}`}
              className={classNames(
                "w-full text-5xl text-center py-1 h-14 transition-all transform scale-100",
                index < currentWordIndex && "text-[#76A08A] "
              )}
            >
              {isCurrentWord ? (
                <ActiveWordDisplay />
              ) : (
                <span>{word.value}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <ActiveWordDisplay />
  );
}

function ActiveWordDisplay() {
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
      {[...activeWord].map((letter, index) => {
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

function GameDescription() {
  return (
    <div className="font-display font-medium ">
      Start typing the word above to initiate the practice session. Once you
      enter all letters correctly, a new word will be shown.
    </div>
  );
}
