"use client";
import React, { useEffect, useState } from "react";
import SideBar from "@/app/comp/SideBar";
import StudyPal from "@/app/comp/StudyPal";
import { useGlobal } from "@/app/context";
import Nav from "@/app/comp/MainNav";

function Summarise() {
  const { side, setAside, file } = useGlobal();
  const [summary, setSummary] = useState<string>("");

  useEffect(() => {
    const fetchSummary = async () => {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await fetch("http://localhost:5000/summary", {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Failed to summarize file");
          }

          const data = await response.json();
          setSummary(data.summary); // Assuming backend returns { summary: "..." }
        } catch (error) {
          console.error("Error fetching summary:", error);
          setSummary("Error summarizing file.");
        }
      }
    };

    fetchSummary();
  }, [file]);

  return (
    <main className="flex bg-zinc-800 h-screen overflow-y-hidden w-full ">
      <SideBar />
      <main className="flex flex-col w-full flex-1 h-screen  items-start ">
        <Nav side={side} setAside={setAside} />
        <main className="flex w-full sm:h-[80%] flex-1 items-start overflow-x-hidden justify-start sm:mt-0 mt-8 p-2 sm:p-4 sm:px-6">
          <p className="h-[90%] overflow-y-auto w-full ">
            {/* Display the summary or a loading message */}
            {summary ? summary : "Loading summary..."}
          </p>
        </main>
      </main>
    </main>
  );
}

export default Summarise;
