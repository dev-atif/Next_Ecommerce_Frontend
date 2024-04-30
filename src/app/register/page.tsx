"use client";
import Inputfield from "@/app/components/shared/Inputfield";
import PaswordInput from "@/app/components/shared/PaswordInput";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { PiUserCircleLight } from "react-icons/pi";
const page = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [getvalues, setValues] = useState({
    name: "",
    LastName: "",
    number: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    profileImage: "",
  });

  const handleChangeValues = (e: any) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.warn("fetxh data", getvalues);

  const imageChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setValues((prev) => ({
            ...prev,
            profileImage: reader.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const submitData = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/signup",
        getvalues
      );
      if (response.data.success) {
        const message = response.data.message;
         //Move to signin page
         router.push("/login");
        toast.success(message); // Display the success message to the user
       
      } else {
        const errorMessage = response.data.message;
        toast.error(errorMessage); // Display the error message to the user
      }
    } catch (error: any) {
      // Handle errors
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage); // Display the error message to the user
      } else {
        console.error("Error submitting data:", error);
        toast.error("An error occurred"); // Notify user about the error
      }
    }
  };
  return (
    <div>
      <div>
        <div className=" flex   justify-center items-center  ">
          <div className="bg-white py-10 md:my-10  md:px-20  p-6 md:rounded-lg shadow flex-1 max-w-2xl">
            <div className="flex items-center justify-center gap-3">
              <span className="text-4xl font-semibold">Register YourSelf </span>
            </div>
            <div className="mt-10">
              <form>
                <div>
                  {/* ---------Profile */}
                  <div className=" flex flex-col justify-center items-center gap-1 ">
                    {getvalues.profileImage ? (
                      <img
                        src={getvalues.profileImage}
                        alt="Profile"
                        className=" w-32 h-32 rounded-full object-cover"
                      />
                    ) : (
                      <>
                        <span className=" text-red-400">
                          <PiUserCircleLight size={150} />
                        </span>
                      </>
                    )}
                    <span
                      onClick={() => imageRef.current?.click()}
                      className=" cursor-pointer bg-white rounded-full  text-sm  font-medium border border-red-400 text-red-400 px-5 py-1 "
                    >
                      Upload Image
                    </span>
                  </div>
                </div>
                {/* ----------Full name  */}
                <div className="md:grid grid-cols-2 gap-6 mt-10">
                  <div>
                    <Inputfield
                      type={"text"}
                      name="name"
                      value={getvalues.name}
                      label="First Name "
                      onChange={handleChangeValues}
                    />
                  </div>
                  <div className="my-5 md:my-0">
                    <Inputfield
                      type={"text"}
                      name="LastName"
                      value={getvalues.LastName}
                      label="Last Name "
                      onChange={handleChangeValues}
                    />
                  </div>
                  <div>
                    <Inputfield
                      type={"text"}
                      name="number"
                      value={getvalues.number}
                      label="Enter Your Number "
                      onChange={handleChangeValues}
                    />
                  </div>
                  <div className="my-5 md:my-0">
                    <Inputfield
                      type={"email"}
                      name="email"
                      value={getvalues.email}
                      label="Enter Your email "
                      onChange={handleChangeValues}
                    />
                  </div>
                  <div>
                    <label className="font-normal">Enter Your Password</label>
                    <PaswordInput
                      name={"password"}
                      value={getvalues.password}
                      onChange={handleChangeValues}
                    />
                  </div>
                  <div className="my-5 md:my-0">
                    <label className="font-normal">Confirm Your Password</label>
                    <PaswordInput
                      name={"ConfirmPassword"}
                      value={getvalues.ConfirmPassword}
                      onChange={handleChangeValues}
                    />
                  </div>
                </div>
                <div className="my-10">
                  <div className="w-full my-10 text-center">
                    <button
                      type="submit"
                      onClick={submitData}
                      className="bg-red-400 hover:bg-black transition-all transform duration-500 py-2 rounded-md w-1/2 font-medium text-white  text-lg"
                    >
                      Register Now{" "}
                    </button>
                  </div>
                  <div className="mt-3 flex  items-center gap-2 text-lg ">
                    <span>Already have an account ?</span>
                    <Link
                      href={"/login"}
                      className=" text-red-400 cursor-pointer font-normal"
                    >
                      Login
                    </Link>
                  </div>
                </div>
              </form>
            </div>
            <input
              ref={imageRef}
              type="file"
              className="hidden"
              onChange={imageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;