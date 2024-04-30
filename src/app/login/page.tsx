"use client";
import React, { useState } from "react";
import Authlayout from "../layout";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { CustomUser } from "@/hooks/useCustomUser";

import { setUserDetails } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import Inputfield from "../components/shared/Inputfield";
import PaswordInput from "../components/shared/PaswordInput";
import { useAppDispatch } from "@/hooks/redux";
const page = () => {
  const [userdata, setData] = useState({
    email: "",
    password: "",
  });
  //Dispatch or store in to redux Store
  const Dispatch = useAppDispatch();
  //Custom Hook to get data from Api
  const { fetchData } = CustomUser();
  //Use Route to Navigate to login
  const route = useRouter()
  
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const Handle_Login = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/sign-in",
        userdata,
        { withCredentials: true }
      );
      if (response.data.success) {
        const success_message = response.data.message;
        toast.success(success_message);
        fetchData().then((data) => {
          Dispatch(setUserDetails(data));
        });
        route.push('/')
      } else {
        const error_message = response.data.message;
        toast.error(error_message);
      }
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        console.warn("Error submitting data:", error);
        toast.error("An error occurred"); // Notify user about the error
      }
    }
  };
  return (
    <div>
      <div className=" flex  justify-center items-center h-screen ">
        <div className="bg-white py-10 h-screen md:h-auto md:px-20  p-6 md:rounded-lg shadow flex-1 max-w-2xl">
          <div className="flex items-center justify-center gap-3">
            <span className="text-red-400">
              <FaRegUserCircle size={80} />
            </span>
            <span className="text-4xl font-semibold">Login Now </span>
          </div>
          <div className="my-10">
            <div className="  mt-5">
              <Inputfield
                name={"email"}
                value={userdata.email}
                label="Enter Your Email"
                type={"email"}
                onChange={handleChange}
              />
            </div>
            <div className="  mt-5">
              <label className=" font-normal">Enter Your Password</label>
              <PaswordInput
                name={"password"}
                value={userdata.password}
                onChange={handleChange}
              />
            </div>
            <div className="mt-5 text-end">
              <span className=" hover:text-red-400 cursor-pointer font-normal">
                Forget Password ?
              </span>
            </div>
            <div className="w-full my-10 text-center">
              <button
                type="submit"
                onClick={Handle_Login}
                className="bg-red-400 hover:bg-black transition-all transform duration-500 py-2 rounded-md w-1/2 font-medium text-white  text-lg"
              >
                Login Now{" "}
              </button>
            </div>
            <div className="mt-3 flex  items-center gap-2 text-lg ">
              <span>Don't have an account ?</span>
              <Link
                href={"/register"}
                className=" text-red-400 cursor-pointer font-normal"
              >
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;