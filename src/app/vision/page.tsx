import React from "react";
import SideBar from "../comp/SideBar";
import Main from "../comp/Main";
import Vision from "../comp/Vision";
function Page() {
  return (
    <main className="flex bg-zinc-800 h-screen w-full ">
      <SideBar />
      <Vision />
    </main>
  );
}

export default Page;
