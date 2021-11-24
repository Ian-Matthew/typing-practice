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
  status: "Ready" | "Loading" | "Active" | "Over" | "Paused";
  activeWordIndex: number;
  typos: Array<Typo>;
  inputValue: string;
  started?: Date;
  activeWord?: string | null;
  completedWords?: Word[];
  time?: number;
}

export interface GameMethods {
  readyNewGame: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  endGame: () => void;
  preloadWords: () => void;
}

export type GameContext = Game & GameMethods;

export interface Word {
  value: string;
  completed: boolean;
}

export type Typo = {
  value: string;
  expected: string;
};

export type GameAction =
  | { type: "READY_NEW_GAME"; words: Word[] }
  | { type: "END_GAME" }
  | { type: "UPDATE_INPUT_VALUE"; inputValue: string }
  | { type: "UPDATE_TIMER" };

export interface ContextType extends Game {
  dispatch: Dispatch;
}

export type Dispatch = (action: GameAction) => void;
