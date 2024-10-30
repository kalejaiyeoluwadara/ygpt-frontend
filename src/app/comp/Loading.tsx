// Loading.js
import React from "react";
import { ClipLoader } from "react-spinners";
interface P {
  loading: true;
}
const Loading = ({ loading }: P) => {
  return (
    <div className="h-full w-full flex items-center justify-center ">
      <ClipLoader color="#e5e7eb " loading={loading} size={40} />
    </div>
  );
};

export default Loading;
