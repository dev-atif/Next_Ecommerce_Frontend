'use client'
import React from 'react'
import { accessoriesCategories } from './Add_Products'
import { TbCategory } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
const Category_Tabs = () => {
  return (
    <div>
        <div className='text-center'>
            <h1 className='text-2xl flex items-center justify-center pb-4 tracking-widest font-semibold'>All Categories <span><TbCategory className='text-red-400' size={40} /></span></h1>
        </div>
        <div className="flex overflow-x-auto whitespace-nowrap  scrollbar">
      {accessoriesCategories.map((category, index) => (
        <div
          key={index}
          className="px-4 py-2 border md:text-base text-sm text-white text-center rounded-lg bg-red-400 mr-2 cursor-pointer flex-shrink-0  md:w-[25%] lg:w-[19%] xl:w-[13%] hover:scale-105 transition-all transform"
        >
          {category}
        </div>
      ))}
    </div>
   
    </div>
  )
}

export default Category_Tabs
