"use client";
import React, { useState } from "react";
import { RiAttachment2 } from "react-icons/ri";
import VisionChat from "./VisionChat";
import Nav from "./MainNav";
import { HiOutlineArrowSmUp } from "react-icons/hi";
type Tmessage = {
  sender: string;
  text?: string;
  imageUrl?: string;
};

function Vision() {
  const [empty, setRemoveEmpty] = useState(true);
  const [file, setFile] = useState<File | null>(null); // File state for uploading images
  const [messages, setMessages] = useState<Tmessage[]>([]); // Type the state
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const sendMessage = async () => {
    if (!file) return;

    setRemoveEmpty(false);
    setLoading(true);

    // Add the human message to the chat
    const imageUrl = URL.createObjectURL(file);
    setMessages((prev) => [...prev, { imageUrl, sender: "human" }]);

    const formData = new FormData();
    formData.append("image", file); // Add file to form data

    try {
      const response = await fetch(
        "https://gemini-api-46ez.onrender.com/generate",
        {
          method: "POST",
          body: formData, // Send image data
        }
      );

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
      setFile(null);
    }
  };

  return (
    <main className="flex flex-col w-full flex-1 h-full items-start">
      {/* Nav */}
      <Nav />
      {/* Main content */}
      <main className="flex w-full h-full flex-1 items-center overflow-x-hidden justify-center">
        <VisionChat messages={messages} loading={loading} />
      </main>
      {/* footer file input */}
      <footer className="flex-center h-[100px] w-full">
        <div className="w-auto bg-neutral-700 px-2 py-3 flex-center h-[50px] rounded-full">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <RiAttachment2 size={25} />
          </label>
          <button
            onClick={sendMessage}
            className={`ml-3 h-[40px] w-[40px] flex-center transition-all rounded-full ${
              !file ? "bg-gray-200" : "bg-white hover:bg-gray-200"
            }`}
          >
            <HiOutlineArrowSmUp size={25} />
          </button>
        </div>
      </footer>
    </main>
  );
}

export default Vision;
