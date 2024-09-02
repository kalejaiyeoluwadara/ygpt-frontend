import React from "react";
import { RxUpload } from "react-icons/rx";
import Empty from "./Empty";
import { TbSquareRoundedLetterYFilled } from "react-icons/tb";
import { HiOutlineArrowSmUp } from "react-icons/hi";
function Main() {
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
        {true ? <Empty /> : <div></div>}
      </main>
      <footer className="flex-center h-[100px]  w-full   ">
        <div className="w-[80%] bg-neutral-700 px-2 flex-center h-[50px] rounded-full ">
          <input
            type="text"
            className="bg-neutral-700 px-4 text-white border-none flex-1  outline-none  "
            name=""
            id=""
          />
          <button className="h-[30px] w-[30px] bg-gray-200 rounded-full   ">
            <HiOutlineArrowSmUp size={30} />
          </button>
        </div>
      </footer>
    </main>
  );
}

export default Main;
