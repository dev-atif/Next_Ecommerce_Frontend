"use client";
import { useAppSelector } from "@/hooks/redux";
import AdminSideBar from "../components/AdminSideBar/AdminSideBar";
import { UserData } from "../components/Header/Header";
import { getUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/shared/Loader";
export default function Layout({ children }: { children: React.ReactNode }) {
  const Auth: UserData | null | undefined = useAppSelector(getUser);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!Auth || (Auth as UserData).role !== "Admin") {
      router.push("/");
      toast.error("Sorry You are not Allowed to this section");
    } else {
      setLoading(false);
    }
  }, [Auth, router]);
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    ); // You can replace this with a more sophisticated loading component if needed
  }
  return (
    <>
      <main>
        <div className="flex   ">
          {
            <div
              className="bg-white  xl:w-[15%]  w-1/5 h-[calc(100dvh-7rem)] fixed  hidden lg:block" /* style={{ height: 'calc(100vh - 4rem)' }} */
            >
              <AdminSideBar />
            </div>
          }
          <div className="w-full flex-1 xl:ml-[15%] lg:ml-[19%] px-5 bg-white">{children}</div>
        </div>
      </main>
    </>
  );
}
