"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

import SearchBar from "@/components/searchBar/searchBar";
import AddHallModal from "@/components/addHallModal/addHall";
import Link from "next/link";

type Hall = {
  name: string;
  address: string;
  mapUrl: String;
};

const HallsPage = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [hallStore, setHallStore] = useState([]);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const getHalls = async () => {
      try {
        const query = await fetch(
          "https://abissinia-backend.vercel.app/api/halls"
        );

        if (!query.ok) {
          throw new Error(`HTTP error! status: ${query.status}`);
        }
        const response = await query.json();
        console.log("Full response:", response);

        // Assuming you want to access an array of halls, adjust the property name as necessary
        const hallsArray =
          response.halls || response.movies || response.data || [];
        console.log("Halls array:", hallsArray);

        // Uncomment and update this line if you have a state to set the fetched data
        // setMovieData(hallsArray);
      } catch (error) {
        console.error("Error in fetching halls:", error);
      }
    };

    getHalls();
  }, []);

  const halls: Hall[] = [
    {
      name: "Hager Fiker Theater",
      address: "Bole",
      mapUrl: "https://maps.app.goo.gl/gnV23gNvAihw7GEfA",
    },
    {
      name: "Menilik Adarash",
      address: "Mexico",
      mapUrl: "https://maps.app.goo.gl/gnV23gNvAihw7GEfA",
    },
    {
      name: "Taytu Adarash",
      address: "4 kilo",
      mapUrl: "https://maps.app.goo.gl/gnV23gNvAihw7GEfA",
    },
    {
      name: "Ras Mekonen Hall",
      address: "Kebena",
      mapUrl: "https://maps.app.goo.gl/gnV23gNvAihw7GEfA",
    },
  ];
  // Filter movies based on search term and selected address
  const filteredHalls = halls.filter((hall) => {
    if (searchTerm && !hall.name.toLowerCase().includes(searchTerm)) {
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
              <AddHallModal />
            </div>
          </dialog>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white font-bold px-6 py-2 rounded-lg"
        >
          Add Hall
        </button>
      </div>
      <ul className="px-10 rounded-xl border border-blue-500 overflow-x-auto h-[650px]">
        <li className="flex border-b-2  justify-start p-4 mb-5">
          <div className="w-1/2 font-bold text-2xl text-[#A1E8EE]">Name</div>
          <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">Address</div>
        </li>
        {filteredHalls.map((hall, index) => (
          <li key={index} className="flex justify-start pb-5">
            <div className="flex w-1/2 gap-2">
              <div className="">
                <Image
                  className="rounded-full"
                  src="/images/movie.png"
                  width={40}
                  height={40}
                  alt="Logo"
                />
              </div>
              <p className="pt-2">{hall.name}</p>
            </div>
            <div className="pt-2 w-1/3 pl-3 font-bold">
              <Link
                href={`${hall.mapUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                passHref
              >
                {hall.address}
              </Link>
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

export default HallsPage;
