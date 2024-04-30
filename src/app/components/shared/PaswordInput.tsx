"use client";
import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

const PaswordInput = ({onChange,name,value}:{onChange:any,name:string,value:any}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
      name={name}
      value={value}
        type={show? "text":'password'}
        onChange={onChange}
        className="w-full mt-2 py-2 px-2 pe-20 bg-slate-100 focus:outline-none rounded-lg focus-within:shadow "
      />
      <div className="text-red-400 absolute top-3 right-3 cursor-pointer " onClick={()=>setShow(prev=>!prev)}>
        {show ? <FaEyeSlash size={30} /> : <FaEye size={30} />}
      </div>
    </div>
  );
};

export default PaswordInput;
