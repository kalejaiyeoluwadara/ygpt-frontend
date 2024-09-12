"use client";
import React, { useState } from "react";
import { RxUpload } from "react-icons/rx";
import { HiOutlineArrowSmUp } from "react-icons/hi";
import Empty from "./Empty";
import Chat from "./Chat";
import Nav from "./MainNav";

type Tmessage = {
  sender: string;
  text: string;
};

function Main() {
  const [empty, setRemoveEmpty] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Tmessage[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (prompt.trim().length === 0) return;

    setRemoveEmpty(false);
    setLoading(true);

    setMessages((prev) => [...prev, { text: prompt, sender: "human" }]);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessages((prev) => [...prev, { text: data.text, sender: "ai" }]);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
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
    <main className="flex flex-col w-full flex-1 h-full items-start">
      {/* Nav */}
      <Nav />
      {/* Main content */}
      <main className="flex w-full h-full flex-1 items-center overflow-x-hidden justify-center">
        {empty ? (
          <Empty handlePromptClick={handlePromptClick} />
        ) : (
          <Chat messages={messages} loading={loading} />
        )}
      </main>
      {/* Footer text input */}
      <footer className="flex-center h-[100px] w-full">
        <div className="w-[80%] bg-neutral-700 px-2 flex-center h-[50px] rounded-full">
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
            className={`h-[30px] w-[30px] flex-center transition-all rounded-full ${
              prompt.length === 0 ? "bg-gray-200" : "bg-white hover:bg-gray-200"
            }`}
          >
            <HiOutlineArrowSmUp size={25} />
          </button>
        </div>
      </footer>
    </main>
  );
}

export default Main;
