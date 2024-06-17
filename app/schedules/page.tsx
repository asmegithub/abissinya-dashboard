"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdModeEdit, MdDeleteForever } from "react-icons/md";
import SearchBar from "@/components/searchBar/searchBar";
import AddMovieSchedule from "@/components/addSchedule/addScheduleModal";
import { toast } from "react-toastify";
import EditMovieSchedule from "@/components/editSchedule/editMovieSchedule";

type ShowDate = {
  date: string;
  time: string[];
};

type Schedule = {
  _id: string;
  name: string;
  hallName: string;
  showDate: ShowDate[];
};

const SchedulesPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [scheduleArry, setScheduleArry] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const getSchedules = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://abissinia-backend.vercel.app/api/movie-shows"
        );
        const data = await response.json();
        // Map the data to the Schedule format
        const schedules = data.map((movieShow: any) => ({
          _id: movieShow._id,
          name: movieShow.movieId.title,
          hallName: movieShow.hallId.name,
          showDate: movieShow.showTime.map((show: any) => ({
            date: show.day,
            time: show.time,
          })),
        }));

        setScheduleArry(schedules);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetching movie shows:", error);
        toast.error("Error in fetching movie shows.");
        setLoading(false);
      }
    };

    getSchedules();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await fetch(
        `https://abissinia-backend.vercel.app/api/movie-shows/${id}`,
        {
          method: "DELETE",
        }
      );
      setScheduleArry(scheduleArry.filter((schedule) => schedule._id !== id));
      toast.success("Schedule deleted successfully.");
    } catch (error) {
      console.error("Error deleting schedule:", error);
      toast.error("Error deleting schedule.");
    }
  };

  const handleEdit = (id: string) => {
    setCurrentEditId(id);
    setShowEditModal(true);
  };

  // Filter schedules based on search term
  const filteredSchedules = scheduleArry.filter((schedule) => {
    if (searchTerm && !schedule.name.toLowerCase().includes(searchTerm)) {
      return false; // Skip if movie name doesn't match search term
    }
    return true; // Include schedule in filtered list
  });

  return (
    <div className="flex flex-col text-white">
      <SearchBar name={"movie"} onChange={handleSearchChange} />
      <div className="flex justify-between mr-5 my-5">
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50 flex">
            <div className="relative p-8 bg-gray-700 w-full max-w-3xl m-auto flex-col flex rounded-lg">
              <AddMovieSchedule setShowModal={setShowAddModal} />
            </div>
          </div>
        )}
        {showEditModal && currentEditId && (
          <div className="fixed inset-0 z-50 overflow-auto bg-gray-700 bg-opacity-50 flex">
            <div className="relative p-8 bg-gray-700 w-full max-w-3xl m-auto flex-col flex rounded-lg">
              <EditMovieSchedule
                setShowModal={setShowEditModal}
                movieShowId={currentEditId}
              />
            </div>
          </div>
        )}
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white font-bold px-6 py-2 rounded-lg"
        >
          Add Schedule
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <ul className="px-10 rounded-xl border border-blue-500 overflow-x-auto h-[650px]">
          <li className="flex border-b-2 justify-start p-4 mb-5">
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
                <p>{schedule.hallName}</p>
              </div>
              <div className="pt-2 w-3/12 pl-3 font-bold">
                {schedule.showDate.map((date, index) => (
                  <div key={index}>
                    {date.date} {date.time.join(", ")}
                  </div>
                ))}
              </div>
              <div>
                <button
                  className="w-28 btn bg-blue-600 text-white"
                  onClick={() => handleEdit(schedule._id)}
                >
                  <MdModeEdit className="text-white text-2xl pt-1" />
                  Edit
                </button>
                <button
                  className="btn w-28 bg-red-600 text-white"
                  onClick={() => handleDelete(schedule._id)}
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

export default SchedulesPage;
