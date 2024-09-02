import React from "react";

function Chat() {
  return (
    <div className="h-full w-full flex items-start overflow-y-auto flex-col gap-8 p-4">
      {/* Human message */}
      <div className="bg-zinc-700 text-white p-3 rounded-lg self-end">
        Hi, can you help me with my code?
      </div>

      {/* AI response */}
      <div className=" text-gray-200 p-3 rounded-xl self-start">
        Sure! What do you need help with?
      </div>
    </div>
  );
}

export default Chat;
