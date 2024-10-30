import React, { useState } from "react";
import { IoCopyOutline, IoCheckmark } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
import { BiSolidLike } from "react-icons/bi";
type Props = {
  summary: string;
};

function Copy({ summary }: Props) {
  const [isCopied, setIsCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <>
      {summary && (
        <section className="flex rounded-md text-gray-200 absolute bottom-4">
          <div className="p-2 cursor-pointer rounded-md hover:bg-zinc-700 transition-all flex-center">
            {isCopied ? (
              <IoCheckmark size={15} />
            ) : (
              <IoCopyOutline size={15} onClick={handleCopy} />
            )}
          </div>
          <div className="p-2 cursor-pointer rounded-md hover:bg-zinc-700 transition-all flex-center">
            {isLiked ? (
              <BiSolidLike size={15} />
            ) : (
              <SlLike size={15} onClick={handleLike} />
            )}
          </div>
        </section>
      )}
    </>
  );
}

export default Copy;
