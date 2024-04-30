"use client";
import React from "react";
import Logo from "../shared/Logo";
import { CiSearch } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiShoppingCart } from "react-icons/hi";

import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getUser, setUserDetails } from "@/redux/userSlice";
import axios from "axios";
import toast from "react-hot-toast";
interface UserData {
  _id: string;
  name: string;
  LastName: string;
  number: string;
  email: string;
  password: string;
  profileImage: string;
  createdAt: string; // Assuming createdAt and updatedAt are strings representing dates
  updatedAt: string;
  __v: number;
}
const Header = () => {
  const Auth: UserData | null | undefined = useAppSelector(getUser);
  console.warn("selectordata", Auth);
const Dispatch = useAppDispatch()
  const Logout = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/userLogout", {
        withCredentials: true,
      });
      if (response.data.success) {
        const success_message = response.data.message;
        toast.success(success_message);
        Dispatch(setUserDetails(null))
      } else {
        const error_message = response.data.message;
        toast.error(error_message);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error.message;
        toast.error(errorMessage);
      } else {
        console.warn("Error submitting data:", error);
        toast.error("An error occurred"); // Notify user about the error
      }
    }
  };

  return (
    <div className=" bg-white ">
      <div
        className={
          "  shadow-md h-16 flex  gap-5 md:gap-0 justify-between items-center mx-auto px-10 "
        }
      >
        <div className="">
          {/*   <Logo w={80} h={60} />  {Auth && <span>{(Auth as UserData).name}</span>} */}
          {Auth ? (
            <span>{(Auth as UserData).name}</span>
          ) : (
            <Logo w={80} h={60} />
          )}
        </div>
        {/* -Search Bar ------------------------------- */}
        <div className=" w-[40%] md:flex  hidden ">
          <div className="w-full border border-e-0  rounded-md bg-white flex items-center focus-within:shadow ">
            <input
              type="text"
              placeholder="Please Search here ..."
              className="w-full py-1 bg-transparent focus:outline-none px-5"
            />
          </div>
          <div>
            <span className="bg-red-400 h-9 rounded-e-md w-12 text-2xl  text-white  font-bold flex items-center justify-center">
              <CiSearch />
            </span>
          </div>
        </div>
        {/* -User login and Cart --------------------------------- */}
        <div className="flex items-center gap-7">
          <div>
            <span className="text-3xl cursor-pointer">
              <FaRegCircleUser />
            </span>
          </div>
          <div className="relative cursor-pointer">
            <span className="text-3xl ">
              <HiShoppingCart />
            </span>
            <p className=" absolute top-0 -right-3 bg-red-400 flex items-center justify-center text-white text-sm h-5 w-5 rounded-full">
              0{" "}
            </p>
          </div>
          <div>
            {Auth ? (
              <button onClick={Logout} className="bg-red-400 text-white px-4 py-1  font-semibold rounded-md hover:bg-black transition-all transform duration-500 ">
                Logout
              </button>
            ) : (
              <button className="bg-red-400 text-white px-4 py-1  font-semibold rounded-md hover:bg-black transition-all transform duration-500 ">
                <Link href={"/login"}>Login</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
