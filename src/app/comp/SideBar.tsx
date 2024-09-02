import { Button } from "@/components/ui/button";
import { PiSidebarSimpleFill } from "react-icons/pi";
import { IoCreateOutline } from "react-icons/io5";
import { TbSquareRoundedLetterYFilled } from "react-icons/tb";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsLayoutSidebarInset } from "react-icons/bs";
import React from "react";
function SideBar() {
  return (
    <aside className="w-[250px] h-full px-4 bg-zinc-900 ">
      <header className="flex w-full items-center justify-between  py-2">
        <button className="h-[35px] w-[35px] rounded-md bg-none hover:bg-zinc-800 transition-all text-gray-300 flex items-center justify-center ">
          <BsLayoutSidebarInset size={20} className="" />
        </button>
        <button className="h-[35px] w-[35px] rounded-md bg-none hover:bg-zinc-800 transition-all text-gray-300 flex items-center justify-center ">
          <IoCreateOutline size={20} className="" />
        </button>
      </header>
      <main className="w-full flex-1 min-h-[75%] mt-4  ">
        <header className="rounded-md  ">
          <div className=" rounded-md cursor-pointer flex justify-between items-center py-2 px-2 bg-base hover:bg-zinc-800 transition-all group">
            <section className="flex items-center gap-2  ">
              <div className="h-[20px] w-[20px] flex items-center justify-center  rounded-full border ">
                <TbSquareRoundedLetterYFilled
                  size={15}
                  className="text-gray-300"
                />
              </div>
              <p className="text-base font-normal  ">YGPT</p>
            </section>
            <section></section>
          </div>
          <div className=" rounded-md cursor-pointer flex justify-start items-center py-2 px-2 bg-base hover:bg-zinc-800 transition-all group">
            <section className="flex items-center gap-2  ">
              <div className="h-[25px] w-[25px] flex items-center justify-center  rounded-full ">
                <AiOutlineAppstore size={20} className="text-gray-300" />
              </div>
              <p className="text-base font-normal  ">Explore YGPT</p>
            </section>
          </div>
        </header>
      </main>
    </aside>
  );
}

export default SideBar;
