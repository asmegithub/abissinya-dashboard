"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

import SearchBar from "@/components/searchBar/searchBar";
import AddSnack from "@/components/addSnack/AddSnack";

type Snack = {
  _id: string;
  type: string;
  name: string;
  image: string;
  price: number;
};

const FoodAndDrinkPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [snacks, setSnacks] = useState<Snack[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const getSnacks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://abissinia-backend.vercel.app/api/snacks"
        );
        setSnacks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetching snacks:", error);
        toast.error("Error in fetching snacks.");
        setLoading(false);
      }
    };

    getSnacks();
  }, []);

  const deleteSnack = async (id: string) => {
    try {
      await axios.delete(
        `https://abissinia-backend.vercel.app/api/snacks/${id}`
      );
      setSnacks(snacks.filter((snack) => snack._id !== id));
      toast.success("Snack deleted successfully");
    } catch (error) {
      console.error("Error deleting snack:", error);
      toast.error("Error deleting snack.");
    }
  };

  // Filter snacks based on search term
  const filteredSnacks = snacks.filter((snack) =>
    snack.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="flex flex-col text-white">
      <SearchBar name="snack" onChange={handleSearchChange} />
      <div className="flex justify-between mr-5 my-5">
        {showModal && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50 flex">
            <div className="relative p-8 bg-white w-full max-w-3xl m-auto flex-col flex rounded-lg">
              <AddSnack setShowModal={setShowModal} />
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white font-bold px-6 py-2 rounded-lg"
        >
          Add Snack
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="px-10 rounded-xl border border-blue-500 overflow-x-auto h-[650px]">
          <li className="flex border-b-2 justify-start p-4 mb-5">
            <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">Type</div>
            <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">Name</div>
            <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">Price</div>
            <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">
              Actions
            </div>
          </li>
          {filteredSnacks.map((snack) => (
            <li key={snack._id} className="flex justify-start pb-5">
              <div className="w-1/4 pl-3 font-bold">{snack.type}</div>
              <div className="flex w-1/4 gap-2">
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                  <Image
                    className="rounded-full"
                    src={snack.image}
                    alt={`${snack.name} image`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p className="pt-2">{snack.name}</p>
              </div>
              <div className="pt-2 w-1/4 pl-3 font-bold">{snack.price} ETB</div>
              <div className="flex gap-2">
                <button
                  className="flex text-lg pt-1 pl-3 pr-3 text-red-500 rounded-lg font-bold border border-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => deleteSnack(snack._id)}
                >
                  <MdDeleteForever className="text-white text-2xl pt-1" />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FoodAndDrinkPage;
