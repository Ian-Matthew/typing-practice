
export interface Session {
  games: Game[],
  isActive: boolean;
  recordGame: (game: Game) => void;
  startSession: () => void;
  endSession: () => void
}

export interface Game {
  words: Array<Word> ;
  status: 'Loading' | 'Active' | 'Over';
  currentWordIndex: number;
  typos: Array<Word>;
  inputValue: string;
  time: number;
};

export interface Word {
  value: string;
  completed: boolean;
}

export type Typo = {
  value: string;
  expected: string;
}


export type GameAction =
| { type: "START_NEW_GAME"; words: string[] }
| {type: "END_GAME"}
| { type: "ADD_TYPO"; typo: string }
| { type: "MOVE_TO_NEXT_WORD"}
| { type: "UPDATE_INPUT_VALUE"; inputValue: string }
| { type: "UPDATE_TIMER"}

export interface ContextType extends Game {
    dispatch: Dispatch;
}
  

export type Dispatch = (action: GameAction) => void;
