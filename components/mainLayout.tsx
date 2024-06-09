"use client";
import { CiHome } from "react-icons/ci";
import { FaUsers } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { MdFastfood } from "react-icons/md";
import { PiBuildingsBold } from "react-icons/pi";
import { GrProjects } from "react-icons/gr";
import { FaAngleRight } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname(); // Get current pathname using usePathname()

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Function to determine link classes based on current path
  const getLinkClasses = (path: string) =>
    pathname === path
      ? "bg-blue-200 text-blue-800"
      : "hover:bg-blue-200 hover:text-blue-800";

  if (!isMounted) {
    return null;
  }

  return (
    <div className="bg-[#1D2132] w-full min-h-screen">
      <div className="flex justify-start items-start px-5">
        <aside className=" bg-[#1D2132] text-white  rounded-lg w-70 p-2">
          <ul>
            <li className=" mb-20">
              <Image
                className=" m-10  ml-5 mb-0"
                src="/images/logo.png"
                width={200}
                height={200}
                alt="Logo"
              />
              <h3 className="text-white ml-5 text-2xl">Abissinya Ticketing</h3>
            </li>
            <li
              className={`flex justify-start pl-5 text-xl items-center border border-blue-500 border-solid rounded-lg my-2 p-2 ${getLinkClasses(
                "/"
              )}`}
            >
              <CiHome className=" mr-2 text-xl " />
              <Link href="/">Home</Link>
            </li>
            <li
              className={`flex justify-start pl-5 text-xl items-center border border-blue-500 border-solid hover:bg-blue-200 hover:text-blue-800 rounded-lg my-2 p-2 ${getLinkClasses(
                "/users"
              )}`}
            >
              <FaUsers className=" mr-2 text-xl" />
              <Link href="/users">Users</Link>
            </li>
            <li
              className={`flex justify-start pl-5 text-xl items-center border border-blue-500 border-solid hover:bg-blue-200 hover:text-blue-800 rounded-lg my-2 p-2 ${getLinkClasses(
                "/movies"
              )}`}
            >
              <MdLocalMovies className=" mr-2 text-xl" />
              <Link href="/movies">Movies</Link>
            </li>
            <li
              className={`flex justify-start pl-5 text-xl items-center border border-blue-500 border-solid hover:bg-blue-200 hover:text-blue-800 rounded-lg my-2 p-2 ${getLinkClasses(
                "/schedules"
              )}`}
            >
              <SlCalender className=" mr-2 text-xl" />
              <Link href="/schedules">Schedules</Link>
            </li>
            <li
              className={`flex justify-start pl-5 text-xl items-center border border-blue-500 border-solid hover:bg-blue-200 hover:text-blue-800 rounded-lg my-2 p-2 ${getLinkClasses(
                "/halls"
              )}`}
            >
              <PiBuildingsBold className=" mr-2 text-xl" />
              <Link href="/halls">Halls</Link>
            </li>
            <li
              className={`flex justify-start pl-5 text-xl items-center border border-blue-500 border-solid hover:bg-blue-200 hover:text-blue-800 rounded-lg my-2 p-2 ${getLinkClasses(
                "/snacks"
              )}`}
            >
              <MdFastfood className=" mr-2 text-xl" />
              <Link href="/snacks">Foods & Drinks</Link>
            </li>
            <li className="flex justify-start pl-5 text-xl items-center border border-blue-500 border-solid hover:bg-blue-200 hover:text-blue-800 rounded-lg my-2 p-2">
              <GrProjects className=" mr-2 text-xl" />
              <h3 className="flex-1">Projects</h3>
              <FaAngleRight />
            </li>
          </ul>
        </aside>

        <main className="flex-1 mt-40 mx-10">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;