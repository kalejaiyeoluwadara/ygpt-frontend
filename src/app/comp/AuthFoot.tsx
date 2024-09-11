import React from "react";

function AuthFoot() {
  return (
    <div className="absolute w-full bottom-0 left-0 py-4 flex items-center justify-center ">
      <section className="flex cursor-pointer text-xs gap-2">
        <p className="text-[#10a37f]">Terms of Use</p>
        <p className="text-[#10a37f] h-[15px] border-l-2 border-gray-600 pl-3 ">
          Privacy Policy
        </p>
      </section>
    </div>
  );
}

export default AuthFoot;
