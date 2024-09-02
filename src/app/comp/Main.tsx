"use client";
import React, { useState } from "react";
import { RxUpload } from "react-icons/rx";
import Empty from "./Empty";
import { TbSquareRoundedLetterYFilled } from "react-icons/tb";
import { HiOutlineArrowSmUp } from "react-icons/hi";
import Chat from "./Chat";
function Main() {
  const [empty, setRemoveEmpty] = useState(true);
  const [prompt, setPrompt] = useState("");
  return (
    <main className="flex flex-col w-full flex-1 h-full items-start ">
      <nav className="flex w-full justify-between py-4 items-center px-4 ">
        <div>
          <p className="font-semibold text-lg ">YGPT</p>
        </div>
        <div className="flex gap-2  ">
          <div className="h-[40px] w-[40px] rounded-md bg-none hover:bg-gray-600 flex-center ">
            <RxUpload className="text-gray-200" size={25} />
          </div>
          <div className="flex-center h-[40px] w-[40px] rounded-full bg-orange-500 "></div>
        </div>
      </nav>
      <main className="flex w-full h-full flex-1  items-center justify-center">
        {empty ? (
          <Empty empty={empty} setRemoveEmpty={setRemoveEmpty} />
        ) : (
          <Chat />
        )}
      </main>
      <footer className="flex-center h-[100px]  w-full   ">
        <div className="w-[80%] bg-neutral-700 px-2 flex-center h-[50px] rounded-full ">
          <input
            type="text"
            className="bg-neutral-700 px-4 text-white border-none flex-1  outline-none  "
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={() => {
              setRemoveEmpty(false);
            }}
            className={`h-[30px] w-[30px] flex-center  transition-all rounded-full  ${
              prompt.length === 0 ? "bg-gray-200" : "bg-white hover:bg-gray-200"
            }  `}
          >
            <HiOutlineArrowSmUp size={25} />
          </button>
        </div>
      </footer>
    </main>
  );
}

export default Main;
