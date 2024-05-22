import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-full"> 
      <InfinitySpin width="300" color="#F87171" />
    </div>
  );
};

export default Loader;
