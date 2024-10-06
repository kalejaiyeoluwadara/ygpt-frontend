import React from "react";
import book from "@/app/assets/book.webp";
import Image from "next/image";
import { BiBulb } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";
import Link from "next/link";

function StudyChat() {
  const prompts = [
    {
      text: "Create tips",
      link: "/studypal/tips",
      icon: BiBulb,
      color: "text-red-400",
    },
    {
      text: "Summarise",
      link: "/studypal/summary",
      icon: BsBook,
      color: "text-green-400",
    },
    {
      text: "Short note",
      link: "/studypal/note",
      icon: FaPen,
      color: "text-yellow-400",
    },
    {
      text: "Generate quiz",
      link: "/studypal/quiz",
      icon: MdOutlineQuiz,
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
            <Link
              href={prompt.link}
              key={id}
              className="h-auto py-4 hover:bg-zinc-700 transition-all cursor-pointer w-40   flex flex-col items-center justify-center px-3 gap-2 border border-zinc-700 rounded-2xl"
            >
              <IconComponent className={prompt.color} size={20} />
              <p className="text-[14px] text-start">{prompt.text}</p>
            </Link>
          );
        })}
      </section>
    </main>
  );
}

export default StudyChat;
