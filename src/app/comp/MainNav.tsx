"use client";
import React, { useState, useEffect } from "react";
import { RxUpload } from "react-icons/rx";
import { BsStar, BsStars } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { PiPlanetThin } from "react-icons/pi";
import { BsLayoutSidebarInset } from "react-icons/bs";
import Link from "next/link";
import { TbLogout } from "react-icons/tb";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useGlobal } from "../context";
import { FaBook } from "react-icons/fa6";
type SideBarProps = {
  side: boolean;
  setAside: React.Dispatch<React.SetStateAction<boolean>>;
};
function Nav({ side, setAside }: SideBarProps) {
  const [modal, setModal] = useState(false);
  const [log, setLog] = useState(false);
  const [emailInitials, setEmailInitials] = useState("");
  const router = useRouter();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/api/me");
        const email = response.data.data.email;
        setEmailInitials(email.slice(0, 2).toUpperCase());
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchData();
  }, []);
  const handleLogOut = async () => {
    try {
      const response = await axios.get("/api/logout");

      if (response.data.success) {
        toast.success("Logout successful");
        router.push("/login");
        // Optionally, redirect or clear client-side data here
      } else {
        toast.error("Failed to log out");
        setLog(false);
      }
    } catch (error) {
      toast.error("Error logging out");
      console.error("Error logging out", error);
    }
  };
  const { hide, setHide } = useGlobal();
  return (
    <nav className="flex w-full justify-between py-4 items-center px-4">
      <Toaster />
      <section className="flex items-center ">
        <BsLayoutSidebarInset
          size={25}
          onClick={() => setAside(!side)}
          className="text-gray-200 block sm:hidden mr-2 sm:mr-3"
        />
        {hide && (
          <BsLayoutSidebarInset
            size={20}
            onClick={() => setHide(!hide)}
            className="text-gray-200 sm:block hidden cursor-pointer mr-1 sm:mr-3"
          />
        )}
        <div
          onClick={() => setModal(!modal)}
          className={`flex text-gray-200 relative hover:bg-neutral-700 ${
            modal ? "bg-neutral-700" : "bg-none"
          } rounded-md px-3 cursor-pointer py-1 items-center gap-2`}
        >
          <p className="font-semibold text-lg">YGPT</p>
          <IoIosArrowDown className=" animate-bounce " size={15} />
          {/* Modal */}
          {modal && (
            <div className="absolute flex z-50 flex-col border border-gray-500 left-[-2px] bottom-[-14rem] h-auto w-[330px] rounded-[15px] bg-neutral-700 py-4 px-4">
              {/* Prompt */}
              <Link
                href={"/"}
                className="w-full flex justify-between items-center h-[60px] px-2 hover:bg-stone-600 rounded-md"
              >
                <div className="flex gap-2 items-center justify-start">
                  <div className="h-[30px] w-[30px] bg-stone-600 rounded-full flex-center">
                    <BsStars size={15} className="" />
                  </div>
                  <div>
                    <p className="text-[16px] leading-[0.9]">YGPT Prompt</p>
                    <p className="text-[11px]">Smart yoruba model & more</p>
                  </div>
                </div>
                <div></div>
              </Link>
              {/* Vision */}
              <Link
                href={"/vision"}
                className="w-full flex justify-between items-center h-[60px] px-2 hover:bg-stone-600 rounded-md"
              >
                <div className="flex gap-2 items-center justify-start">
                  <div className="h-[30px] w-[30px] bg-stone-600 rounded-full flex-center">
                    <PiPlanetThin size={15} className="" />
                  </div>
                  <div>
                    <p className="text-[16px] leading-[0.9]">YGPT Vision</p>
                    <p className="text-[11px]">
                      Identify name of image content
                    </p>
                  </div>
                </div>
                <div></div>
              </Link>
              {/* Study Pal */}
              <Link
                href={"/studypal"}
                className="w-full flex justify-between items-center h-[60px] px-2 hover:bg-stone-600 rounded-md"
              >
                <div className="flex gap-2 items-center justify-start">
                  <div className="h-[30px] w-[30px] bg-stone-600 rounded-full flex-center">
                    <FaBook size={15} className="" />
                  </div>
                  <div>
                    <p className="text-[16px] leading-[0.9]">YGPT StudyPal</p>
                    <p className="text-[11px]">Study with YGPT</p>
                  </div>
                </div>
                <div></div>
              </Link>
            </div>
          )}
        </div>
      </section>
      <div className="flex gap-2">
        <div className="h-[40px] hidden w-[40px] rounded-md bg-none hover:bg-gray-600 sm:flex-center">
          <RxUpload className="text-gray-200" size={25} />
        </div>
        {emailInitials ? (
          <section className="relative">
            <div
              onClick={() => setLog(!log)}
              className="flex-center text-white cursor-pointer h-[40px] w-[40px] rounded-full flex-shrink-0 bg-orange-500"
            >
              {emailInitials}
            </div>
            {log && (
              <div className="bg-stone-700 hover:bg-neutral-700 transition-all w-[200px] absolute right-0 top-12 rounded-[8px] px-3 py-3 ">
                <button
                  onClick={handleLogOut}
                  className="w-full flex items-center justify-between text-start text-gray-200"
                >
                  Logout <TbLogout size={20} className="ml-2" />
                </button>
              </div>
            )}
          </section>
        ) : (
          <section className="text-gray-200 flex items-center gap-3">
            <Link
              className=" bg-white rounded-full text-black px-3 font-semibold py-[6px] text-sm"
              href={"/login"}
            >
              Log in
            </Link>
            <Link
              className="hover:text-white font-semibold text-sm"
              href={"/signup"}
            >
              Create account
            </Link>
          </section>
        )}
      </div>
    </nav>
  );
}

export default Nav;
