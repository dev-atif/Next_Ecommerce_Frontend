import React from "react";

const FooterBar = () => {
  return (
    <div>
      <div className="bg-red-400 text-white text-center h-14 flex  items-center justify-center ">
        <p className="text-lg font-semibold">@{new Date().getFullYear()} All rights reserved.</p>
      </div>
    </div>
  );
};

export default FooterBar;
