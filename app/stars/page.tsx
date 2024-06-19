"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import axios from "axios";

import SearchBar from "@/components/searchBar/searchBar";
import AddStar from "@/components/addStar/AddStar";
import EditStar from "@/components/editStar/EditStar";
type Star = {
  _id: string;
  name: string;
  address: {
    email: string;
    phone?: string;
    website?: string;
  };
  profilePhoto: string;
};

const StarsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const getStars = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://abissinia-backend.vercel.app/api/stars"
        );
        setStars(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetching stars:", error);
        toast.error("Error in fetching stars.");
        setLoading(false);
      }
    };

    getStars();
  }, []);

  const deleteStar = async (id: string) => {
    try {
      await axios.delete(
        `https://abissinia-backend.vercel.app/api/stars/${id}`
      );
      setStars(stars.filter((star) => star._id !== id));
      toast.success("Star deleted successfully");
    } catch (error) {
      console.error("Error deleting star:", error);
      toast.error("Error deleting star.");
    }
  };

  const handleEdit = (id: string) => {
    setCurrentEditId(id);
    setShowEditModal(true);
  };

  // Filter stars based on search term
  const filteredStars = stars.filter((star) =>
    star.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="flex flex-col text-white">
      <SearchBar name="star" onChange={handleSearchChange} />
      <div className="flex justify-between mr-5 my-5">
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50 flex">
            <div className="relative p-8 bg-white w-full max-w-3xl m-auto flex-col flex rounded-lg">
              <AddStar setShowModal={setShowAddModal} />
            </div>
          </div>
        )}
        {showEditModal && currentEditId && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50 flex">
            <div className="relative p-8 bg-white w-full max-w-3xl m-auto flex-col flex rounded-lg">
              <EditStar
                setShowModal={setShowEditModal}
                starId={currentEditId}
              />
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white font-bold px-6 py-2 rounded-lg"
        >
          Add Star
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="px-10 rounded-xl border border-blue-500 overflow-x-auto h-[650px]">
          <li className="flex border-b-2 justify-start p-4 mb-5">
            <div className="w-1/2 font-bold text-2xl text-[#A1E8EE]">Name</div>
            <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">
              Address
            </div>
            <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">
              Actions
            </div>
          </li>
          {filteredStars.map((star) => (
            <li key={star._id} className="flex justify-start pb-5">
              <div className="flex w-1/2 gap-2">
                <div className="relative w-10 h-10 overflow-hidden rounded-full">
                  <Image
                    className="rounded-full"
                    src={star.profilePhoto}
                    alt={`${star.name} photo`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p className="pt-2">{star.name}</p>
              </div>
              <div className="pt-2 w-1/4">
                <div>Email: {star.address.email}</div>
                {star.address.phone && <div>Phone: {star.address.phone}</div>}
                {star.address.website && (
                  <div>Website: {star.address.website}</div>
                )}
              </div>
              <div className="flex gap-2 w-1/4">
                <button
                  className="w-28 btn bg-blue-600 text-white"
                  onClick={() => handleEdit(star._id)}
                >
                  <MdModeEdit className="text-white text-2xl pt-1" />
                  Edit
                </button>
                <button
                  className="w-28 btn bg-red-600 text-white"
                  onClick={() => deleteStar(star._id)}
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

export default StarsPage;
