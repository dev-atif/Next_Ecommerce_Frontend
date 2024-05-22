"use client";
import { useAppSelector } from "@/hooks/redux";
import { getUser } from "@/redux/userSlice";
import React from "react";
import { UserData } from "../Header/Header";
import Link from "next/link";

const AdminSideBar = () => {
  const UserDetails: UserData | null | undefined = useAppSelector(getUser);
  return (
    <div className="px-5  py-10  flex flex-col  bg-white ">
      <div className="flex gap-3 justify-center flex-col items-center">
        {UserDetails && (
          <>
            <img
              src={(UserDetails as UserData).profileImage}
              alt="Profile"
              className="rounded-full w-28 h-28"
            />
            <div>
              <p className=" text-xl font-medium">
                {(UserDetails as UserData).name}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <p className=" text-base  font-medium">Role </p>
              <p className=" text-base text-red-400 font-medium">
                {(UserDetails as UserData).role}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="mt-16 flex flex-col gap-3">
        <Link href={"/allusers"}>
          {" "}
          <div className="bg-red-400 text-white font-medium transition-all transform duration-300 hover:bg-black text-center py-2 rounded-md">
            All Users
          </div>
        </Link>
        <Link href={"/dashboard"}>
          {" "}
          <div className="bg-red-400 text-white font-medium transition-all transform duration-300 hover:bg-black text-center py-2 rounded-md">
           All Product
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
