import React from "react";
import SideBar from "../comp/SideBar";
import Main from "../comp/Main";
function Page() {
  return (
    <main className="flex bg-zinc-800 h-screen w-full ">
      <SideBar />
      <Main />
    </main>
  );
}

export default Page;
