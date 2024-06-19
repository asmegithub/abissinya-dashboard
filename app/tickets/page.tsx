"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineRateReview } from "react-icons/md";
import { IoTicket } from "react-icons/io5";

import SearchBar from "@/components/searchBar/searchBar";
import AddMovie from "@/components/addMovieModal/addMovie";
import axios from "axios";
import { toast } from "react-toastify";

interface Tickets {
  bookingDate:string;
  day: string;
  movieShowId: {
    hallId: Hall;
    movieId: Movie;
    showTime: ShowTime[];
  };
  order: Order;
  price:number;
  seats:{
    booked:Seat[];
  };
  userId:User;
  _id: string;
}
interface Seat {
  seatNumber: string;
}
type Hall={
  _id:string;
  name:string;
}
interface Movie {
  poster: string;
  title: string;
  _id: string;
}

interface ShowTime {
  day: string;
  time: string[];
}
type Snack={
  snackId:{
    name:string;    
  };
}
interface Order {
  _id: string;
  snacks: Snack[];
  price: number;
}



interface User {
  email: string;
  _id: string;
}





const ReviewsPage = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [tickets, setTickets] = useState<Tickets[]>([]);

  useEffect(() => {

    const fetchBookingData = async (): Promise<Tickets[]> => {
      try {
        const response = await axios.get<Tickets[]>(
          "https://abissinia-backend.vercel.app/api/bookings"
        );
        const bookingData = response.data;
        console.log("Tickets=:", bookingData);
        setTickets(bookingData);
        return bookingData;
      } catch (error) {
        console.error("Error fetching booking data:", error);
        throw error; // Rethrow the error if needed for further handling
      }
    };

    // Usage
    fetchBookingData();

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
           <div className="w-2/12  px-2 font-bold text-2xl text-[#A1E8EE]">
             Booking Date
           </div>
           <div className="w-2/12  px-2 font-bold text-2xl text-[#A1E8EE]">
             Show Time
           </div>
           <div className="w-2/12  px-2 font-bold text-2xl text-[#A1E8EE]">
             Movie title
           </div>
           <div className="w-2/12 px-2 font-bold text-2xl text-[#A1E8EE]">
             Seats
           </div>
           <div className="w-2/12 px-2 font-bold text-2xl text-[#A1E8EE]">
             Order
           </div>
           <div className="w-2/12  px-2 font-bold text-2xl text-[#A1E8EE]">
             User
           </div>
           <div className="w-1/12  px-2 font-bold text-2xl text-[#A1E8EE]">
             Price
           </div>
         </li>
         {tickets.length == 0 ? (
           <p className="text-2xl px-96 py-40">Loading...</p>
         ) : (
           tickets.map((ticket, index) => (
             <li key={index} className="flex justify-start pb-5">
               <div className="flex w-2/12 gap-2">
                 <div className="relative w-10 h-10 overflow-hidden rounded-full">
                   <IoTicket className="text-blue-500 text-3xl" />
                 </div>
                 <p className=" px-2">{ticket.bookingDate}</p>
               </div>
               <div className="w-2/12  px-2 pl-3 font-bold">{ticket.day}</div>
               {/* <p className="w-1/12 px-2">{ticket.movieShowId?.hallId.name}</p> */}
               <p className="w-2/12  px-2">
                 {ticket.movieShowId
                   ? ticket.movieShowId?.movieId.title
                   : "Dummy Movie title"}
               </p>
               <p className="w-2/12  px-2">
                 {ticket.seats.booked.map((seat) => {
                   return <span key={seat.seatNumber}>{seat.seatNumber},</span>;
                 })}
               </p>
               <p className="w-2/12 px-2">
                 {ticket.order.snacks.map((snack) => {
                   return (
                     <span key={snack.snackId.name}>{snack.snackId.name},</span>
                   );
                 })}
               </p>
               <p className="w-2/12 px-2">{ticket.userId.email}</p>
               <p className="w-2/12 px-2">{ticket.price}</p>
             </li>
           ))
         )}
       </ul>
     </div>
   );
};

export default ReviewsPage;