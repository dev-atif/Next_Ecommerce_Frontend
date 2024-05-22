"use client";
import Add_Products from "@/app/components/Add_Products";
import ProductsTables from "@/app/components/ProductsTables";
import React, { useState } from "react";

const page = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  return (
    <>
      <div className="my-10">
        <div role="tablist" className="tabs tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
            id="tab1"
            role="tab"
            className={`tab font-medium md:text-xl text-xs after:w-32 md:after:w-40 xl:after:w-[8rem] lg:after:w-40 ${
              activeTab === "tab1" ? "text-red-400" : ""
            }`}
            aria-label="All Products"
            checked={activeTab === "tab1"}
            onChange={() => setActiveTab("tab1")}
          />

          <div
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-x-auto ${
              activeTab === "tab1" ? "" : "hidden"
            }`}
          >
            <div className="bg-white ">
              <ProductsTables />
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            id="tab2"
            role="tab"
            className={`tab  font-medium md:text-xl after:w-32  md:after:w-40 text-xs xl:after:w-[9rem] lg:after:w-40 ${
              activeTab === "tab2" ? "text-red-400" : ""
            }`}
            aria-label="Add Products"
            checked={activeTab === "tab2"}
            onChange={() => setActiveTab("tab2")}
          />

          <div
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-box p-6  ${
              activeTab === "tab2" ? "" : "hidden"
            }`}
          >
            <Add_Products/>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
