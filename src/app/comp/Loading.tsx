// Loading.js
import React from "react";
import { ClipLoader } from "react-spinners";
interface P {
  loading: true;
}
const Loading = ({ loading }: P) => {
  return (
    <div className="h-full w-full center">
      <ClipLoader color="#ED2224" loading={loading} size={40} />
    </div>
  );
};

export default Loading;
