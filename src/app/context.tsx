"use client";
import React, { useContext, useState, ReactNode } from "react";

// Define the shape of the context value
interface AppContextType {
  side: boolean;
  hide: boolean;
  setAside: React.Dispatch<React.SetStateAction<boolean>>;
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

function AppProvider({ children }: Props) {
  const [side, setAside] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ side, setAside, hide, setHide }}>
      {children}
    </AppContext.Provider>
  );
}

export const useGlobal = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobal must be used within an AppProvider");
  }
  return context;
};

export default AppProvider;
