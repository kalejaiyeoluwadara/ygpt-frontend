"use client";
import React, { useState } from "react";
import { RiAttachment2 } from "react-icons/ri";
import VisionChat from "./VisionChat";
import Nav from "./MainNav";
import { HiOutlineArrowSmUp } from "react-icons/hi";
import { MdOutlineImageSearch } from "react-icons/md"; // Icon for empty state
import axios from "axios";
import { TbSquareRoundedLetterYFilled } from "react-icons/tb";
import { useGlobal } from "../context";
type Tmessage = {
  sender: string;
  text?: string;
  imageUrl?: string;
};

function StudyPal() {
  const { side, setAside } = useGlobal();
  const [empty, setRemoveEmpty] = useState(true);
  const [file, setFile] = useState<File | null>(null); // File state for uploading images
  const [messages, setMessages] = useState<Tmessage[]>([]); // Type the state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Error state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null); // Clear any previous error when a new file is selected
    }
  };

  const sendMessage = async () => {
    if (!file) {
      setError("Please attach an image before sending."); // Error if no image is attached
      return;
    }

    setRemoveEmpty(false);
    setLoading(true);
    setError(null); // Clear any previous error

    // Add the human message with the image to the chat
    const imageUrl = URL.createObjectURL(file);
    setMessages((prev) => [...prev, { imageUrl, sender: "human" }]);

    const formData = new FormData();
    formData.append("image", file); // Add file to form data

    try {
      const response = await axios.post(
        "https://gemini-api-46ez.onrender.com/vision",
        formData, // Send image data
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type for file uploads
          },
        }
      );

      if (response.status === 200) {
        // Add the AI response to the chat
        setMessages((prev) => [
          ...prev,
          { text: response.data.text, sender: "ai" },
        ]);
      } else {
        setError(
          response.data.error ||
            "An error occurred while generating a response."
        );
      }
    } catch (error) {
      setError("Failed to fetch AI response. Please try again later.");
    } finally {
      setLoading(false);
      setFile(null); // Clear the file after submission
    }
  };

  return (
    <main className="flex flex-col w-full flex-1 h-full items-start ">
      {/* Nav */}
      <Nav side={side} setAside={setAside} />
      {/* Main content */}
      <main className="flex w-full h-full flex-1 items-start overflow-x-hidden justify-center  p-2 sm:p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center text-center max-w-md">
            {/* Icon */}
            <TbSquareRoundedLetterYFilled className="text-white" size={40} />
            {/* Title */}
            <p className="text-2xl font-bold mt-20 text-gray-100">
              Welcome to YGPT Studypal
            </p>
            {/* Description */}
            <p className="text-gray-200 mb-4">
              Upload a File, and StudyPal will summarise, create tips, notes and
              quizes based on the your text file.
            </p>
            {/* Call to action */}
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-gray-200 text-black py-2 px-4 rounded-full shadow-lg hover:bg-white transition-all"
            >
              <RiAttachment2 size={20} className="inline-block mr-2" />
              Upload File
            </label>
            {/* Hidden file input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
          </div>
        ) : (
          <VisionChat messages={messages} loading={loading} />
        )}
      </main>
      {/* Footer for file input and submission */}
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
            <RiAttachment2 size={25} className="text-white" />
          </label>

          {file && (
            <div className="ml-3 text-white text-sm">
              <p>Image attached: {file.name}</p>
            </div>
          )}

          <button
            onClick={sendMessage}
            disabled={loading} // Disable button while loading
            className={`ml-3 h-[40px] w-[40px] flex-center transition-all rounded-full ${
              !file || loading
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            <HiOutlineArrowSmUp size={25} />
          </button>
        </div>
      </footer>

      {/* Error message display */}
      {error && (
        <div className="text-red-500 w-full px-2 flex items-center justify-center pb-8 text-sm mt-2 text-center">
          {error}
        </div>
      )}
    </main>
  );
}

export default StudyPal;
