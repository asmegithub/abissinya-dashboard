"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

import SearchBar from "@/components/searchBar/searchBar";
import AddMovie from "@/components/addMovieModal/addMovie";

type Movie = {
  name: string;
  genre: string;
  releasedDate: string;
};

const MoviesPage = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

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
  const movies: Movie[] = [
    {
      name: "ትዝታ",
      genre: "ፊልም",
      releasedDate: "ግንቦት 19 2024",
    },
    {
      name: "ስቄ ልሙት",
      genre: "ፊልም",
      releasedDate: "ሚያዝያ 19 2016",
    },
    {
      name: "ድርድር",
      genre: "ፊልም",
      releasedDate: "ሚያዝያ 19 2016",
    },
    {
      name: "የኔ ልጆች",
      genre: "ፊልም",
      releasedDate: "ጥር 2016",
    },
    {
      name: "ትዝታ part-2",
      genre: "Action",
      releasedDate: "ግንቦት 19 2024",
    },
    {
      name: "ስቄ ልሙት",
      genre: "Action",
      releasedDate: "ሚያዝያ 19 2016",
    },

    {
      name: "New Amharic Horrer",
      genre: "Action",
      releasedDate: "ሚያዝያ 19 2016",
    },
    {
      name: "ድርድር",
      genre: "ድራማ",
      releasedDate: "ሚያዝያ 19 2016",
    },
    {
      name: "የኔ ልጆች",
      genre: "ድራማ",
      releasedDate: "ጥር 2016",
    },
  ];
  // Filter movies based on search term and selected genre
  const filteredMovies = movies.filter((movie) => {
    if (selectedGenre && movie.genre !== selectedGenre) {
      return false; // Skip if genre doesn't match selected genre
    }
    if (searchTerm && !movie.name.toLowerCase().includes(searchTerm)) {
      return false; // Skip if movie name doesn't match search term
    }
    return true; // Include movie in filtered list
  });

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
                className={`
                block w-full text-center px-4 py-2 text-white hover:text-blue-500 hover:font-bold px-4 py-2 text-xl`}
              >
                ፊልም
              </button>
              <button
                onClick={() => handleGenreFilter("Action")}
                className=" block w-full text-center px-4 py-2 text-white hover:text-blue-500 hover:font-bold px-4 py-2 text-xl"
              >
                Action
              </button>
              <button
                onClick={() => handleGenreFilter("ድራማ")}
                className=" block w-full text-center px-4 py-2 text-white hover:text-blue-500 hover:font-bold px-4 py-2 text-xl"
              >
                ድራማ
              </button>
              {/* Add other genres here */}
            </div>
          )}
        </div>
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
          Add Movie
        </button>
      </div>
      <ul className="px-10 rounded-xl border border-blue-500 overflow-x-auto h-[650px]">
        <li className="flex border-b-2  justify-start p-4 mb-5">
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">Name</div>
          <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">Genre</div>
          <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">
            Released Date
          </div>
        </li>
        {filteredMovies.map((movie, index) => (
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
              <p className="pt-2">{movie.name}</p>
            </div>
            <div className="pt-2 w-3/12 pl-3 font-bold">{movie.genre}</div>
            <div className="pt-2 w-3/12 pl-3 font-bold">
              {movie.releasedDate}
            </div>
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

export default MoviesPage;
