import React from "react";
import useSound from "use-sound";
import { usePrevious } from "../../utils/usePrevious";
import { useGameContext } from "./GameContext";
export function useSoundEffects() {
  const { activeWordIndex, words, inputValue, typos, activeWord } =
    useGameContext();
  // sound to play on correct letter
  const [playLetter] = useSound("/sounds/pop.wav", { volume: 0.25 });
  // sound to play on typo
  const [playMistake] = useSound("/sounds/typo.wav", { volume: 0.2 });
  // sound to play on word completion
  const [playWin] = useSound("/sounds/win.wav", { volume: 0.5 });

  // use the previous values to properly sync sound effects
  const lastInputValue = usePrevious(inputValue);
  // todo: how to fix this typescript error?
  const lastLength = lastInputValue?.length || 0;

  React.useEffect(() => {
    // play win sound on word completion
    if (activeWordIndex > 0) {
      playWin({ playbackRate: 1.5 });
    }
  }, [activeWordIndex]);

  React.useEffect(() => {
    // grab the letter that was "just" typed
    const letterTyped = inputValue[inputValue.length - 1];
    // if the newValue is longer or equal to the length last value, play a sound
    // ..this is so we don't play the typo sound again when we delete a letter after a typo letter
    if (inputValue.length >= lastLength) {
      const isMatch = letterTyped === activeWord?.[inputValue.length - 1];
      // On Match play the letter sound, otherwise play typo sound
      isMatch
        ? playLetter({
            playbackRate: (inputValue.length / activeWord.length) * 0.7 + 1,
          })
        : playMistake();
    }
  }, [inputValue]);
}
