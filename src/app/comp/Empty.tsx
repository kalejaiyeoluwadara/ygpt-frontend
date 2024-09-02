import React from "react";
import { MdHelp } from "react-icons/md";
import { FiCheckCircle } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { FaQuestionCircle } from "react-icons/fa";
import { TbSquareRoundedLetterYFilled } from "react-icons/tb";
interface Iprops {
  empty: boolean;
  setRemoveEmpty: React.Dispatch<React.SetStateAction<boolean>>;
}
function Empty({ empty, setRemoveEmpty }: Iprops) {
  const prompts = [
    {
      text: "Kini o le ṣe fun ọ loni?",
      icon: MdHelp,
      color: "text-red-400",
    },
    {
      text: "Bawo ni mo ṣe le ran ọ lọwọ?",
      icon: FiCheckCircle,
      color: "text-green-400",
    },
    {
      text: "Kini ọrọ ti o fẹran lati jiroro?",
      icon: AiOutlineMessage,
      color: "text-yellow-400",
    },
    {
      text: "Ṣe o ni ibeere eyikeyi nipa ọrọ kan?",
      icon: FaQuestionCircle,
      color: "text-purple-400",
    },
  ];

  const handleClick = () => {
    setRemoveEmpty(!empty);
  };

  return (
    <div className="h-full w-full flex-center flex-col gap-8">
      <div>
        <TbSquareRoundedLetterYFilled className="text-gray-200" size={70} />
      </div>
      <div className="flex gap-4">
        {prompts.map((prompt, id) => {
          const IconComponent = prompt.icon;
          return (
            <button
              onClick={handleClick}
              key={id}
              className="h-[150px] hover:bg-zinc-700 transition-all cursor-pointer w-40 pt-3 pb-4 flex flex-col px-3 gap-2 border border-zinc-700 rounded-2xl"
            >
              <IconComponent className={prompt.color} size={20} />
              <p className="text-[14px] text-start">{prompt.text}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Empty;
