import { Game, GameAction, Typo, Word } from "../types";
import React from "react";
import { useSessionContext } from "../session/SessionProvider";

export const defaultState: Game = {
  words: [] as Word[],
  status: "Loading",
  currentWordIndex: 0,
  typos: [] as Typo[],
  inputValue: "",
  time: 0,
};

export interface GameState extends Game {
  activeWord: string;
  playAgain: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  endGame: () => void;
}

export function useGame(): GameState {
  const [state, dispatch] = React.useReducer(gameReducer, defaultState);

  const [preloadedwords, setPreloadedWords] = React.useState([] as string[]);

  const session = useSessionContext();

  const activeWord = state?.words[state.currentWordIndex]?.value;

  async function getWords() {
    const response = await window.fetch(
      "https://random-word-api.herokuapp.com/word?number=100"
    );
    const data = await response.json();
    return data;
  }

  async function fetchInitialWords() {
    const words = await getWords();
    dispatch({ type: "START_NEW_GAME", words });
  }

  // Handle statuses ... loading and timer...
  React.useEffect(() => {
    let interval: number | null = null;
    if (state.status === "Loading") {
      fetchInitialWords();
    }
    if (state.status === "Active") {
      interval = window.setInterval(() => {
        dispatch({ type: "UPDATE_TIMER" });
      }, 1000);
    } else if (state.time !== 0) {
      window.clearInterval(interval);
    }
    return () => window.clearInterval(interval);
  }, [state.status, state.time]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.currentTarget;
    const formattedValue = value.trim().toLowerCase();
    const lowerCasedWord = activeWord.toLowerCase();
    // partial match
    const fullMatch =
      formattedValue.length === lowerCasedWord.length &&
      formattedValue === lowerCasedWord;
    if (fullMatch) {
      dispatch({ type: "MOVE_TO_NEXT_WORD" });
    } else {
      const partialMatch =
        formattedValue === lowerCasedWord.substring(0, formattedValue.length);
      if (partialMatch) {
        dispatch({ type: "UPDATE_INPUT_VALUE", inputValue: value });
      } else {
        dispatch({ type: "ADD_TYPO", typo: value, inputValue: value });
      }
    }
  }

  async function playAgain() {
    dispatch({ type: "START_NEW_GAME", words: preloadedwords });
  }

  async function endGame() {
    dispatch({ type: "END_GAME" });
    session.recordGame(state);
    const words = await getWords();
    setPreloadedWords(words);
  }

  return { ...state, handleInputChange, activeWord, playAgain, endGame };
}

const gameReducer = (state: Game, action: GameAction): Game => {
  switch (action.type) {
    case "START_NEW_GAME":
      const asWords = action.words.map((w) => ({ value: w, completed: false }));
      return {
        ...state,
        status: "Active",
        words: asWords,
        currentWordIndex: 0,
        typos: [],
        inputValue: "",
        time: 0,
      };

    case "END_GAME": {
      return {
        ...state,
        currentWordIndex: 0,
        inputValue: "",
        status: "Over",
      };
    }

    case "ADD_TYPO":
      const currentWord = state.words[state.currentWordIndex];
      const typo: Typo = {
        value: action.typo,
        expected: currentWord.value,
      };
      return {
        ...state,
        inputValue: action.typo,
        // inputValue: '',
        typos: [...state.typos, typo],
      };

    case "MOVE_TO_NEXT_WORD":
      const newWords = [...state.words];
      const newCurrentWordIndex = state.currentWordIndex + 1;
      newWords[state.currentWordIndex].completed = true;
      return {
        ...state,
        words: newWords,
        currentWordIndex: newCurrentWordIndex,
        inputValue: "",
      };

    case "UPDATE_INPUT_VALUE":
      return {
        ...state,
        inputValue: action.inputValue,
      };
    case "UPDATE_TIMER":
      return {
        ...state,
        time: state.time++,
      };
    default:
      throw new Error(`Invalid Action Type`);
  }
};
