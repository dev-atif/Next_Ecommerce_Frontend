"use client";
import React, { useEffect, useState } from "react";
import { FcEditImage } from "react-icons/fc";
import { UserData } from "./Header/Header";
import axios from "axios";
import toast from "react-hot-toast";
type onclose = {
  onClose: () => void;
  user: any;
  fetchData: () => void;
};
const UsereditModel = ({ onClose, user, fetchData }: onclose) => {
  const [userrole, setUserrole] = useState(user.role);
  useEffect(() => {
    if (userrole) {
      console.warn(userrole); // Logs the current role after state updates and re-render occurs
    }
  }, [userrole]);
  const UpdateUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/update-user",
        {
          userId: user._id,
          role: userrole,
        },
        { withCredentials: true }
      );
      if (response.data.success) {
        const success_message = response.data.message;
        toast.success(success_message);
        onClose()
        fetchData()
        console.warn("afterupdated data", response);
      }
    } catch (error) {
      toast.error("Failed to update user");
      console.error('Error updating user:', error);
    }
  };
  return (
    <div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        id="modal-overlay"
      ></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center md:min-h-full justify-center md:mt-0 mt-20 p-4 text-center sm:p-0">
          <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-[100%] md:w-[35%]">
            <div className="bg-red-400 py-3">
              <h1 className="text-white text-lg font-bold tracking-wider text-center">
                Change User Role
              </h1>
            </div>

            <div className="flex flex-col items-center md:flex-row-reverse justify-between md:py-10   px-10">
              <div className="">
                {user.profileImage ? (
                  <img
                    className="w-32 h-32 rounded-full"
                    src={user.profileImage}
                  />
                ) : (
                  <FcEditImage size={130} />
                )}
              </div>
              <div>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Name : <span className="text-black">{user?.name}</span>
                  </p>
                </div>
                <div className="mt-5">
                  <p className="text-sm text-gray-500">
                    Email : <span className="text-black">{user?.email}</span>
                  </p>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <p className="text-sm text-gray-500">Role :</p>
                  <div>
                    <select
                      value={userrole}
                      onChange={(e: any) => setUserrole(e.target.value)}
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                      <option selected value="" disabled>
                        Select Role
                      </option>
                      <option value="Admin">Admin</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className=" px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                onClick={UpdateUser}
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-400 text-base font-medium text-white hover:bg-black transition-all transform duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Confirm
              </button>
              <button
                onClick={onClose}
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsereditModel;
