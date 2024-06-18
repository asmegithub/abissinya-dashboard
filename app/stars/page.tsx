"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdModeEdit } from "react-icons/md";

import { FaAngleDown } from "react-icons/fa";
import SearchBar from "@/components/searchBar/searchBar";
import AddUser from "@/components/addUserModal/addUser";

const StarsPage = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [stars, setStars] = useState<Star[]>([]);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  useEffect(() => {
    const getStars = async () => {
      try {
        const query = await fetch(
          "https://abissinia-backend.vercel.app/api/stars"
        );
        const stars = await query.json();
        setStars(stars);
      } catch (error) {
        console.error("Error in fetching users:", error);
      }
    };
    getStars();
  }, []);
  type Address = {
    email: string;
    phone?: string;
    website?: string;
  };
  type Star = {
    _id: string;
    name: string;
    address: Address;
    profilePhoto: string;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleRemoveUser = async (id: string) => {
    console.log("start removing...");
    try {
      const response = await fetch(
        `https://abissinia-backend.vercel.app/api/stars/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log("done....");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} ${errorText}`);
      }
      // Update the user list after successful deletion
      setStars((prevUsers) => prevUsers.filter((user) => user._id !== id));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(`An expected Error in deleting user`);
    }
  };
  const filteredStars = stars.filter(
    (star) => star.name.toLowerCase().includes(searchTerm.toLowerCase())
    // || user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col text-white">
      <SearchBar name="user" onChange={handleSearchChange} />
      <div className="flex justify-between mr-5 my-5">
        <div>
          <dialog className="modal bg-gray-700" ref={dialogRef}>
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
        <li className="flex border-b-2 justify-start p-4 mx-4 mb-5">
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">Name</div>
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">E-mail</div>
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">Phone</div>
        </li>

        {stars.length==0?<p className="text-2xl px-96 py-40">Loading...</p>:filteredStars.map((star) => {
          return (
            <li key={star._id} className="flex justify-start pb-5">
              <div className="flex w-4/12 gap-2">
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                  <Image
                    className="rounded-full"
                    src={star.profilePhoto}
                    alt={`${star.name} poster`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p className="pt-2">{star.name}</p>
              </div>
              <div className="pt-2 w-4/12">{star.address.email}</div>
              <div className="pt-2 w-3/12">{star.address.phone}</div>
              <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
                <MdModeEdit className="text-white text-2xl pt-1" />
                Edit
              </button>
              <button
                className="w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2  hover:bg-red-500 hover:text-white"
                onSubmit={() => {
                  handleRemoveUser(star._id);
                  // setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StarsPage;
