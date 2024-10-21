"use client";
import React, { useEffect, useState } from "react";
import SideBar from "@/app/comp/SideBar";
import { useGlobal } from "@/app/context";
import Nav from "@/app/comp/MainNav";
import { useRouter } from "next/navigation";
import Text from "@/app/comp/Text";
function Summarise() {
  const { side, setAside, file } = useGlobal();
  const [note, setNote] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      if (!file) {
        setNote("No file uploaded yet.");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://gemini-api-46ez.onrender.com/studypal/note",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to generate notes from file: ${response.statusText}`
          );
        }

        const data = await response.json();
        setNote(data || "No notes available.");
      } catch (error: any) {
        console.error("Error fetching note:", error);
        setError(error.message || "Error generating notes from file.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <main className="flex bg-zinc-800 h-screen overflow-y-hidden w-full">
      <SideBar />
      <main className="flex flex-col w-full flex-1 h-screen items-start">
        <Nav side={side} setAside={setAside} />
        <Text error={error} loading={loading} text={note} />
      </main>
    </main>
  );
}

export default Summarise;
