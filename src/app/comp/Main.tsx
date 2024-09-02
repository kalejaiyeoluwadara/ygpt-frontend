import React from "react";
import { RxUpload } from "react-icons/rx";
import Empty from "./Empty";
function Main() {
  return (
    <main className="flex flex-col w-full flex-1 h-full items-start ">
      <nav className="flex w-full justify-between py-4 items-center px-4 ">
        <div>
          <p className="font-semibold text-lg ">YGPT</p>
        </div>
        <div className="flex gap-2  ">
          <div className="h-[40px] w-[40px] rounded-md bg-none hover:bg-gray-600 flex-center ">
            <RxUpload className="text-gray-200" size={25} />
          </div>
          <div className="flex-center h-[40px] w-[40px] rounded-full bg-orange-500 "></div>
        </div>
      </nav>
      <main className="flex w-full h-full  items-center justify-center">
        {true ? <Empty /> : <div></div>}
      </main>
    </main>
  );
}

export default Main;
