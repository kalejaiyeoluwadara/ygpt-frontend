"use client";
import React, { useEffect, useState } from "react";
import SideBar from "@/app/comp/SideBar";
import StudyPal from "@/app/comp/StudyPal";
import { useGlobal } from "@/app/context";
import Nav from "@/app/comp/MainNav";
import ReactMarkdown from "react-markdown";
import { IoCopyOutline } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { useRouter } from "next/navigation";
import Back from "@/app/comp/back";
import Copy from "@/app/comp/Copy";
import Text from "@/app/comp/Text";
function Summarise() {
  const { side, setAside, file } = useGlobal();
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSummary = async () => {
      if (!file) {
        setSummary("No file uploaded yet.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://gemini-api-46ez.onrender.com/studypal/summarise",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to summarize file: ${response.statusText}`);
        }

        const data = await response.json();
        setSummary(data.geminiResponse || "No summary available.");
      } catch (error: any) {
        console.error("Error fetching summary:", error);
        setError(error.message || "Error summarizing file.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <main className="flex bg-zinc-800 h-screen overflow-y-hidden w-full">
      <SideBar />
      <main className="flex flex-col w-full flex-1 h-screen items-start">
        <Nav side={side} setAside={setAside} />
        {/* Main content */}
        <Text error={error} loading={loading} text={summary} />
      </main>
    </main>
  );
}

export default Summarise;
