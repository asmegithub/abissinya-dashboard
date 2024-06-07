"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

import SearchBar from "@/components/searchBar/searchBar";
import AddMovie from "@/components/addMovieModal/addMovie";

type Snack = {
  name: string;
  price: string;
  quantity: string;
};

const SnackPage = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const snacks: Snack[] = [
    {
      name: "የገብስ ቆሎ",
      price: "40.0",
      quantity: "300kg",
    },
    {
      name: "Chips",
      price: "35.0",
      quantity: "35 pack",
    },
    {
      name: "Popcorn",
      price: "99.00",
      quantity: "29 pack",
    },
  ];
  // Filter movies based on search term and selected genre
  const filteredSnacks = snacks.filter((snack) => {
    if (searchTerm && !snack.name.toLowerCase().includes(searchTerm)) {
      return false; // Skip if movie name doesn't match search term
    }
    return true; // Include movie in filtered list
  });

  return (
    <div className="flex flex-col text-white">
      <SearchBar name={"movie"} onChange={handleSearchChange} />
      <div className="flex justify-between mr-5 my-5">
        <div>
          <dialog className="modal bg-gray-700" ref={dialogRef}>
            <div className="modal-box max-w-96 rounded-2xl">
              <AddMovie />
            </div>
          </dialog>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white font-bold px-6 py-2 rounded-lg"
        >
          Add Snack
        </button>
      </div>
      <ul className="px-10 rounded-xl border border-blue-500 overflow-x-auto h-[650px]">
        <li className="flex border-b-2  justify-start p-4 mb-5">
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">Name</div>
          <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">price</div>
          <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">
            quantity
          </div>
        </li>
        {filteredSnacks.map((snack, index) => (
          <li key={index} className="flex justify-start pb-5">
            <div className="flex w-1/3 gap-2">
              <div className="">
                <Image
                  className="rounded-full"
                  src="/images/movie.png"
                  width={40}
                  height={40}
                  alt="Logo"
                />
              </div>
              <p className="pt-2">{snack.name}</p>
            </div>
            <div className="pt-2 w-3/12 pl-3 font-bold">{snack.price}</div>
            <div className="pt-2 w-3/12 pl-3 font-bold">{snack.quantity}</div>
            <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
              <MdModeEdit className="text-white text-2xl pt-1" />
              Edit
            </button>
            <button className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white ">
              <MdDeleteForever className="text-white text-2xl pt-1" />
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SnackPage;
