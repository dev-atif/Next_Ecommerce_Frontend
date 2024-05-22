"use client";
import React, { useEffect, useMemo, useState } from "react";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { CiTrash } from "react-icons/ci";
import UsereditModel from "@/app/components/UsereditModel";
import axios from "axios";
import { UserData } from "@/app/components/Header/Header";
import moment from "moment";
import Loader from "@/app/components/shared/Loader";
const page = () => {
  const [modelopen, setModel] = useState(false);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  //Fetch USer data Function
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/allusers", {
        withCredentials: true,
      });
      /*  console.warn(response.data.data); */
      setUsers(response.data.data); // Log or set this data to state as needed
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  //USe memo to memorize the data ....
  const MemorizeUser = useMemo(()=>users,[users])
  const handleEditClick = (user: any) => {
    setCurrentUser(user); // Set the current user data
    setModel(true); // Open the modal
  };

  const handleClose = () => {
    setCurrentUser(null); // Reset the current user data
    setModel(false); // Close the modal
  };
  return (
    <div>
      <div className="mt-8">
        <h1 className="font-medium text-3xl tracking-wide  ">
          All Users <span className="text-red-400">({users.length})</span>
        </h1>
      </div>
      {/* User Details Table ----------------------------------------- */}
      <div>
        <div className="container mx-auto mt-10 overflow-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200 overflow-auto">
            <thead className="bg-red-400 ">
              <tr>
                <th className="border-b-2 border-gray-300 p-3 text-left text-xs font-bold text-white  uppercase tracking-wider">
                  Name
                </th>
                <th className="border-b-2 border-gray-300 p-3 text-left text-xs font-bold text-white  uppercase tracking-wider">
                  Email
                </th>
                <th className="border-b-2 border-gray-300 p-3 text-left text-xs font-bold text-white  uppercase tracking-wider">
                  Role
                </th>
                <th className="border-b-2 border-gray-300 p-3 text-left text-xs font-bold text-white  uppercase tracking-wider">
                  Phone
                </th>
                <th className="border-b-2 border-gray-300 p-3 text-left text-xs font-bold text-white  uppercase tracking-wider">
                  Created at
                </th>
                <th className="border-b-2 border-gray-300 p-3 text-left text-xs font-bold text-white  uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {MemorizeUser.map((item, index) => (
                <tr>
                  <td className="border-b border-gray-200 p-3 text-sm text-gray-900">
                    {(item as UserData)?.name}
                  </td>
                  <td className="border-b border-gray-200 p-3 text-sm text-gray-900">
                    {(item as UserData)?.email}
                  </td>
                  <td className="border-b border-gray-200 p-3 text-sm text-gray-900">
                    {(item as UserData)?.role
                      ? (item as UserData)?.role
                      : "N/A"}
                  </td>
                  <td className="border-b border-gray-200 p-3 text-sm text-gray-900">
                    {(item as UserData)?.number
                      ? (item as UserData)?.number
                      : "N/A"}
                  </td>
                  <td className="border-b border-gray-200 p-3 text-sm text-gray-900">
                    {moment((item as UserData)?.createdAt).format("ll")}
                  </td>
                  <td className="border-b  border-gray-200 p-3 text-sm text-gray-900">
                    <div className="flex justify-around">
                      <span
                        onClick={() => handleEditClick(item)}
                        className="bg-green-300 p-2 rounded-full cursor-pointer"
                      >
                        <MdOutlineModeEditOutline
                          className="cursor-pointer"
                          size={20}
                        />
                      </span>
                      <span className="bg-red-400 text-white p-2 rounded-full">
                        <CiTrash size={20} />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>{loading ? <Loader /> : null}</div>
        <div>{/*  <Loader/> */}</div>
        {modelopen && (
          <div>
            <UsereditModel user={currentUser} onClose={handleClose} fetchData={fetchData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
