import React from "react";
import { Button } from "../../Button";
import { useGameContext } from "../useGame/GameContext";
import { useSessionContext } from "../../session/SessionProvider";
import Image from "next/image";
import { Game } from "./Game";
export default function StartScreen() {
  const { readyNewGame, preloadWords } = useGameContext();
  const { startSession, isActive } = useSessionContext();

  React.useEffect(() => {
    preloadWords();
  }, []);
  if (!isActive)
    return (
      <div className="max-w-sm flex flex-col items-center justify-center space-y-3">
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
              readyNewGame();
            }}
          >
            Start Practice
          </Button>
        </div>
      </div>
    );

  return <Game />;
}
