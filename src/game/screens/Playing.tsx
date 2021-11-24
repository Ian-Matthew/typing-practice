import React from "react";
import { useGameContext } from "../useGame/GameContext";
import { Button } from "../../components/Button";
import { ActiveGameStats } from "../Stats";
import { useSessionContext } from "../../session/SessionProvider";
import { useSoundEffects } from "../useGame/useGameSounds";
import { ScorePing } from "../ScorePing";
import { ActiveWord } from "../ActiveWord";
export function ActiveGame() {
  const { endGame, status } = useGameContext();
  const { endSession } = useSessionContext();
  useSoundEffects();
  return (
    <div className="flex space-y-4 relative flex-col items-center justify-center">
      {/* CSS effect when word spelled */}
      <ScorePing />
      {/* Display of the active word that needs spelling */}
      <ActiveWord />
      {/* Input the user is typing in */}
      <Input />
      <div className="max-w-prose mx-auto text-center h-12 flex items-center justify-center">
        {status === "Ready" ? <GameDescription /> : <ActiveGameStats />}
      </div>
      {/* Cancel/End Round Button */}
      <Button
        onClick={() => {
          return status === "Ready" ? endSession() : endGame();
        }}
      >
        {status === "Ready" ? "Cancel" : "End Game"}
      </Button>
    </div>
  );
}

// The input the user types in
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

// The description of the game
function GameDescription() {
  return (
    <div className="font-display font-medium ">
      Start typing the word above to initiate the practice session. Once you
      enter all letters correctly, a new word will be shown.
    </div>
  );
}
