"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import { useRouter } from "next/navigation"; // Correct import for App Router

import SearchBar from "@/components/searchBar/searchBar";
import AddMovie from "@/components/addMovieModal/addMovie";
import axios from "axios";
import { toast } from "react-toastify";

type Movie = {
  _id: string;
  title: String;
  describtion: String;
  genre: string[];
  poster: String;
  country: string;
  releaseDate: string;
  reviewId: string;
  starsId: string;
};

const MoviesPage = () => {
  const router = useRouter();

  const [showModal, setShowModal] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu
  // const [moviedata, setMovieData] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleGenreFilter = (genre: string) => {
    setSelectedGenre(genre);
    setIsDropdownOpen(false); // Close dropdown after selection
  };
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          "https://abissinia-backend.vercel.app/api/movies?page=1&limit=1000"
        );
        setMovies(response.data.movies);
      } catch (error) {
        console.error("Error in fetching users:", error);
      }
    };
    getMovies();
  }, []);

  async function deleteMovie(movieId: string): Promise<void> {
    try {
      const response = await axios.delete(
        `https://abissinia-backend.vercel.app/api/movies/${movieId}`
      );
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
      console.log(`Movie with ID ${movieId} deleted successfully.`);
      toast.success("Movie deleted successfully!");
      console.log(response.data); // Optional: Log the response data if needed
    } catch (error) {
      console.error(`Error deleting movie with ID ${movieId}:`, error);
      toast.error("Can't delete the movie!");
    }
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "2-digit",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    // Customize the date format to remove the comma
    return formattedDate.replace(",", "");
  };
  // Filter movies based on search term and selected genre
  const filteredMovies = movies.filter((movie) => {
    if (selectedGenre && movie.genre.includes(selectedGenre)) {
      return false; // Skip if genre doesn't match selected genre
    }
    if (searchTerm && !movie.title.toLowerCase().includes(searchTerm)) {
      return false; // Skip if movie name doesn't match search term
    }
    return true; // Include movie in filtered list
  });
  if (!movies) return <div className="text-4xl p-50 text-white">Loding...</div>;
  return (
    <div className="flex flex-col text-white">
      <SearchBar name={"movie"} onChange={handleSearchChange} />
      <div className="flex justify-between mr-5 my-5">
        <div className="relative">
          <button
            onClick={handleDropdownToggle}
            className="flex gap-2 text-xl font-bold border border-blue-500 rounded-lg px-6 py-2"
          >
            {selectedGenre ? selectedGenre : "All"}
            <FaAngleDown className="text-blue-500 text-3xl" />
          </button>{" "}
          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 w-full bg-gray-800 rounded-lg shadow-lg">
              <button
                onClick={() => handleGenreFilter("ፊልም")}
                className="block w-full text-center text-white hover:text-blue-500 hover:font-bold px-4 py-2 text-xl"
              >
                ፊልም
              </button>
              <button
                onClick={() => handleGenreFilter("Action")}
                className="block w-full text-center text-white hover:text-blue-500 hover:font-bold px-4 py-2 text-xl"
              >
                Action
              </button>
              <button
                onClick={() => handleGenreFilter("ድራማ")}
                className="block w-full text-center text-white hover:text-blue-500 hover:font-bold px-4 py-2 text-xl"
              >
                ድራማ
              </button>
              {/* Add other genres here */}
            </div>
          )}
        </div>
        <div>
          {showModal && (
            <div className="fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50 flex">
              <div className="relative p-8 bg-white w-full max-w-3xl m-auto flex-col flex rounded-lg">
                <AddMovie setShowModal={setShowModal} />
              </div>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white font-bold px-6 py-2 rounded-lg"
        >
          Add Movie
        </button>
      </div>
      <ul className="px-10 rounded-xl border border-blue-500 overflow-x-auto h-[650px]">
        <li className="flex border-b-2 justify-start p-4 mb-5">
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">Name</div>
          <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">Genre</div>
          <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">
            Released Date
          </div>
        </li>

        {movies.length==0?<p className="text-2xl px-96 py-40">Loading...</p>:filteredMovies.map((movie, index) => (
          <li key={movie._id} className="flex justify-start pb-5">
            <div className="flex w-1/3 gap-2">
              <div className="relative w-10 h-10 overflow-hidden rounded-full">
                <Image
                  className="rounded-full"
                  src={`${movie.poster}`}
                  alt={`${movie.title} poster`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="pt-2">{movie.title}</p>
            </div>
            <div className="pt-2 w-3/12 pl-3 font-bold">
              {movie.genre.map((genre) => genre + ", ")}
            </div>

            <div className="pt-2 w-3/12 pl-3 font-bold">
              {formatDate(movie.releaseDate)}
            </div>
            <button
              className="flex text-lg pt-1 pl-3 w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white"
              onClick={() => {
                router.push(`/movies/${movie._id}`);
              }}
            >
              <MdModeEdit className="text-white text-2xl pt-1" />
              Edit
            </button>
            <button
              className="flex text-lg pt-1 pl-3 w-1/12 text-red-500 rounded-lg font-bold border border-red-500 mx-2 hover:bg-red-500 hover:text-white"
              onClick={() => deleteMovie(movie._id)}
            >
              <MdDeleteForever className="text-white text-2xl pt-1" />
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
