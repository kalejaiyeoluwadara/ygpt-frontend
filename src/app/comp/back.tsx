"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { IoArrowBack } from "react-icons/io5";
function Back() {
  const router = useRouter();
  return (
    <div className="mb-6 fixed sm:top-14 top-12 flex items-center  ">
      <div
        onClick={() => router.back()}
        className="p-1 rounded-md hover:bg-stone-700 transition-all"
      >
        <IoArrowBack className="text-gray-200 cursor-pointer " size={25} />
      </div>
    </div>
  );
}

export default Back;
