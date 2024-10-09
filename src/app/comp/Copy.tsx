import React from "react";
import { IoCopyOutline } from "react-icons/io5";
import { SlLike } from "react-icons/sl";
type Props = {
  summary: string;
};
function Copy({ summary }: Props) {
  return (
    <>
      {summary && (
        <section className="flex  rounded-md text-gray-200  absolute bottom-4">
          <div className="p-2 cursor-pointer rounded-md hover:bg-zinc-700 transition-all flex-center">
            <IoCopyOutline size={15} />
          </div>
          <div className="p-2 cursor-pointer rounded-md hover:bg-zinc-700 transition-all flex-center">
            <SlLike size={15} />
          </div>
        </section>
      )}
    </>
  );
}

export default Copy;
