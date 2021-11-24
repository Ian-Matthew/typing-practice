import React from "react";
import { useSession } from "../../session/useSession";
import { Game, GameAction, GameContext, Word, Typo } from "../types";
import { getWords } from "./fetchWords";

export const defaultState: Game = {
  words: [] as Word[],
  status: "Ready",
  activeWordIndex: 0,
  typos: [] as Typo[],
  inputValue: "",
  time: 0,
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
        time: 0,
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
      console.log("isFull", isFullMatch);
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

    case "UPDATE_TIMER":
      return {
        ...state,
        time: state.time++,
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

  // Method passed to the games input
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: "UPDATE_INPUT_VALUE",
      inputValue: e.target.value,
    });
  }

  // Optimistically prepare the "next" game by using the preloaded words if we have them, and fetching them if we dont
  async function readyNewGame() {
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
    const finishedGame = Object.freeze({ ...state });
    // 2. End the game
    dispatch({ type: "END_GAME" });
    // 3. Optimistically Fetch words for the next round
    getWords().then((words) => setPreLoadedWords(words));
    // 4. Record the snapshoted game into the users session
    session.recordGame(finishedGame);
  }

  const activeWord = React.useMemo(
    () => state?.words[state.activeWordIndex]?.value || null,
    [state.words, state.activeWordIndex]
  );

  const completedWords = state.words.filter((w) => w.completed);
  console.log("worrdd", completedWords);

  return {
    ...state,
    handleInputChange,
    endGame,
    readyNewGame,
    activeWord,
    completedWords,
    preloadWords,
  };
}
