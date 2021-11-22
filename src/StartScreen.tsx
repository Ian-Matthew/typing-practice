import React from "react";
import { GameBoard } from "./game/GameBoard";
import { Button } from "./Button";
import { useGameContext } from "./game/GameContext";
import { useSessionContext } from "./session/SessionProvider";
import Image from "next/image";
export default function StartScreen() {
  const { preloadWords, playAgain } = useGameContext();
  const { startSession, isActive, endSession } = useSessionContext();

  React.useEffect(() => {
    preloadWords();
  }, []);
  if (!isActive)
    return (
      <>
        <div className="p-5">
          <Image
            blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==
          "
            placeholder="blur"
            width={320}
            height={320}
            src="/WFH.svg"
          ></Image>
        </div>
        <h1 className="text-5xl font-semibold mt-5">Typing Practice</h1>
        <div className="space-x-5 mt-5 flex ">
          <Button
            onClick={() => {
              startSession();
              playAgain();
            }}
          >
            Start Practice
          </Button>
        </div>
      </>
    );

  return <GameBoard />;
}
