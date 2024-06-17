"use client";

import { FaUsers } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { SlCalender } from "react-icons/sl";
import { TfiMoney } from "react-icons/tfi";
import { IoTicketSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [tickets, setTicets] = useState([]);
  const [income, setIncome] = useState(0);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://abissinia-backend.vercel.app/api/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error in fetching users:", error);
      }
    };
    const getMovies = async () => {
      try {
        const response = await axios.get(
          "https://abissinia-backend.vercel.app/api/movies"
        );
        console.log(response);
        setMovies(response.data.movies);
      } catch (error) {
        console.error("Error in fetching users:", error);
      }
    };
    const getSchedules = async () => {
      try {
        const response = await axios.get(
          "https://abissinia-backend.vercel.app/api/movies/scheduled"
        );
        setSchedules(response.data.movies);
      } catch (error) {
        console.error("Error in fetching users:", error);
      }
    };
    const getTickets = async () => {
      try {
        const response = await axios.get(
          "https://abissinia-backend.vercel.app/api/bookings"
        );
        setTicets(response.data);
        console.log("ticket=", response.data);
      } catch (error) {
        console.log("error in fetching tickets...");
      }
    };
    const calculatePrice = () => {
      let price = 0;
      const totalPrice = tickets.map((ticket: any) => (price += ticket.price));
      setIncome(price);
    };
    getUsers();
    getMovies();
    getSchedules();
    getTickets();
    calculatePrice();
  }, [tickets]);
  return (
    <div className="px-64 py-28 flex flex-col gap-20">
      <div className="flex gap-64">
        <div className="">
          <FaUsers className="text-8xl text-blue-700" />
          <p className="text-3xl">{users.length} Users</p>
        </div>
        <div className="">
          <MdLocalMovies className="text-8xl text-blue-700" />
          <p className="text-3xl">{movies.length} Movies</p>
        </div>
        <div className="">
          <SlCalender className="text-8xl text-blue-700" />
          <p className="text-3xl">{schedules.length} Schedules</p>
        </div>
      </div>
      <div className="flex gap-64 mx-16">
        <div className="">
          <IoTicketSharp className="text-8xl text-blue-700" />
          <p className="text-3xl">{tickets.length} tickets sold</p>
        </div>
        <div className="">
          <TfiMoney className="text-8xl text-blue-700" />
          <p className="text-3xl">{income} ETB total income</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
