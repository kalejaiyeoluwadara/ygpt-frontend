import React from "react";
import { IoCopyOutline } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
function Chat() {
  return (
    <div className="h-full w-full flex items-start overflow-y-auto flex-col gap-8 p-4">
      {/* Human message */}
      <div className="bg-zinc-700 text-white p-3 rounded-lg self-end">
        Hi, can you help me with my code?
      </div>

      {/* AI response */}
      <div className=" group p-3 rounded-xl self-start">
        <section className="flex gap-2 items-center justify-center">
          <div className="h-[30px] w-[30px] border border-gray-300 rounded-full "></div>
          <p>Sure! What do you need help with?</p>
        </section>
        <section className="w-[80px] text-gray-200 p-2 items-center justify-start translate-x-[45px] rounded-[10px] border hidden group-hover:flex border-zinc-700 h-[37px] ">
          <div className="p-2 rounded-md hover:bg-zinc-700 transition-all flex-center  ">
            <IoCopyOutline size={15} />
          </div>
          <div className="p-2 rounded-md hover:bg-zinc-700 transition-all flex-center  ">
            <SlLike size={15} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Chat;
