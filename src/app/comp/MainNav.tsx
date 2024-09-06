"use client";
import React, { useState } from "react";
import { RxUpload } from "react-icons/rx";
import { BsStar, BsStars } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { PiPlanetThin } from "react-icons/pi";
import Link from "next/link";
function Nav() {
  const [modal, setModal] = useState(false);
  return (
    <nav className="flex w-full justify-between py-4 items-center px-4">
      <div
        onClick={() => setModal(!modal)}
        className={`flex text-gray-200 relative hover:bg-neutral-700 ${
          modal ? "bg-neutral-700" : "bg-none"
        } rounded-md  px-3 cursor-pointer py-1 items-center gap-2`}
      >
        <p className="font-semibold text-lg">YGPT</p>
        <IoIosArrowDown size={15} />
        {/* Modal */}
        {modal && (
          <div className=" absolute flex flex-col border border-gray-500 left-[-2px] bottom-[-9.9rem] h-auto w-[330px] rounded-[15px] bg-neutral-700 py-4 px-4 ">
            {/* Prompt */}
            <Link
              href={"/"}
              className="w-full flex justify-between items-center h-[60px] px-2 hover:bg-stone-600 rounded-md "
            >
              <div className="flex gap-2 items-center justify-start ">
                <div className="h-[30px] w-[30px] bg-stone-600 rounded-full flex-center ">
                  <BsStars size={15} className="" />
                </div>
                <div>
                  <p className="text-[16px] leading-[0.9]">YGPT Prompt</p>
                  <p className="text-[11px] ">Smart yoruba model & more</p>
                </div>
              </div>
              <div></div>
            </Link>
            {/* vision */}
            <Link
              href={"/vision"}
              className="w-full flex justify-between items-center h-[60px] px-2 hover:bg-stone-600 rounded-md "
            >
              <div className="flex gap-2 items-center justify-start ">
                <div className="h-[30px] w-[30px] bg-stone-600 rounded-full flex-center ">
                  <PiPlanetThin size={15} className="" />
                </div>
                <div>
                  <p className="text-[16px] leading-[0.9]">YGPT Vision</p>
                  <p className="text-[11px] ">Identify name of image content</p>
                </div>
              </div>
              <div></div>
            </Link>
          </div>
        )}
      </div>
      <div className="flex gap-2 ">
        <div className="h-[40px] w-[40px] rounded-md bg-none hover:bg-gray-600 flex-center">
          <RxUpload className="text-gray-200" size={25} />
        </div>
        <div className="flex-center h-[40px] w-[40px] rounded-full bg-orange-500"></div>
      </div>
    </nav>
  );
}

export default Nav;
