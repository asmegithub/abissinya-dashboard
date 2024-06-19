"use client";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineRateReview } from "react-icons/md";
import { IoTicket } from "react-icons/io5";

import SearchBar from "@/components/searchBar/searchBar";
import AddMovie from "@/components/addMovieModal/addMovie";
import axios from "axios";
import { toast } from "react-toastify";

interface Tickets {
  day: string;
  movieShowId: {
    hallId: Hall;
    movieId: Movie;
    showTime: ShowTime[];
  };
  order: Order;
  price:Number;
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
                 <p className=" px-2">{ticket.day}</p>
               </div>
               <div className="w-2/12  px-2 pl-3 font-bold">
                 {ticket.movieShowId
                   ? ticket.movieShowId?.showTime.join(",")
                   : " 2024-05-23 at 3:00,2:00"}{" "}
               </div>
               {/* <p className="w-1/12 px-2">{ticket.movieShowId?.hallId.name}</p> */}
               <p className="w-2/12  px-2">
                 {ticket.movieShowId
                   ? ticket.movieShowId?.movieId.title
                   : "Dummy Movie title"}
               </p>
               <p className="w-2/12  px-2">
                 {ticket.seats.booked
                   ? ticket.seats.booked.join(",")
                   : "1,23,5"}
               </p>
               <p className="w-2/12 px-2">
                 {ticket.order?.snacks
                   ? ticket.order?.snacks.join(",")
                   : "water,chips,donat"}
               </p>
               {/* <p className="w-1/12  px-2">{ticket.movieShowId?.hallId.name}</p> */}
               <p className="w-2/12 px-2">{ticket.userId.email}</p>
             </li>
           ))
         )}
       </ul>
     </div>
   );
};

export default ReviewsPage;
// 'use client'
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "tailwindcss/tailwind.css";

// interface Booking {
//   day: string;
//   day: string;
//   movieShowId: string;
//   createdAt: string;
//   hallId: string;
//   name: string;
//   _id: string;
// }

// interface Movie {
//   movieId: string;
//   averageRating: number;
//   country: string;
//   description: string;
//   duration: string;
//   genre: string[];
//   poster: string;
//   releaseDate: string;
//   reviewId: string[];
//   starsId: string[];
//   title: string;
//   __v: number;
//   _id: string;
// }

// interface ShowTime {
//   time: string;
//   status: string;
// }

// interface Order {
//   _id: string;
//   snacks: { snackId: string; quantity: number }[];
//   price: number;
// }

// interface Seat {
//   seatNumber: string;
//   _id: string;
// }

// interface User {
//   email: string;
//   _id: string;
// }

// interface BookingInfo {
//   day: string;
//   day: string;
//   movieShowId: string;
//   createdAt: string;
//   hallId: string;
//   name: string;
//   // _id: string;
//   movie: Movie;
//   selectedSeat?: string[]; // Make selectedSeat optional
//   showTime?: ShowTime[]; // Make showTime optional
//   order: Order;
//   seats: { booked: Seat[] };
//   status: string;
//   time: string;
//   userId: User;
//   price: number;
//   __v: number;
//   _id: string;
// }

// const fetchBookingData = async (): Promise<BookingInfo[]> => {
//   try {
//     const response = await axios.get<BookingInfo[]>(
//       "https://abissinia-backend.vercel.app/api/bookings"
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching booking data:", error);
//     throw error;
//   }
// };

// const BookingTable = () => {
//   const [bookingData, setBookingData] = useState<BookingInfo[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchBookingData();
//         console.log("Fetched booking data:", data);
//         setBookingData(data);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Booking Data</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Movie Title</th>
//               <th className="py-2 px-4 border-b">Selected Seats</th>
//               <th className="py-2 px-4 border-b">Time & Date</th>
//               <th className="py-2 px-4 border-b">Username (Email)</th>
//               <th className="py-2 px-4 border-b">Price</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookingData.map((booking) => (
//               <tr key={booking._id}>
//                 <td className="py-2 px-4 border-b">
//                   {booking.movie?.title ?? "N/A"}
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   {booking.selectedSeat
//                     ? booking.selectedSeat.join(", ")
//                     : "N/A"}
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   {booking.showTime
//                     ? booking.showTime
//                         .map((show) => `${show.time} (${booking.day})`)
//                         .join(", ")
//                     : "N/A"}
//                 </td>
//                 <td className="py-2 px-4 border-b">{booking.userId.email}</td>
//                 <td className="py-2 px-4 border-b">${booking.price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default BookingTable;
