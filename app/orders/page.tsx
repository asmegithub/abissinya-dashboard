"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineRateReview } from "react-icons/md";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

import SearchBar from "@/components/searchBar/searchBar";
import AddMovie from "@/components/addMovieModal/addMovie";
import axios from "axios";
import { toast } from "react-toastify";

type Snack = {
  image: string;
  name: string;
  price: string;
  type: string;
};
type Order = {
  date: string;
  movieId: string;
  snacks: Snack[];
};

const ReviewsPage = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          "https://abissinia-backend.vercel.app/api/orders"
        );
        setOrders(response.data);
        console.log("Orders=", response.data.snacks);
      } catch (error) {
        console.error("Error in fetching users:", error);
      }
    };
    getOrders();
  }, []);
  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

   return (
    <div className="flex flex-col text-white">
      <div className="flex justify-between mr-5 my-5">
        <div>
          <dialog className="modal bg-gray-700" ref={dialogRef}>
            <div className="modal-box max-w-96 rounded-2xl">
              {/* <AddMovie /> */}
            </div>
          </dialog>
        </div>
        
      </div>
      <ul className="px-10 rounded-xl border border-blue-500 overflow-x-auto h-[650px]">
        <li className="flex border-b-2  justify-start p-4 mb-5">
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">Name</div>
          <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">comment</div>
          <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">Rating</div>
        </li>
        {(orders.length==0)?<p className="text-2xl px-96 py-40">Loading...</p>: orders.map((order, index) => (
          <li key={index} className="flex justify-start pb-5">
            <div className="flex w-1/3 gap-2">
              <div className="relative w-10 h-10 overflow-hidden rounded-full">
                <MdOutlineRateReview />
              </div>
              <p className="pt-2">{order.movieId}</p>
            </div>
            <div className="pt-2 w-3/12 pl-3 font-bold">{order.date} </div>
            <div className="pt-2 w-3/12 pl-3 font-bold">
              {order.snacks.map((snack) => {
                return <span key={snack.name}>{snack.name},</span>;
              })}
            </div>

            {/* <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
              <MdModeEdit className="text-white text-2xl pt-1" />
              Edit
            </button>
            <button
              className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white "
            >
              <MdDeleteForever className="text-white text-2xl pt-1" />
              Delete
            </button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsPage;
