"use client";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import SideBar from "./comp/SideBar";
import Main from "./comp/Main";
import MobileSide from "@/app/comp/mobileSide";
function Page() {
  const [aside, setAside] = useState(false);
  return (
    <main className="flex bg-zinc-800 h-screen w-full ">
      <SideBar />
      <Main side={aside} setAside={setAside} />
      <MobileSide side={aside} setAside={setAside} />
    </main>
  );
}

export default Page;
