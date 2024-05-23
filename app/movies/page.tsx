"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

import SearchBar from "@/components/searchBar/searchBar";
import AddMovie from "@/components/addMovieModal/addMovie";

const MoviesPage = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  return (
    <div className=" flex flex-col text-white">
      <SearchBar name={"movie"} />
      <div className="flex justify-between mr-5 my-5">
        <div className=" ">
          <button className="flex gap-2 text-xl font-bold border border-blue-500 rounded-lg px-6 py-2 ">
            All
            <FaAngleDown className="text-blue-500 text-3xl" />
          </button>{" "}
        </div>
        <div>
          <dialog className="modal bg-gray-700 " ref={dialogRef}>
            <div className="modal-box max-w-96 rounded-2xl">
              <AddMovie />
            </div>
          </dialog>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white font-bold px-6 py-2 rounded-lg"
        >
          Add Movie
        </button>
      </div>
      <ul className="px-10 rounded-xl border border-blue-500 overflow-x-auto h-[650px]">
        <li className="flex border-b-2  justify-start p-4 mb-5 ">
          {" "}
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE] ">Name</div>
          <div className="w-1/4 font-bold text-2xl text-[#A1E8EE] ">Genre</div>
          <div className="w-1/4 font-bold text-2xl text-[#A1E8EE] ">
            Released Date
          </div>
        </li>

        <li className="flex justify-start pb-5">
          <div className="flex w-1/3 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/movie.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">ትዝታ </p>
          </div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ፊልም</div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ግንቦት 19 2024</div>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
            <MdModeEdit className="text-white text-2xl pt-1" />
            Edit
          </button>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white ">
            <MdDeleteForever className="text-white text-2xl pt-1" />
            Delete
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-1/3 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/ስቄልሙት.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">ስቄ ልሙት </p>
          </div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ፊልም</div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ሚያዝያ 19 2016</div>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
            <MdModeEdit className="text-white text-2xl pt-1" />
            Edit
          </button>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white ">
            <MdDeleteForever className="text-white text-2xl pt-1" />
            Delete
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-1/3 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/ድርድር.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">ድርድር</p>
          </div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ፊልም</div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ሚያዝያ 19 2016</div>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
            <MdModeEdit className="text-white text-2xl pt-1" />
            Edit
          </button>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white ">
            <MdDeleteForever className="text-white text-2xl pt-1" />
            Delete
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-1/3 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/የኔልጆችች.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">የኔ ልጆች </p>
          </div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ፊልም</div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ጥር 2016</div>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
            <MdModeEdit className="text-white text-2xl pt-1" />
            Edit
          </button>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white ">
            <MdDeleteForever className="text-white text-2xl pt-1" />
            Delete
          </button>
        </li>

        <li className="flex justify-start pb-5">
          <div className="flex w-1/3 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/movie.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">ትዝታ </p>
          </div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ፊልም</div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ግንቦት 19 2024</div>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
            <MdModeEdit className="text-white text-2xl pt-1" />
            Edit
          </button>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white ">
            <MdDeleteForever className="text-white text-2xl pt-1" />
            Delete
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-1/3 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/ስቄልሙት.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">ስቄ ልሙት </p>
          </div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ፊልም</div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ሚያዝያ 19 2016</div>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
            <MdModeEdit className="text-white text-2xl pt-1" />
            Edit
          </button>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white ">
            <MdDeleteForever className="text-white text-2xl pt-1" />
            Delete
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-1/3 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/ድርድር.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">ድርድር</p>
          </div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ፊልም</div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ሚያዝያ 19 2016</div>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
            <MdModeEdit className="text-white text-2xl pt-1" />
            Edit
          </button>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white ">
            <MdDeleteForever className="text-white text-2xl pt-1" />
            Delete
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-1/3 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/የኔልጆችች.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">የኔ ልጆች </p>
          </div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ፊልም</div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ጥር 2016</div>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
            <MdModeEdit className="text-white text-2xl pt-1" />
            Edit
          </button>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white ">
            <MdDeleteForever className="text-white text-2xl pt-1" />
            Delete
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-1/3 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/movie.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">ትዝታ </p>
          </div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ፊልም</div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ግንቦት 19 2024</div>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
            <MdModeEdit className="text-white text-2xl pt-1" />
            Edit
          </button>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white ">
            <MdDeleteForever className="text-white text-2xl pt-1" />
            Delete
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-1/3 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/ስቄልሙት.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">ስቄ ልሙት </p>
          </div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ፊልም</div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ሚያዝያ 19 2016</div>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
            <MdModeEdit className="text-white text-2xl pt-1" />
            Edit
          </button>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white ">
            <MdDeleteForever className="text-white text-2xl pt-1" />
            Delete
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-1/3 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/ድርድር.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">ድርድር</p>
          </div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ፊልም</div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ሚያዝያ 19 2016</div>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
            <MdModeEdit className="text-white text-2xl pt-1" />
            Edit
          </button>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white ">
            <MdDeleteForever className="text-white text-2xl pt-1" />
            Delete
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-1/3 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/የኔልጆችች.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">የኔ ልጆች </p>
          </div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ፊልም</div>
          <div className="pt-2 w-3/12 pl-3 font-bold">ጥር 2016</div>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
            <MdModeEdit className="text-white text-2xl pt-1" />
            Edit
          </button>
          <button className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white ">
            <MdDeleteForever className="text-white text-2xl pt-1" />
            Delete
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MoviesPage;
