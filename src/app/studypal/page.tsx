import React from "react";
import SideBar from "../comp/SideBar";
import Main from "../comp/Main";
import Vision from "../comp/Vision";
import StudyPal from "../comp/StudyPal";
function Page() {
  return (
    <main className="flex bg-zinc-800 h-full w-full ">
      <SideBar />
      <StudyPal />
    </main>
  );
}

export default Page;
