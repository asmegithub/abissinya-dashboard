"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineRateReview } from "react-icons/md";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

import SearchBar from "@/components/searchBar/searchBar";
import axios from "axios";
import { toast } from "react-toastify";

type Review = {
  _id: string;
  comment: string;
  rating: string;
  movieId: string;
  userId: string;
  // type: string;
};

const ReviewsPage = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  //
  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await axios.get(
          "https://abissinia-backend.vercel.app/api/reviews"
        );
        setReviews(response.data);
        console.log("Reviews=", response.data);
      } catch (error) {
        console.error("Error in fetching users:", error);
      }
    };
    getReviews();
  }, []);
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(
        `https://abissinia-backend.vercel.app/api/reviews/${id}`
      );
      setReviews(reviews.filter((review) => review._id !== id));
      console.log(`Review with id ${id} deleted`);
      toast.success("Deleted Successfully");
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
  // Filter movies based on search term and selected genre
  const filteredReviews = reviews.filter((review) => {
    if (
      (searchTerm && !review.comment.toLowerCase().includes(searchTerm)) ||
      !review.movieId.toLowerCase().includes(searchTerm)
    ) {
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
        {reviews.length==0?<p className="text-2xl px-96 py-40">Loading...</p>:filteredReviews.map((snack, index) => (
          <li key={index} className="flex justify-start pb-5">
            <div className="flex w-1/3 gap-2">
              <div className="relative w-10 h-10 overflow-hidden rounded-full">
                <MdOutlineRateReview />
              </div>
              <p className="pt-2">{snack.movieId}</p>
            </div>
            <div className="pt-2 w-3/12 pl-3 font-bold">{snack.comment} </div>
            <div className="pt-2 w-3/12 pl-3 font-bold">{snack.rating}</div>
            <button className="flex text-lg  pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ">
              <MdModeEdit className="text-white text-2xl pt-1" />
              Edit
            </button>
            <button
             onClick={() => handleDelete(snack._id)} 
             className="flex text-lg  pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white ">
              <MdDeleteForever className="text-white text-2xl pt-1" />
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsPage;
