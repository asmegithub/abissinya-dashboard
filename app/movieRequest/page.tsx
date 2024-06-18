"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdCheckCircle, MdCancel } from "react-icons/md";
import SearchBar from "@/components/searchBar/searchBar";
import ApproveMovieRequest from "@/components/approveMovieRequest/approveMovieRequest";
import { toast } from "react-toastify";
import axios from "axios";

type MovieRequest = {
  _id: string;
  userId: string;
  title: string;
  duration: number;
  releaseDate: string;
  posterURL: string;
  description: string;
  yourName: string;
  yourEmail: string;
  createdAt: string;
  updatedAt: string;
};

const MovieRequestsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movieRequests, setMovieRequests] = useState<MovieRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedMovieData, setSelectedMovieData] =
    useState<Partial<MovieRequest> | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const getMovieRequests = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://abissinia-backend.vercel.app/api/movie-requests"
        );
        const data = await response.json();
        setMovieRequests(data);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetching movie requests:", error);
        toast.error("Error in fetching movie requests.");
        setLoading(false);
      }
    };

    getMovieRequests();
  }, []);

  const handleApproveClick = (movieData: Partial<MovieRequest>) => {
    setSelectedMovieData(movieData);
    setShowApproveModal(true);
  };

  const handleReject = async (request: MovieRequest) => {
    try {
      const response2 = await axios.delete(
        `https://abissinia-backend.vercel.app/api/movie-requests/${request._id}`
      );
      const response3 = await axios.post(
        `https://abissinia-backend.vercel.app/api/notifications`,
        {
          userId: request.userId,
          content: "sorry. Your movie request is rejected.",
          link: "#",
        }
      );
      setMovieRequests(
        movieRequests.filter((request) => request._id !== request._id)
      );
      toast.success("Movie request rejected successfully.");
    } catch (error) {
      console.error("Error rejecting movie request:", error);
      toast.error("Error rejecting movie request.");
    }
  };

  // Filter movie requests based on search term
  const filteredRequests = movieRequests.filter((request) => {
    if (searchTerm && !request.title.toLowerCase().includes(searchTerm)) {
      return false; // Skip if movie title doesn't match search term
    }
    return true; // Include request in filtered list
  });

  return (
    <div className="flex flex-col text-white">
      <SearchBar name={"movie"} onChange={handleSearchChange} />
      <div className="flex justify-between mr-5 my-5">
        <h1 className="text-3xl font-bold">Movie Requests</h1>
      </div>
      {showApproveModal && selectedMovieData && (
        <div className="fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50 flex">
          <div className="relative p-8 bg-gray-700 w-full max-w-3xl m-auto flex-col flex rounded-lg">
            <ApproveMovieRequest
              setShowModal={setShowApproveModal}
              movieData={selectedMovieData}
            />
          </div>
        </div>
      )}
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="px-10 rounded-xl border border-blue-500 overflow-x-auto h-[650px]">
          <li className="flex border-b-2 justify-start p-4 mb-5">
            <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">Title</div>
            <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">
              Filmmaker
            </div>
            <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">
              Submitted
            </div>
          </li>
          {filteredRequests.map((request, index) => (
            <li key={index} className="flex justify-start pb-5">
              <div className="flex w-1/3 gap-2">
                <Image
                  className="rounded-full"
                  src={request.posterURL}
                  width={40}
                  height={40}
                  alt="Poster"
                />
                <p className="pt-2">{request.title}</p>
              </div>
              <div className="pt-2 w-3/12 pl-3 font-bold">
                <p>{request.yourName}</p>
                <p className="text-sm">{request.yourEmail}</p>
              </div>
              <div className="pt-2 w-3/12 pl-3 font-bold">
                <p>{new Date(request.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <button
                  className="w-28 btn bg-green-600 text-white"
                  onClick={() => handleApproveClick(request)}
                >
                  <MdCheckCircle className="text-white text-2xl pt-1" />
                  Approve
                </button>
                <button
                  className="btn w-28 bg-red-600 text-white"
                  onClick={() => handleReject(request)}
                >
                  <MdCancel className="text-white text-2xl pt-1" />
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieRequestsPage;
