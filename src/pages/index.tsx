import type { NextPage } from "next";

import React from "react";
import { SessionProvider } from "../session/SessionProvider";
import StartScreen from "../StartScreen";

const Home: NextPage = () => {
  return (
    <SessionProvider>
      <div
        style={{ fontVariantLigatures: "none" }}
        className="flex flex-col items-center justify-center font-fancy min-h-screen"
      >
        <StartScreen />
      </div>
    </SessionProvider>
  );
};

export default Home;
