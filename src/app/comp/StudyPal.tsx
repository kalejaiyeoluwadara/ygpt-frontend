"use client";
import React, { useState } from "react";
import { RiAttachment2 } from "react-icons/ri";
import VisionChat from "./VisionChat";
import Nav from "./MainNav";
import { HiOutlineArrowSmUp } from "react-icons/hi";
import { MdOutlineImageSearch } from "react-icons/md";
import axios from "axios";
import { TbSquareRoundedLetterYFilled } from "react-icons/tb";
import { useGlobal } from "../context";
import StudyChat from "./StudyChat";
type Tmessage = {
  sender: string;
  text?: string;
  imageUrl?: string;
};

function StudyPal() {
  const { side, setAside } = useGlobal();
  const [empty, setRemoveEmpty] = useState(true);
  const { file, setFile } = useGlobal();
  const [messages, setMessages] = useState<Tmessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  return (
    <main className="flex flex-col w-full flex-1 h-full items-start ">
      {/* Nav */}
      <Nav side={side} setAside={setAside} />
      {/* Main content */}
      <main className="flex w-full h-full flex-1 items-start overflow-x-hidden justify-center sm:mt-0 mt-8  p-2 sm:p-4">
        {!file ? (
          <div className="flex flex-col items-center text-center max-w-md">
            {/* Icon */}
            <TbSquareRoundedLetterYFilled className="text-white" size={60} />
            {/* Title */}
            <p className="text-2xl font-bold mt-12 sm:mt-[40px] text-gray-100">
              Welcome to YGPT Studypal
            </p>
            {/* Description */}
            <p className="text-gray-200 sm:px-0 px-3  mt-2 mb-6">
              Upload a File, and StudyPal will summarise, create tips, notes and
              quizes based on your file.
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
              accept=".pdf, .doc, .docx, .ppt, .pptx"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />

            {error && <div className="text-red-500 text-sm mt-4">{error}</div>}
          </div>
        ) : (
          <StudyChat />
        )}
      </main>
      {/* Footer for file input and submission */}
      <footer className="flex-center h-[100px] w-full">
        <div className="w-auto bg-neutral-700 px-2 py-3 flex-center h-[50px] rounded-full">
          <input
            type="file"
            accept=".pdf, .doc, .docx, .txt"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <RiAttachment2 size={25} className="text-white" />
          </label>

          {file && (
            <div className="ml-3 text-white text-sm">
              <p className="max-w-[200px] truncate ">
                File attached: {file.name}
              </p>
            </div>
          )}

          {/* <button
            disabled={loading} // Disable button while loading
            className={`ml-3 h-[40px] w-[40px] flex-center transition-all rounded-full ${
              !file || loading
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-white hover:bg-gray-200"
            }`}
          >
            <HiOutlineArrowSmUp size={25} />
          </button> */}
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
