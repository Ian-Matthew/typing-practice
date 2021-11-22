export interface Session {
  games: Game[];
  isActive: boolean;
  recordGame: (game: Game) => void;
  startSession: () => void;
  endSession: () => void;
  getAggregateStats: () => SessionStats;
  resetSession: () => void;
}

export interface SessionStats extends Stats {
  gamesPlayed: number;
}

export interface Stats {
  wpm: number;
  time: number;
  words: Word[];
  typos: Typo[];
}

export interface Game {
  words: Array<Word>;
  status: "Ready" | "Loading" | "Active" | "Over";
  currentWordIndex: number;
  typos: Array<Typo>;
  inputValue: string;
  time: number;
}

export interface GameState extends Game {
  activeWord: string;
  playAgain: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  endGame: () => void;
  preloadWords: () => void;
}

export interface Word {
  value: string;
  completed: boolean;
}

export type Typo = {
  value: string;
  expected: string;
};

export type GameAction =
  | { type: "READY_NEW_GAME"; words: string[] }
  | { type: "END_GAME" }
  | { type: "ADD_TYPO"; typo: string; value: string }
  | { type: "MOVE_TO_NEXT_WORD" }
  | { type: "UPDATE_INPUT_VALUE"; inputValue: string }
  | { type: "UPDATE_TIMER" }
  | { type: "START_NEW_GAME"; words: string[] }
  | { type: "PRELOAD_WORDS"; words: string[] };

export interface ContextType extends Game {
  dispatch: Dispatch;
}

export type Dispatch = (action: GameAction) => void;
