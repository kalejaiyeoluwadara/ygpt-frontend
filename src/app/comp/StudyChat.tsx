import React from "react";
import book from "@/app/assets/book.webp";
import Image from "next/image";
import { BiBulb } from "react-icons/bi"; // Suggests ideas or tips
import { BsBook } from "react-icons/bs"; // Suitable for summarizing content
import { FaPen } from "react-icons/fa"; // Represents note-taking
import { MdOutlineQuiz } from "react-icons/md"; // Represents quiz generation

function StudyChat() {
  const prompts = [
    {
      text: "Create tips",
      icon: BiBulb, // Light bulb for creating tips
      color: "text-red-400",
    },
    {
      text: "Summarise",
      icon: BsBook, // Book icon for summarization
      color: "text-green-400",
    },
    {
      text: "Short note",
      icon: FaPen, // Pen icon for note-taking
      color: "text-yellow-400",
    },
    {
      text: "Generate quiz",
      icon: MdOutlineQuiz, // Quiz icon for generating quizzes
      color: "text-purple-400",
    },
  ];

  return (
    <main className="w-full flex flex-col items-center justify-center ">
      <Image src={book} alt="book" height={500} width={200} className="" />
      <section className="grid sm:grid-cols-4 grid-cols-2 gap-3 sm:gap-6 mt-12">
        {prompts.map((prompt, id) => {
          const IconComponent = prompt.icon;
          return (
            <button
              key={id}
              className="h-auto py-4 hover:bg-zinc-700 transition-all cursor-pointer w-40   flex flex-col items-center justify-center px-3 gap-2 border border-zinc-700 rounded-2xl"
            >
              <IconComponent className={prompt.color} size={20} />
              <p className="text-[14px] text-start">{prompt.text}</p>
            </button>
          );
        })}
      </section>
    </main>
  );
}

export default StudyChat;
