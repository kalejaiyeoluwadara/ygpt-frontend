import React from "react";
import { TbSquareRoundedLetterYFilled } from "react-icons/tb";
function Empty() {
  return (
    <div className="h-full w-full flex-center flex-col gap-8  ">
      <div>
        <TbSquareRoundedLetterYFilled className="text-gray-200" size={70} />
      </div>
      <div className="flex gap-3">
        {[1, 2, 3, 4].map((d, id) => {
          return (
            <div className="h-[150px] w-40 pt-3 pb-4 flex flex-col px-3 gap-2 border border-zinc-700 rounded-2xl ">
              <TbSquareRoundedLetterYFilled size={30} />
              <p className="text-[14px] text-start ">
                Create an image for my presentation
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Empty;
