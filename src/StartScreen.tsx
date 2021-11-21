import React from "react";
import { GameBoard } from "./game/GameBoard";
import { useSessionContext } from "./session/SessionProvider";
import { Button } from "./Button";
export default function StartScreen() {
  const { isActive, startSession } = useSessionContext();

  if (!isActive)
    return (
      <>
        <div className="w-80 p-5">
          <img src="/WFH.svg"></img>
        </div>
        <h1 className="text-3xl mt-5">Typing Practice</h1>
        <div className="space-x-5 mt-5 flex ">
          <Button onClick={() => startSession()}>Start Practice</Button>
        </div>
      </>
    );

  return <GameBoard />;
}
