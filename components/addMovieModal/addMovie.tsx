import { ChangeEvent, FormEvent, useRef, useState } from "react";

const AddMovie = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [movieTitle, setMovieTitle] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [starsId, setStarsId] = useState<string[]>([]); // Correctly set to an array type
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [synopsis, setSynopsis] = useState<string>("");

  const [poster, setPoster] = useState<string>(""); // Added poster field

  const genres = ["Action", "Comedy", "Drama", "Fantasy", "Horror"];
  const countries = ["USA", "UK", "Canada", "Australia", "India"];

  const backgroundColor = "#1A1F33"; // The background color for both modal and fields
  const inputBorderColor = "#4E5460"; // A suitable border color for better contrast

  const formStyle = {
    backgroundColor: backgroundColor,
    color: "white",
  };

  const inputStyle = {
    backgroundColor: backgroundColor,
    color: "white",
    borderColor: inputBorderColor,
    borderWidth: "1px",
    outline: "none",
    borderRadius: "8px", // Rounded corners
    padding: "10px", // Internal padding
    width: "100%", // Equal width for both elements
  };
  const handleStarsIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Split the input value by comma, trim whitespace, and filter out empty strings
    const ids = e.target.value
      .split(",")
      .map((id) => id.trim())
      .filter((id) => id !== "");
    setStarsId(ids); // Update starsId state with the array of IDs
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const movieData = {
      title: movieTitle,
      genre,
      duration,
      country,
      starsId,
      releaseDate,
      synopsis,
    };

    try {
      const response = await fetch(
        "https://abissinia-backend.vercel.app/api/movies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(movieData),
        }
      );
      console.log("proccessed...");

      if (response.ok) {
        console.log("Movie created successfully!!");
        // Reset form after successful submission
        setMovieTitle("");
        setGenre("");
        setDuration("");
        setCountry("");
        setStarsId([]);
        setReleaseDate("");
        setSynopsis("");
        dialogRef.current?.close();
      } else {
        // Handle error
        console.error("Failed to create movie");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form
      method="dialog"
      className="p-4"
      onSubmit={handleSubmit}
      // style={formStyle}
    >
      <div className="space-y-4">
        <input
          type="text"
          className="grow"
          style={inputStyle}
          placeholder="Movie Title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />
        <select
          className="grow"
          style={inputStyle}
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="grow"
          style={inputStyle}
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <input
          type="text"
          className="grow"
          style={inputStyle}
          placeholder="Stars (comma-separated IDs)"
          value={starsId}
          onChange={handleStarsIdChange}
        />
        <select
          className="grow"
          style={inputStyle}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
        <input
          type="date"
          className="grow"
          style={inputStyle}
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <input
          type="text"
          className="grow"
          style={inputStyle}
          placeholder="Synopsis"
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
        />
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn bg-transparent border-2 text-red-700 border-red-700 rounded-lg px-6 mr-8"
          onClick={() => dialogRef.current?.close()}
        >
          Close
        </button>
        <button
          type="submit"
          className="btn border-2 bg-blue-700 rounded-lg px-4"
        >
          Create Movie
        </button>
      </div>
    </form>
  );
};

export default AddMovie;

// import { useRef, useState, FormEvent } from "react";

// const AddMovie: React.FC = () => {
//   const dialogRef = useRef<HTMLDialogElement | null>(null);
//   const [movieTitle, setMovieTitle] = useState<string>("");
//   const [genre, setGenre] = useState<string>("");
//   const [duration, setDuration] = useState<string>("");
//   const [country, setCountry] = useState<string>("");
//   const [starsId, setStarsId] = useState<string>("");
//   const [releaseDate, setReleaseDate] = useState<string>("");
//   const [synopsis, setSynopsis] = useState<string>("");

//   const genres = ["Action", "Comedy", "Drama", "Fantasy", "Horror"];
//   const countries = ["USA", "UK", "Canada", "Australia", "India"];

//   const backgroundColor = "#1A1F33"; // The background color for both modal and fields
//   const inputBorderColor = "#4E5460"; // A suitable border color for better contrast

//   const formStyle = {
//     backgroundColor: backgroundColor,
//     color: "white",
//   };

//   const inputStyle = {
//     backgroundColor: backgroundColor,
//     color: "white",
//     borderColor: inputBorderColor,
//     borderWidth: "1px",
//     outline: "none",
//     borderRadius: "8px", // Rounded corners
//     padding: "10px", // Internal padding
//     width: "100%", // Equal width for both elements
//   };

// const handleSubmit = async (e: FormEvent) => {
//   e.preventDefault();

//   const movieData = {
//     title: movieTitle,
//     genre,
//     duration,
//     country,
//     starsId,
//     releaseDate,
//     synopsis,
//   };

//   try {
//     const response = await fetch(
//       "https://abissinia-backend.vercel.app/api/movies",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(movieData),
//       }
//     );

//     if (response.ok) {
//       // Reset form after successful submission
//       setMovieTitle("");
//       setGenre("");
//       setDuration("");
//       setCountry("");
//       setStarsId("");
//       setReleaseDate("");
//       setSynopsis("");
//       dialogRef.current?.close();
//     } else {
//       // Handle error
//       console.error("Failed to create movie");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// };

//   return (
//     <dialog ref={dialogRef} className="dialog">
//       <form
//         onSubmit={handleSubmit}
//         method="dialog"
//         className="p-4"
//         style={formStyle}
//       >
//         <div className="space-y-4">
//           <input
//             type="text"
//             className="grow"
//             style={inputStyle}
//             placeholder="Movie Title"
//             value={movieTitle}
//             onChange={(e) => setMovieTitle(e.target.value)}
//           />
//           <select
//             className="grow"
//             style={inputStyle}
//             value={genre}
//             onChange={(e) => setGenre(e.target.value)}
//           >
//             <option value="">Select Genre</option>
//             {genres.map((genre) => (
//               <option key={genre} value={genre}>
//                 {genre}
//               </option>
//             ))}
//           </select>

//           <input
//             type="text"
//             className="grow"
//             style={inputStyle}
//             placeholder="Duration"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//           />

//           <input
//             type="text"
//             className="grow"
//             style={inputStyle}
//             placeholder="Stars"
//             value={starsId}
//             onChange={(e) => setStarsId(e.target.value)}
//           />
//           <select
//             className="grow"
//             style={inputStyle}
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//           >
//             <option value="">Select Country</option>
//             {countries.map((country) => (
//               <option key={country} value={country}>
//                 {country}
//               </option>
//             ))}
//           </select>
//           <input
//             type="date"
//             className="grow"
//             style={inputStyle}
//             value={releaseDate}
//             onChange={(e) => setReleaseDate(e.target.value)}
//           />
//           <input
//             type="text"
//             className="grow"
//             style={inputStyle}
//             placeholder="Synopsis"
//             value={synopsis}
//             onChange={(e) => setSynopsis(e.target.value)}
//           />
//         </div>
//         <div className="flex justify-between items-center mt-4">
//           <button
//             type="button"
//             className="btn bg-transparent border-2 text-red-700 border-red-700 rounded-lg px-6 mr-8"
//             onClick={() => dialogRef.current?.close()}
//           >
//             Close
//           </button>
//           <button
//             type="submit"
//             className="btn border-2 bg-blue-700 rounded-lg px-4"
//           >
//             Create Movie
//           </button>
//         </div>
//       </form>

//       <style jsx>{`
//         .dialog {
//           width: 80%;
//           max-width: 600px;
//           border: none;
//           border-radius: 8px;
//           padding: 20px;
//           position: fixed;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           background-color: ${backgroundColor};
//           color: white;
//           overflow: hidden;
//         }
//       `}</style>
//     </dialog>
//   );
// };

// export default AddMovie;

// import { useRef, useState } from "react";

// const AddMovie = () => {
//   const dialogRef = useRef<HTMLDialogElement | null>(null);
//   const [movieTitle, setMovieTitle] = useState("");
//   const [genre, setGenre] = useState("");
//   const [duration, setDuration] = useState("");
//   const [country, setCountry] = useState("");
//   const [starsId, setStarsId] = useState("");
//   const [releaseDate, setReleaseDate] = useState("");
//   const [synopsis, setSynopsis] = useState("");

//   const genres = ["Action", "Comedy", "Drama", "Fantasy", "Horror"];
//   const countries = ["USA", "UK", "Canada", "Australia", "India"];

//   const backgroundColor = "#1A1F33";
//   const inputBorderColor = "#4E5460";

//   const formStyle = {
//     backgroundColor: backgroundColor,
//     color: "white",
//   };

//   const inputStyle = {
//     backgroundColor: backgroundColor,
//     color: "white",
//     borderColor: inputBorderColor,
//     borderWidth: "1px",
//     outline: "none",
//     borderRadius: "8px",
//     padding: "10px",
//     width: "100%",
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     const newMovie = {
//       title: movieTitle,
//       genre: genre.split(",").map((g) => g.trim()),
//       duration,
//       country,
//       starsId: starsId.split(",").map((id) => id.trim()),
//       releaseDate,
//       synopsis,
//     };

//     try {
//       const response = await fetch(
//         "https://abissinia-backend.vercel.app/api/movies",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newMovie),
//         }
//       );

//       if (response.ok) {
//         const addedMovie = await response.json();
//         console.log("Movie added successfully:", addedMovie);
//         // Optionally, you can clear the form fields here
//         setMovieTitle("");
//         setGenre("");
//         setDuration("");
//         setCountry("");
//         setStarsId("");
//         setReleaseDate("");
//         setSynopsis("");
//         dialogRef.current?.close(); // Close the modal
//       } else {
//         console.error("Failed to add the movie");
//       }
//     } catch (error) {
//       console.error("Error adding movie:", error);
//     }
//   };

//   return (
//     <form
//       method="dialog"
//       className="p-4"
//       style={formStyle}
//       onSubmit={handleSubmit}
//     >
//       <div className="space-y-4">
//         <input
//           type="text"
//           className="grow"
//           style={inputStyle}
//           placeholder="Movie Title"
//           value={movieTitle}
//           onChange={(e) => setMovieTitle(e.target.value)}
//           required
//         />
//         <select
//           className="grow"
//           style={inputStyle}
//           value={genre}
//           onChange={(e) => setGenre(e.target.value)}
//           required
//         >
//           <option value="">Select Genre</option>
//           {genres.map((genre) => (
//             <option key={genre} value={genre}>
//               {genre}
//             </option>
//           ))}
//         </select>

//         <input
//           type="text"
//           className="grow"
//           style={inputStyle}
//           placeholder="Duration"
//           value={duration}
//           onChange={(e) => setDuration(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           className="grow"
//           style={inputStyle}
//           placeholder="Stars (comma separated)"
//           value={starsId}
//           onChange={(e) => setStarsId(e.target.value)}
//           required
//         />
//         <select
//           className="grow"
//           style={inputStyle}
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
//           required
//         >
//           <option value="">Select Country</option>
//           {countries.map((country) => (
//             <option key={country} value={country}>
//               {country}
//             </option>
//           ))}
//         </select>
//         <input
//           type="date"
//           className="grow"
//           style={inputStyle}
//           value={releaseDate}
//           onChange={(e) => setReleaseDate(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           className="grow"
//           style={inputStyle}
//           placeholder="Synopsis"
//           value={synopsis}
//           onChange={(e) => setSynopsis(e.target.value)}
//           required
//         />
//       </div>
//       <div className="flex justify-between items-center mt-4">
//         <button
//           type="button"
//           className="btn bg-transparent border-2 text-red-700 border-red-700 rounded-lg px-6 mr-8"
//           onClick={() => dialogRef.current?.close()}
//         >
//           Close
//         </button>
//         <button
//           type="submit"
//           className="btn border-2 bg-blue-700 rounded-lg px-4"
//         >
//           Create Movie
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddMovie;

// import { useRef, useState } from "react";

// const AddMovie = () => {
//   const dialogRef = useRef<HTMLDialogElement | null>(null);
//   const [movieTitle, setMovieTitle] = useState("");
//   const [genre, setGenre] = useState("");
//   const [duration, setDuration] = useState("");
//   const [country, setCountry] = useState("");
//   const [starsId, setStarsId] = useState("");
//   const [releaseDate, setReleaseDate] = useState("");
//   const [synopsis, setSynopsis] = useState("");
//   const [error, setError] = useState("");

//   const genres = ["Action", "Comedy", "Drama", "Fantasy", "Horror"];
//   const countries = ["USA", "UK", "Canada", "Australia", "India"];

//   const backgroundColor = "#1A1F33";
//   const inputBorderColor = "#4E5460";

//   const formStyle = {
//     backgroundColor: backgroundColor,
//     color: "white",
//   };

//   const inputStyle = {
//     backgroundColor: backgroundColor,
//     color: "white",
//     borderColor: inputBorderColor,
//     borderWidth: "1px",
//     outline: "none",
//     borderRadius: "8px",
//     padding: "10px",
//     width: "100%",
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     setError(""); // Clear any previous errors

//     const newMovie = {
//       title: movieTitle,
//       genre: genre.split(",").map((g) => g.trim()),
//       duration,
//       country,
//       starsId: starsId.split(",").map((id) => id.trim()),
//       releaseDate,
//       synopsis,
//     };

//     try {
//       console.log("Sending request to server with payload:", newMovie); // Log request payload
//       const response = await fetch(
//         "https://abissinia-backend.vercel.app/api/movies",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newMovie),
//         }
//       );

//       if (response.ok) {
//         const addedMovie = await response.json();
//         console.log("Movie added successfully:", addedMovie);
//         setMovieTitle("");
//         setGenre("");
//         setDuration("");
//         setCountry("");
//         setStarsId("");
//         setReleaseDate("");
//         setSynopsis("");
//         dialogRef.current?.close(); // Close the modal
//       } else {
//         const errorData = await response.json();
//         setError(`Failed to add the movie: ${errorData.message}`);
//         console.error("Failed to add the movie:", errorData);
//       }
//     } catch (error) {
//       setError("Error adding movie. Please try again later.");
//       console.error("Error adding movie:", error);
//     }
//   };

//   return (
//     <dialog ref={dialogRef}>
//       <form
//         method="dialog"
//         className="p-4"
//         // style={formStyle}
//         onSubmit={handleSubmit}
//       >
//         <div className="space-y-4">
//           <input
//             type="text"
//             className="grow"
//             style={inputStyle}
//             placeholder="Movie Title"
//             value={movieTitle}
//             onChange={(e) => setMovieTitle(e.target.value)}
//             required
//           />
//           <select
//             className="grow"
//             style={inputStyle}
//             value={genre}
//             onChange={(e) => setGenre(e.target.value)}
//             required
//           >
//             <option value="">Select Genre</option>
//             {genres.map((genre) => (
//               <option key={genre} value={genre}>
//                 {genre}
//               </option>
//             ))}
//           </select>

//           <input
//             type="text"
//             className="grow"
//             style={inputStyle}
//             placeholder="Duration"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             required
//           />

//           <input
//             type="text"
//             className="grow"
//             style={inputStyle}
//             placeholder="Stars (comma separated)"
//             value={starsId}
//             onChange={(e) => setStarsId(e.target.value)}
//             required
//           />
//           <select
//             className="grow"
//             style={inputStyle}
//             value={country}
//             onChange={(e) => setCountry(e.target.value)}
//             required
//           >
//             <option value="">Select Country</option>
//             {countries.map((country) => (
//               <option key={country} value={country}>
//                 {country}
//               </option>
//             ))}
//           </select>
//           <input
//             type="date"
//             className="grow"
//             style={inputStyle}
//             value={releaseDate}
//             onChange={(e) => setReleaseDate(e.target.value)}
//             required
//           />
//           <input
//             type="text"
//             className="grow"
//             style={inputStyle}
//             placeholder="Synopsis"
//             value={synopsis}
//             onChange={(e) => setSynopsis(e.target.value)}
//             required
//           />
//         </div>
//         {error && <div className="text-red-500 mt-2">{error}</div>}
//         <div className="flex justify-between items-center mt-4">
//           <button
//             type="button"
//             className="btn bg-transparent border-2 text-red-700 border-red-700 rounded-lg px-6 mr-8"
//             onClick={() => dialogRef.current?.close()}
//           >
//             Close
//           </button>
//           <button
//             type="submit"
//             className="btn border-2 bg-blue-700 rounded-lg px-4"
//           >
//             Create Movie
//           </button>
//         </div>
//       </form>
//     </dialog>
//   );
// };

// export default AddMovie;
