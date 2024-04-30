import React from "react";

const Inputfield = ({ label, type,onChange ,name,value}: { label: string; type: any ,onChange:any,name:string,value:any}) => {
  return (
    <div>
      <div>
        <label className=" font-normal">{label}</label>
        <input
        name={name}
        value={value}
          type={type}
          onChange={onChange}
          className="w-full mt-2 py-2 px-2 bg-slate-100 focus:outline-none rounded-lg focus-within:shadow "
        />
      </div>
    </div>
  );
};

export default Inputfield;
