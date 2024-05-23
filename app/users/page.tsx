"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import SearchBar from "@/components/searchBar/searchBar";
import AddUser from "@/components/addUserModal/addUser";

const UsersPage = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  return (
    <div className=" flex flex-col text-white">
      <SearchBar name={"user"} />
      <div className="flex justify-between mr-5 my-5">
        <div className=" ">
          <button className="flex gap-2 text-xl font-bold border border-blue-500 rounded-lg px-6 py-2 ">
            Admin
            <FaAngleDown className="text-blue-500 text-3xl" />
          </button>{" "}
        </div>
        <div>
          <dialog className="modal bg-gray-700 " ref={dialogRef}>
            <div className="modal-box max-w-96 rounded-2xl">
              <AddUser />
            </div>
          </dialog>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white font-bold px-6 py-2 rounded-lg"
        >
          Add User
        </button>
      </div>
      <ul className="px-10 rounded-xl border border-blue-500 overflow-x-auto h-[650px]">
        <li className="flex border-b-2  justify-start p-4 mx-4 mb-5 ">
          {" "}
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE] ">Name</div>
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE] ">E-mail</div>
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE] ">Role</div>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-4/12 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/profile.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">Abrham Belayneh</p>
          </div>
          <div className="pt-2 w-4/12  ">abrham@gmail.com</div>
          <div className="pt-2 w-3/12 ">Admin</div>
          <button className="w-1/12 text-red-500 rounded-lg font-bold border border-red-500 hover:bg-red-500 hover:text-white">
            Remove
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-4/12 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/profile.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">Asmare Zelalem</p>
          </div>
          <div className="pt-2 w-4/12  ">asmare@gmail.com</div>
          <div className="pt-2 w-3/12 ">Admin</div>
          <button className="w-1/12 text-red-500 rounded-lg font-bold border border-red-500 hover:bg-red-500 hover:text-white ">
            Remove
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-4/12 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/profile.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">Asmare Zelalem</p>
          </div>
          <div className="pt-2 w-4/12  ">asmare@gmail.com</div>
          <div className="pt-2 w-3/12 ">Admin</div>
          <button className="w-1/12 text-red-500 rounded-lg font-bold border border-red-500 hover:bg-red-500 hover:text-white">
            Remove
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-4/12 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/profile.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">Asmare Zelalem</p>
          </div>
          <div className="pt-2 w-4/12  ">asmare@gmail.com</div>
          <div className="pt-2 w-3/12 ">Admin</div>
          <button className="w-1/12 text-red-500 rounded-lg font-bold border border-red-500 hover:bg-red-500 hover:text-white">
            Remove
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-4/12 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/profile.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">Asmare Zelalem</p>
          </div>
          <div className="pt-2 w-4/12  ">asmare@gmail.com</div>
          <div className="pt-2 w-3/12 ">Admin</div>
          <button className="w-1/12 text-red-500 rounded-lg font-bold border border-red-500 hover:bg-red-500 hover:text-white">
            Remove
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-4/12 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/profile.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">Abrham Belayneh</p>
          </div>
          <div className="pt-2 w-4/12  ">abrham@gmail.com</div>
          <div className="pt-2 w-3/12 ">Admin</div>
          <button className="w-1/12 text-red-500 rounded-lg font-bold border border-red-500 hover:bg-red-500 hover:text-white">
            Remove
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-4/12 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/profile.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">Asmare Zelalem</p>
          </div>
          <div className="pt-2 w-4/12  ">asmare@gmail.com</div>
          <div className="pt-2 w-3/12 ">Admin</div>
          <button className="w-1/12 text-red-500 rounded-lg font-bold border border-red-500 hover:bg-red-500 hover:text-white">
            Remove
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-4/12 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/profile.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">Asmare Zelalem</p>
          </div>
          <div className="pt-2 w-4/12  ">asmare@gmail.com</div>
          <div className="pt-2 w-3/12 ">Admin</div>
          <button className="w-1/12 text-red-500 rounded-lg font-bold border border-red-500 hover:bg-red-500 hover:text-white">
            Remove
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-4/12 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/profile.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">Asmare Zelalem</p>
          </div>
          <div className="pt-2 w-4/12  ">asmare@gmail.com</div>
          <div className="pt-2 w-3/12 ">Admin</div>
          <button className="w-1/12 text-red-500 rounded-lg font-bold border border-red-500 hover:bg-red-500 hover:text-white">
            Remove
          </button>
        </li>
        <li className="flex justify-start pb-5">
          <div className="flex w-4/12 gap-2  ">
            {" "}
            <div className="">
              <Image
                className=" rounded-full  "
                src="/images/profile.png"
                width={40}
                height={40}
                alt="Logo"
              />
            </div>
            <p className="pt-2">Asmare Zelalem</p>
          </div>
          <div className="pt-2 w-4/12  ">asmare@gmail.com</div>
          <div className="pt-2 w-3/12 ">Admin</div>
          <button className="w-1/12 text-red-500 rounded-lg font-bold  border border-red-500 hover:bg-red-500 hover:text-white">
            Remove
          </button>
        </li>
      </ul>
    </div>
  );
};

export default UsersPage;
