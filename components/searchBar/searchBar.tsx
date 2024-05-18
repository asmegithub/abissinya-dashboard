import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ name }: { name: string }) => {
  return (
    <div className="flex justify-center items-center ">
      <div className="relative w-full max-w-xl">
        <input
          type="search"
          placeholder="Search..."
          name={name}
          className="bg-[#1A1F33] w-full focus:outline-none text-white border border-blue-500 rounded-xl pl-4 pr-10 py-4"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-2xl" />
      </div>
    </div>
  );
};

export default SearchBar;
