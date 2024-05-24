"use client";
import Add_Products from "@/app/components/Add_Products";
import Edit_Product from "@/app/components/Edit_Product";
import { Products } from "@/app/components/Interfaces";
import ProductsTables from "@/app/components/ProductsTables";
import { useAppSelector } from "@/hooks/redux";
import { geteditProduct } from "@/redux/EditProductSlice";
import React, { useState } from "react";

const page = () => {
  const [activeTab, setActiveTab] = useState("tab1");
  const {products} = useAppSelector((s)=>s.products);
  console.warn(products)
  const Tab_ALL_Products =()=>{
    setActiveTab("tab1")
  }
  const Tab_Add_Products =()=>{
    setActiveTab("tab2")
  }
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
            onChange={Tab_ALL_Products}
          />

          <div
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-box p-6 overflow-x-auto ${
              activeTab === "tab1" ? "" : "hidden"
            }`}
          >
            <div className="bg-white ">
              <ProductsTables  Tabshift={Tab_Add_Products}/>
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            id="tab2"
            role="tab"
            className={`tab  font-medium md:text-xl  text-xs 
            ${(products as Products |null)?.isEdit ? "lg:after:w-40 md:after:w-40 after:w-32":"after:w-32  md:after:w-40 xl:after:w-[9rem] lg:after:w-40"} 
            ${
              activeTab === "tab2" ? "text-red-400" : ""
            }`}
            aria-label={(products as Products | null)?.isEdit ? "Update Product":"Add Products"}
            checked={activeTab === "tab2"}
            onChange={Tab_Add_Products}
          />

          <div
            role="tabpanel"
            className={`tab-content bg-base-100 border-base-300 rounded-box p-6  ${
              activeTab === "tab2" ? "" : "hidden"
            }`}
          >
           {/*  <Add_Products/> */} {/* <Edit_Product/> */}
           {(products as Products | null)?.isEdit ? <Edit_Product Tabshift={Tab_ALL_Products} /> : <Add_Products Tabshift={Tab_ALL_Products}/>}

          </div>
        </div>
      </div>
    </>
  );
};

export default page;
