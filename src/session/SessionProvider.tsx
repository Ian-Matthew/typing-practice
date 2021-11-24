import React from "react";
import { useSession } from "./useSession";
import { Session } from "../game/types";

const SessionContext = React.createContext<Session | undefined>(undefined);

type SessionProviderProps = { children: React.ReactNode };

function SessionProvider({ children }: SessionProviderProps) {
  const session = useSession();
  // Always end session on cleanup, so user sees splash screen on next visit
  React.useEffect(() => {
    return () => session.endSession();
  }, []);
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

function useSessionContext() {
  const context = React.useContext(SessionContext);
  if (context === undefined) {
    throw new Error("session context must be used within provider");
  }
  return context;
}

export { SessionProvider, useSessionContext };
