"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";

import SearchBar from "@/components/searchBar/searchBar";
import AddMovieSchedule from "@/components/addSchedule/addScheduleModal";
import Link from "next/link";
type ShowDate = {
  date: String;
  time: string[];
};
type Schedule = {
  name: string;
  hall: [
    {
      hallName: string;
      address: String;
    }
  ];
  showDate: ShowDate[];
};
const SchedulesPage = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [scheduleArry, setScheduleArry] = useState([]);
  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const getSchedules = async () => {
      try {
        const query = await fetch(
          "https://abissinia-backend.vercel.app/api/movies/scheduled"
        );
        const response = await query.json();
        const schedulArray = response; // Access the movies array from the resolved response
        console.log(schedulArray);
        setScheduleArry(schedulArray);
      } catch (error) {
        console.error("Error in fetching movies:", error);
      }
    };
    getSchedules();
  }, []);
  const schedules: Schedule[] = [
    {
      name: "ትዝታ የገጠር ድራማ ",
      hall: [
        {
          hallName: "Tayitu Hall",
          address: "https://maps.app.goo.gl/QVHCGmZZC4L7zjxi8",
        },
      ],
      showDate: [
        {
          date: "Sep 12, ",
          time: ["3:00 AM", "3:00 PM"],
        },
        {
          date: "Sep 19, ",
          time: ["3:00 AM", "3:00 PM"],
        },
      ],
    },

    {
      name: "ስቄ ልሙት አዲስ ፊልም ",
      hall: [
        {
          hallName: "Tayitu Hall",
          address: "https://maps.app.goo.gl/QVHCGmZZC4L7zjxi8",
        },
      ],
      showDate: [
        {
          date: "Oct 12, ",
          time: ["3:00 AM", "3:00 PM"],
        },
      ],
    },
    {
      name: "ድርድር አስቂኝ ድራማ ",
      hall: [
        {
          hallName: "Minelik Hall",
          address: "https://maps.app.goo.gl/k4UMXrwvi4Hr84v37",
        },
      ],
      showDate: [
        {
          date: "Sep 12, ",
          time: ["3:00 AM", "3:00 PM"],
        },
        {
          date: "Sep 15, ",
          time: ["3:00 AM", "3:00 PM"],
        },
      ],
    },
  ];
  // Filter movies based on search term and selected genre
  const filteredSchedules = schedules.filter((schedle) => {
    if (searchTerm && !schedle.name.toLowerCase().includes(searchTerm)) {
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
              <AddMovieSchedule />
            </div>
          </dialog>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white font-bold px-6 py-2 rounded-lg"
        >
          Add Schedule
        </button>
      </div>
      <ul className="px-10 rounded-xl border border-blue-500 overflow-x-auto h-[650px]">
        <li className="flex border-b-2  justify-start p-4 mb-5">
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">Name</div>
          <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">Place</div>
          <div className="w-1/4 font-bold text-2xl text-[#A1E8EE]">Dates</div>
        </li>
        {filteredSchedules.map((schedule, index) => (
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
              <p className="pt-2">{schedule.name}</p>
            </div>
            <div className="pt-2 w-3/12 pl-3 font-bold">
              {schedule.hall.map((hall) => (
                <Link href={`${hall.address}`} key={hall.hallName}>
                  {hall.hallName}
                </Link>
              ))}
            </div>
            <div className="pt-2 w-3/12 pl-3 font-bold">
              {schedule.showDate.map((date) => date.date)}
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

export default SchedulesPage;
