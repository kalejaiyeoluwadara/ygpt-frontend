"use client";
import React, { useContext, useState, ReactNode } from "react";

// Define the shape of the context value
interface AppContextType {
  side: boolean;
  hide: boolean;
  file: File | null;
  setAside: React.Dispatch<React.SetStateAction<boolean>>;
  setHide: React.Dispatch<React.SetStateAction<boolean>>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const AppContext = React.createContext<AppContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

function AppProvider({ children }: Props) {
  const [side, setAside] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);

  return (
    <AppContext.Provider
      value={{ side, setAside, hide, setHide, file, setFile }}
    >
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
