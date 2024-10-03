"use client";

import React, { useState } from "react";
import axios from "axios";
import { RxUpload } from "react-icons/rx";
import { HiOutlineArrowSmUp } from "react-icons/hi";
import Empty from "./Empty";
import Chat from "./Chat";
import Nav from "./MainNav";

type Tmessage = {
  sender: string;
  text: string;
};
type SideBarProps = {
  side: boolean;
  setAside: React.Dispatch<React.SetStateAction<boolean>>;
};
function Main({ side, setAside }: SideBarProps) {
  const [empty, setRemoveEmpty] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Tmessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  const sendMessage = async () => {
    if (prompt.trim().length === 0) return;

    setRemoveEmpty(false);
    setLoading(true);
    setErrorMessage(null); // Clear any previous error messages

    setMessages((prev) => [...prev, { text: prompt, sender: "human" }]);

    try {
      const response = await axios.post(
        "/api/generate",
        { prompt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setMessages((prev) => [
          ...prev,
          { text: response.data.text, sender: "ai" },
        ]);
      } else {
        setErrorMessage("An error occurred while processing your request.");
      }
    } catch (error) {
      setErrorMessage(
        "An error occurred. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
      setPrompt("");
    }
  };

  const handlePromptClick = (text: string) => {
    setRemoveEmpty(false);
    setPrompt(text);
    sendMessage();
  };

  return (
    <main className="flex flex-col w-full  h-screen items-start">
      {/* Nav */}
      <Nav side={side} setAside={setAside} />

      {/* Main content */}
      <article className="flex w-full h-full flex-1  sm:items-center overflow-x-hidden justify-center">
        {empty ? (
          <Empty handlePromptClick={handlePromptClick} />
        ) : (
          <Chat messages={messages} loading={loading} />
        )}
      </article>

      {/* Footer text input */}
      <footer className="flex-center  h-[100px] w-full">
        <div className="sm:w-[80%] w-[90%] bg-neutral-700 px-2 flex-center h-[50px] rounded-full">
          <input
            type="text"
            className="!bg-transparent px-4 placeholder:text-gray-200 text-white border-none flex-1 outline-none"
            name="prompt"
            placeholder="Message YGPT"
            value={prompt}
            autoComplete="off"
            onChange={(e) => setPrompt(e.target.value)}
            style={{ backgroundColor: "transparent !important" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            onClick={sendMessage}
            className={`h-[30px] w-[30px] flex-shrink-0 flex-center transition-all rounded-full ${
              prompt.length === 0 ? "bg-gray-200" : "bg-white hover:bg-gray-200"
            }`}
          >
            <HiOutlineArrowSmUp size={25} />
          </button>
        </div>
      </footer>

      {/* Error Message Display */}
      {errorMessage && (
        <div className="text-red-500 w-full px-2 flex items-center justify-center pb-8 text-sm sm:mt-2 text-center">
          {errorMessage}
        </div>
      )}
    </main>
  );
}

export default Main;
