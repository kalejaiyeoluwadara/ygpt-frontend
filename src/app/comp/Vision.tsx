"use client";
import React, { useState } from "react";
import { RxUpload } from "react-icons/rx";
import { HiOutlineArrowSmUp } from "react-icons/hi";
import Empty from "./Empty";
import Chat from "./Chat";
import Nav from "./MainNav";
import VisionChat from "./VisionChat";
import { RiAttachment2 } from "react-icons/ri";
type Tmessage = {
  sender: string;
  text?: string;
  imageUrl?: string;
};

function Vision() {
  const [empty, setRemoveEmpty] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState<Tmessage[]>([]); // Type the state
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (prompt.trim().length === 0) return;

    setRemoveEmpty(false);
    setLoading(true);

    // Add the human message to the chat
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
        // Add the AI response to the chat
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
  const testMessages: Tmessage[] = [
    {
      sender: "human",
      imageUrl: "https://via.placeholder.com/150", // Replace with a real image URL
    },
    {
      sender: "ai",
      text: "Apple",
    },
    {
      sender: "human",
      imageUrl: "https://via.placeholder.com/150", // Replace with another real image URL
    },
    {
      sender: "ai",
      text: "Car",
    },
    {
      sender: "human",
      imageUrl: "https://via.placeholder.com/150", // Replace with another real image URL
    },
    {
      sender: "ai",
      text: "Laptop",
    },
  ];

  return (
    <main className="flex flex-col w-full flex-1 h-full items-start">
      {/* Nav */}
      <Nav />
      {/* Main content */}
      <main className="flex w-full h-full flex-1 items-center overflow-x-hidden justify-center">
        {/* <Empty empty={empty} setRemoveEmpty={setRemoveEmpty} /> */}
        <VisionChat messages={testMessages} loading={loading} />
      </main>
      {/* footer text input */}
      <footer className="flex-center h-[100px] w-full">
        <div className="w-auto bg-neutral-700 px-2 py-3 flex-center h-[50px] rounded-full">
          <button
            onClick={sendMessage}
            className={`h-[40px] w-[40px] flex-center transition-all rounded-full ${
              prompt.length === 0 ? "bg-gray-200" : "bg-white hover:bg-gray-200"
            }`}
          >
            <RiAttachment2 size={25} />
          </button>
        </div>
      </footer>
    </main>
  );
}

export default Vision;
