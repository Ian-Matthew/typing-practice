import React from "react";
import { useSession } from "../../session/useSession";
import { Game, GameAction, GameContext, Word, Typo } from "../types";
import { getWords } from "./fetchWords";
import { useTimer } from "./useTimer";
export const defaultState: Game = {
  words: [] as Word[],
  status: "Ready",
  activeWordIndex: 0,
  typos: [] as Typo[],
  inputValue: "",
};

export function gameReducer(state: Game, action: GameAction): Game {
  switch (action.type) {
    case "READY_NEW_GAME":
      return {
        ...state,
        words: action.words,
        status: "Ready",
        activeWordIndex: 0,
        typos: [],
        inputValue: "",
      };

    case "END_GAME": {
      return {
        ...state,
        activeWordIndex: 0,
        inputValue: "",
        status: "Over",
      };
    }

    case "UPDATE_INPUT_VALUE":
      const inputValue = action.inputValue;
      const activeWord = state.words[state.activeWordIndex].value;
      // Did the user type the correct letter?
      const isPartialMatch = activeWord.startsWith(inputValue);
      // Did the user type the exact word? i.e. can we move on the next word?
      const isFullMatch = inputValue === activeWord;
      // update words ifFullMatch
      const words = [...state.words];
      if (isFullMatch) {
        words[state.activeWordIndex].completed = true;
      }
      // Do we need to record a typo? (unique typos only for now)
      const isTypo =
        !isPartialMatch && !state.typos.find((t) => t.value === inputValue);
      return {
        ...state,
        status: "Active",
        inputValue: isFullMatch ? "" : inputValue,
        activeWordIndex: isFullMatch
          ? state.activeWordIndex + 1
          : state.activeWordIndex,
        typos: isTypo
          ? [...state.typos, { value: inputValue, expected: activeWord }]
          : state.typos,
        words,
      };

    default:
      throw new Error(`Invalid Action Type`);
  }
}

export function useGame(): GameContext {
  // Need session to record the game when its over
  const session = useSession();
  const [state, dispatch] = React.useReducer(gameReducer, defaultState);
  // We can optimistically fetch the next set of words, so we start the "next" game instantly
  const [preLoadedWords, setPreLoadedWords] = React.useState<Word[]>([]);

  const timer = useTimer();

  // Method passed to the games input
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "UPDATE_INPUT_VALUE",
      inputValue: e.target.value,
    });
  }

  // Optimistically prepare the "next" game by using the preloaded words if we have them, and fetching them if we dont
  async function readyNewGame() {
    // reset timer
    timer.reset();
    // grab next words
    let words = preLoadedWords;
    if (words.length === 0) {
      words = await getWords();
    }

    dispatch({ type: "READY_NEW_GAME", words });
  }

  function preloadWords() {
    return getWords().then((words) => setPreLoadedWords(words));
  }

  // Method to call when a game ends
  async function endGame() {
    // 1. Capture a snapshot of the game state
    // 4. Record the snapshoted game into the users session
    const finishedGame = JSON.parse(
      JSON.stringify({
        words: completedWords,
        typos: state.typos,
        time: timer.time,
      })
    );
    session.recordGame(finishedGame);
    // 2. End the game
    dispatch({ type: "END_GAME" });
    // 3. Optimistically Fetch words for the next round
    getWords().then((words) => setPreLoadedWords(words));
  }

  const activeWord = React.useMemo(
    () => state?.words[state.activeWordIndex]?.value || null,
    [state.words, state.activeWordIndex]
  );

  const completedWords = state.words.filter((w) => w.completed);

  // increment timer every second while active
  React.useEffect(() => {
    if (state.status === "Active") {
      timer.play();
    }
    if (state.status === "Over" || state.status === "Paused") {
      timer.pause();
    }
  }, [state.status]);

  // Make sure the game ends if all words are completed
  React.useEffect(() => {
    if (
      completedWords.length > 0 &&
      completedWords.length === state.words.length
    ) {
      endGame();
    }
  }, [completedWords.length, state.words.length]);

  return {
    ...state,
    handleInputChange,
    endGame,
    readyNewGame,
    activeWord,
    completedWords,
    preloadWords,
    time: timer.time,
  };
}
