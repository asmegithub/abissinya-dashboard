// import { storage } from "@/app/firebase/firebaseConfig";
// import axios from "axios";
// import {
//   getDownloadURL,
//   ref,
//   uploadBytesResumable,
//   UploadTaskSnapshot,
// } from "firebase/storage";

// import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
// import { toast } from "react-toastify";
// import Select from "react-select";

// interface FormData {
//   title: string;
//   durationHours: string;
//   durationMinutes: string;
//   director: string;
//   genres: string[];
//   releaseDate: string;
//   country: string;
//   poster: File | null;
//   posterURL: string;
//   description: string;
//   stars: { value: string; label: string }[];
// }

// const AddMovie = ({ setShowModal }: { setShowModal: any }) => {
//   const dialogRef = useRef<HTMLDialogElement | null>(null);
//   const [movieTitle, setMovieTitle] = useState<string>("");
//   const [genre, setGenre] = useState<string>("");
//   const [duration, setDuration] = useState<string>("");
//   const [country, setCountry] = useState<string>("");
//   const [starsId, setStarsId] = useState<string[]>([]); // Correctly set to an array type
//   const [releaseDate, setReleaseDate] = useState<string>("");
//   const [synopsis, setSynopsis] = useState<string>("");

//   const [poster, setPoster] = useState<string>(""); // Added poster field

//   const [starsOptions, setStarsOptions] = useState<
//     { value: string; label: string }[]
//   >([]);
//   const [formData, setFormData] = useState<FormData>({
//     title: "",
//     director: "",
//     genres: [],
//     durationHours: "",
//     durationMinutes: "",
//     releaseDate: "",
//     country: "",
//     poster: null,
//     posterURL: "",
//     description: "",
//     stars: [],
//   });
//   const genres = ["Action", "Comedy", "Drama", "Fantasy", "Horror"];
//   const countries = ["USA", "UK", "Canada", "Australia", "India"];

//   const backgroundColor = "#1A1F33";
//   const inputBorderColor = "#4E5460";

//   const formStyle = {
//     backgroundColor: backgroundColor,
//     color: "white",
//   };

//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Fetch stars from the server
//     const fetchStars = async () => {
//       try {
//         const response = await axios.get(
//           "https://abissinia-backend.vercel.app/api/stars"
//         );
//         const starsData = response.data.map(
//           (star: { _id: string; name: string }) => ({
//             value: star._id,
//             label: star.name,
//           })
//         );
//         setStarsOptions(starsData);
//       } catch (error) {
//         console.error("Failed to fetch stars", error);
//       }
//     };

//     fetchStars();
//   }, []);

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleMultiSelectChange = (selectedOptions: any) => {
//     setFormData((prevData) => ({ ...prevData, stars: selectedOptions }));
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files as FileList | null;
//     if (files && files.length > 0) {
//       const file = files[0];
//       setFormData((prevData) => ({ ...prevData, poster: file }));

//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData((prevData) => ({
//           ...prevData,
//           posterURL: reader.result as string,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUpload = (): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       if (formData.poster) {
//         const storageRef = ref(storage, `posters/${formData.poster.name}`);
//         const uploadTask = uploadBytesResumable(storageRef, formData.poster);
//         uploadTask.on(
//           "state_changed",
//           (snapshot: UploadTaskSnapshot) => {
//             const progress =
//               (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//             setLoading(true);
//           },
//           (error) => {
//             setLoading(false);
//             toast.error("Image upload failed. Please try again.");
//             reject(error);
//           },
//           async () => {
//             const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//             setLoading(false);
//             resolve(downloadURL);
//           }
//         );
//       } else {
//         reject(new Error("No file selected"));
//       }
//     });
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const posterURL = await handleUpload();
//       const formDataWithPosterURL = { ...formData, posterURL };

//       const durationInMinutes =
//         parseInt(formDataWithPosterURL.durationHours) * 60 +
//         parseInt(formDataWithPosterURL.durationMinutes);

//       const requestBody = {
//         title: formDataWithPosterURL.title,
//         duration: durationInMinutes,
//         releaseDate: new Date(formDataWithPosterURL.releaseDate),
//         poster: formDataWithPosterURL.posterURL,
//         description: formDataWithPosterURL.description,
//         director: formDataWithPosterURL.director,
//         genres: formDataWithPosterURL.genres,
//         country: formDataWithPosterURL.country,
//         stars: formDataWithPosterURL.stars.map((star) => star.value),
//       };

//       const response = await axios.post(
//         `https://abissinia-backend.vercel.app/api/movies`,
//         requestBody
//       );

//       toast.success("Form submitted successfully!");

//       // Reset form data to initial values
//       setFormData({
//         title: "",
//         durationHours: "",
//         durationMinutes: "",
//         releaseDate: "",
//         director: "",
//         genres: [],
//         country: "",
//         poster: null,
//         posterURL: "",
//         description: "",
//         stars: [],
//       });
//     } catch (error) {
//       toast.error("Form submission failed. Please try again.");
//       console.error(error);
//     }
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
//   const handleStarsIdChange = (e: ChangeEvent<HTMLInputElement>) => {
//     // Split the input value by comma, trim whitespace, and filter out empty strings
//     const ids = e.target.value
//       .split(",")
//       .map((id) => id.trim())
//       .filter((id) => id !== "");
//     setStarsId(ids); // Update starsId state with the array of IDs
//   };

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();

//     const movieData = {
//       title: movieTitle,
//       genre,
//       duration,
//       country,
//       starsId,
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
//           body: JSON.stringify(movieData),
//         }
//       );
//       console.log("proccessed...");

//       if (response.ok) {
//         console.log("Movie created successfully!!");
//         // Reset form after successful submission
//         setMovieTitle("");
//         setGenre("");
//         setDuration("");
//         setCountry("");
//         setStarsId([]);
//         setReleaseDate("");
//         setSynopsis("");
//         dialogRef.current?.close();
//       } else {
//         // Handle error
//         console.error("Failed to create movie");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
// <<<<<<< HEAD
//     <form
//       method="dialog"
//       className="p-4"
//       onSubmit={handleSubmit}
//       // style={formStyle}
//     >
//       <div className="space-y-4">
//         <input
//           type="text"
//           className="grow"
//           style={inputStyle}
//           placeholder="Movie Title"
//           value={movieTitle}
//           onChange={(e) => setMovieTitle(e.target.value)}
//         />
//         <select
//           className="grow"
//           style={inputStyle}
//           value={genre}
//           onChange={(e) => setGenre(e.target.value)}
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
//         />

//         <input
//           type="text"
//           className="grow"
//           style={inputStyle}
//           placeholder="Stars (comma-separated IDs)"
//           value={starsId}
//           onChange={handleStarsIdChange}
//         />
//         <select
//           className="grow"
//           style={inputStyle}
//           value={country}
//           onChange={(e) => setCountry(e.target.value)}
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
//         />
//         <input
//           type="text"
//           className="grow"
//           style={inputStyle}
//           placeholder="Synopsis"
//           value={synopsis}
//           onChange={(e) => setSynopsis(e.target.value)}
//         />
//       </div>
// =======
//     <div className="p-4 overflow-y-hidden">
//       <form onSubmit={handleSubmit} className="p-4">
//         <div className="space-y-4">
//           <input
//             type="text"
//             className="grow"
//             style={inputStyle}
//             placeholder="Movie Title"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="text"
//             className="grow"
//             style={inputStyle}
//             placeholder="Director"
//             name="director"
//             value={formData.director}
//             onChange={handleChange}
//             required
//           />
//           <Select
//             isMulti
//             name="genres"
//             options={genres.map((genre) => ({ value: genre, label: genre }))}
//             className="basic-multi-select"
//             classNamePrefix="select"
//             onChange={(selectedOptions) =>
//               setFormData((prevData) => ({
//                 ...prevData,
//                 genres: selectedOptions.map((option) => option.value),
//               }))
//             }
//             placeholder="Select Genre(s)"
//             value={formData.genres.map((genre) => ({
//               value: genre,
//               label: genre,
//             }))}
//             styles={{
//               control: (provided) => ({
//                 ...provided,
//                 backgroundColor: "gray",
//                 borderColor: inputBorderColor,
//                 borderWidth: "1px",
//                 outline: "none",
//                 borderRadius: "8px",
//                 padding: "10px",
//                 width: "100%",
//                 color: "white",
//               }),
//               multiValue: (provided) => ({
//                 ...provided,
//                 backgroundColor: "#4E5460",
//               }),
//               multiValueLabel: (provided) => ({
//                 ...provided,
//                 color: "white",
//               }),
//               placeholder: (provided) => ({
//                 ...provided,
//                 color: "white",
//               }),
//               singleValue: (provided) => ({
//                 ...provided,
//                 color: "white",
//               }),
//               menu: (provided) => ({
//                 ...provided,
//                 backgroundColor: "gray",
//                 color: "white",
//               }),
//               option: (provided, state) => ({
//                 ...provided,
//                 backgroundColor: state.isSelected ? "#4E5460" : "gray",
//                 color: "white",
//               }),
//             }}
//           />
//           <input
//             type="number"
//             className="grow"
//             style={inputStyle}
//             placeholder="Duration Hours"
//             name="durationHours"
//             value={formData.durationHours}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="number"
//             className="grow"
//             style={inputStyle}
//             placeholder="Duration Minutes"
//             name="durationMinutes"
//             value={formData.durationMinutes}
//             onChange={handleChange}
//             required
//           />
//           <Select
//             isMulti
//             name="stars"
//             options={starsOptions}
//             className="basic-multi-select"
//             classNamePrefix="select"
//             onChange={handleMultiSelectChange}
//             placeholder="Select Stars"
//             value={formData.stars}
//             styles={{
//               control: (provided) => ({
//                 ...provided,
//                 backgroundColor: "gray",
//                 borderColor: inputBorderColor,
//                 borderWidth: "1px",
//                 outline: "none",
//                 borderRadius: "8px",
//                 padding: "10px",
//                 width: "100%",
//                 color: "white",
//               }),
//               multiValue: (provided) => ({
//                 ...provided,
//                 backgroundColor: "#4E5460",
//               }),
//               multiValueLabel: (provided) => ({
//                 ...provided,
//                 color: "white",
//               }),
//               placeholder: (provided) => ({
//                 ...provided,
//                 color: "white",
//               }),
//               singleValue: (provided) => ({
//                 ...provided,
//                 color: "white",
//               }),
//               menu: (provided) => ({
//                 ...provided,
//                 backgroundColor: "gray",
//                 color: "white",
//               }),
//               option: (provided, state) => ({
//                 ...provided,
//                 backgroundColor: state.isSelected ? "#4E5460" : "gray",
//                 color: "white",
//               }),
//             }}
//           />
//           <select
//             className="grow"
//             style={inputStyle}
//             name="country"
//             value={formData.country}
//             onChange={handleChange}
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
//             name="releaseDate"
//             value={formData.releaseDate}
//             onChange={handleChange}
//             required
//           />
//           <textarea
//             className="grow"
//             style={inputStyle}
//             placeholder="Description"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="file"
//             accept="image/*"
//             className="grow"
//             style={inputStyle}
//             onChange={handleFileChange}
//             required
//           />
//         </div>
//         <div className="flex justify-between items-center mt-4">
//           <button
//             className="btn border-2 bg-blue-700 rounded-lg px-4"
//             type="submit"
//           >
//             {loading ? "Uploading..." : "Create Movie"}
//           </button>
//         </div>
//       </form>
//       <div className="flex justify-between items-center mt-4">
//         <button
//           className="button btn bg-transparent border-2 text-red-700 border-red-700 rounded-lg px-6 mr-8"
//           onClick={() => setShowModal(false)}
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
//     </div>
//   );
// };

// export default AddMovie;

// // import { useRef, useState, FormEvent } from "react";

// // const AddMovie: React.FC = () => {
// //   const dialogRef = useRef<HTMLDialogElement | null>(null);
// //   const [movieTitle, setMovieTitle] = useState<string>("");
// //   const [genre, setGenre] = useState<string>("");
// //   const [duration, setDuration] = useState<string>("");
// //   const [country, setCountry] = useState<string>("");
// //   const [starsId, setStarsId] = useState<string>("");
// //   const [releaseDate, setReleaseDate] = useState<string>("");
// //   const [synopsis, setSynopsis] = useState<string>("");

// //   const genres = ["Action", "Comedy", "Drama", "Fantasy", "Horror"];
// //   const countries = ["USA", "UK", "Canada", "Australia", "India"];

// //   const backgroundColor = "#1A1F33"; // The background color for both modal and fields
// //   const inputBorderColor = "#4E5460"; // A suitable border color for better contrast

// //   const formStyle = {
// //     backgroundColor: backgroundColor,
// //     color: "white",
// //   };

// //   const inputStyle = {
// //     backgroundColor: backgroundColor,
// //     color: "white",
// //     borderColor: inputBorderColor,
// //     borderWidth: "1px",
// //     outline: "none",
// //     borderRadius: "8px", // Rounded corners
// //     padding: "10px", // Internal padding
// //     width: "100%", // Equal width for both elements
// //   };

// // const handleSubmit = async (e: FormEvent) => {
// //   e.preventDefault();

// //   const movieData = {
// //     title: movieTitle,
// //     genre,
// //     duration,
// //     country,
// //     starsId,
// //     releaseDate,
// //     synopsis,
// //   };

// //   try {
// //     const response = await fetch(
// //       "https://abissinia-backend.vercel.app/api/movies",
// //       {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify(movieData),
// //       }
// //     );

// //     if (response.ok) {
// //       // Reset form after successful submission
// //       setMovieTitle("");
// //       setGenre("");
// //       setDuration("");
// //       setCountry("");
// //       setStarsId("");
// //       setReleaseDate("");
// //       setSynopsis("");
// //       dialogRef.current?.close();
// //     } else {
// //       // Handle error
// //       console.error("Failed to create movie");
// //     }
// //   } catch (error) {
// //     console.error("Error:", error);
// //   }
// // };

// //   return (
// //     <dialog ref={dialogRef} className="dialog">
// //       <form
// //         onSubmit={handleSubmit}
// //         method="dialog"
// //         className="p-4"
// //         style={formStyle}
// //       >
// //         <div className="space-y-4">
// //           <input
// //             type="text"
// //             className="grow"
// //             style={inputStyle}
// //             placeholder="Movie Title"
// //             value={movieTitle}
// //             onChange={(e) => setMovieTitle(e.target.value)}
// //           />
// //           <select
// //             className="grow"
// //             style={inputStyle}
// //             value={genre}
// //             onChange={(e) => setGenre(e.target.value)}
// //           >
// //             <option value="">Select Genre</option>
// //             {genres.map((genre) => (
// //               <option key={genre} value={genre}>
// //                 {genre}
// //               </option>
// //             ))}
// //           </select>

// //           <input
// //             type="text"
// //             className="grow"
// //             style={inputStyle}
// //             placeholder="Duration"
// //             value={duration}
// //             onChange={(e) => setDuration(e.target.value)}
// //           />

// //           <input
// //             type="text"
// //             className="grow"
// //             style={inputStyle}
// //             placeholder="Stars"
// //             value={starsId}
// //             onChange={(e) => setStarsId(e.target.value)}
// //           />
// //           <select
// //             className="grow"
// //             style={inputStyle}
// //             value={country}
// //             onChange={(e) => setCountry(e.target.value)}
// //           >
// //             <option value="">Select Country</option>
// //             {countries.map((country) => (
// //               <option key={country} value={country}>
// //                 {country}
// //               </option>
// //             ))}
// //           </select>
// //           <input
// //             type="date"
// //             className="grow"
// //             style={inputStyle}
// //             value={releaseDate}
// //             onChange={(e) => setReleaseDate(e.target.value)}
// //           />
// //           <input
// //             type="text"
// //             className="grow"
// //             style={inputStyle}
// //             placeholder="Synopsis"
// //             value={synopsis}
// //             onChange={(e) => setSynopsis(e.target.value)}
// //           />
// //         </div>
// //         <div className="flex justify-between items-center mt-4">
// //           <button
// //             type="button"
// //             className="btn bg-transparent border-2 text-red-700 border-red-700 rounded-lg px-6 mr-8"
// //             onClick={() => dialogRef.current?.close()}
// //           >
// //             Close
// //           </button>
// //           <button
// //             type="submit"
// //             className="btn border-2 bg-blue-700 rounded-lg px-4"
// //           >
// //             Create Movie
// //           </button>
// //         </div>
// //       </form>

// //       <style jsx>{`
// //         .dialog {
// //           width: 80%;
// //           max-width: 600px;
// //           border: none;
// //           border-radius: 8px;
// //           padding: 20px;
// //           position: fixed;
// //           top: 50%;
// //           left: 50%;
// //           transform: translate(-50%, -50%);
// //           background-color: ${backgroundColor};
// //           color: white;
// //           overflow: hidden;
// //         }
// //       `}</style>
// //     </dialog>
// //   );
// // };

// // export default AddMovie;

// // import { useRef, useState } from "react";

// // const AddMovie = () => {
// //   const dialogRef = useRef<HTMLDialogElement | null>(null);
// //   const [movieTitle, setMovieTitle] = useState("");
// //   const [genre, setGenre] = useState("");
// //   const [duration, setDuration] = useState("");
// //   const [country, setCountry] = useState("");
// //   const [starsId, setStarsId] = useState("");
// //   const [releaseDate, setReleaseDate] = useState("");
// //   const [synopsis, setSynopsis] = useState("");

// //   const genres = ["Action", "Comedy", "Drama", "Fantasy", "Horror"];
// //   const countries = ["USA", "UK", "Canada", "Australia", "India"];

// //   const backgroundColor = "#1A1F33";
// //   const inputBorderColor = "#4E5460";

// //   const formStyle = {
// //     backgroundColor: backgroundColor,
// //     color: "white",
// //   };

// //   const inputStyle = {
// //     backgroundColor: backgroundColor,
// //     color: "white",
// //     borderColor: inputBorderColor,
// //     borderWidth: "1px",
// //     outline: "none",
// //     borderRadius: "8px",
// //     padding: "10px",
// //     width: "100%",
// //   };

// //   const handleSubmit = async (event: React.FormEvent) => {
// //     event.preventDefault();

// //     const newMovie = {
// //       title: movieTitle,
// //       genre: genre.split(",").map((g) => g.trim()),
// //       duration,
// //       country,
// //       starsId: starsId.split(",").map((id) => id.trim()),
// //       releaseDate,
// //       synopsis,
// //     };

// //     try {
// //       const response = await fetch(
// //         "https://abissinia-backend.vercel.app/api/movies",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(newMovie),
// //         }
// //       );

// //       if (response.ok) {
// //         const addedMovie = await response.json();
// //         console.log("Movie added successfully:", addedMovie);
// //         // Optionally, you can clear the form fields here
// //         setMovieTitle("");
// //         setGenre("");
// //         setDuration("");
// //         setCountry("");
// //         setStarsId("");
// //         setReleaseDate("");
// //         setSynopsis("");
// //         dialogRef.current?.close(); // Close the modal
// //       } else {
// //         console.error("Failed to add the movie");
// //       }
// //     } catch (error) {
// //       console.error("Error adding movie:", error);
// //     }
// //   };

// //   return (
// //     <form
// //       method="dialog"
// //       className="p-4"
// //       style={formStyle}
// //       onSubmit={handleSubmit}
// //     >
// //       <div className="space-y-4">
// //         <input
// //           type="text"
// //           className="grow"
// //           style={inputStyle}
// //           placeholder="Movie Title"
// //           value={movieTitle}
// //           onChange={(e) => setMovieTitle(e.target.value)}
// //           required
// //         />
// //         <select
// //           className="grow"
// //           style={inputStyle}
// //           value={genre}
// //           onChange={(e) => setGenre(e.target.value)}
// //           required
// //         >
// //           <option value="">Select Genre</option>
// //           {genres.map((genre) => (
// //             <option key={genre} value={genre}>
// //               {genre}
// //             </option>
// //           ))}
// //         </select>

// //         <input
// //           type="text"
// //           className="grow"
// //           style={inputStyle}
// //           placeholder="Duration"
// //           value={duration}
// //           onChange={(e) => setDuration(e.target.value)}
// //           required
// //         />

// //         <input
// //           type="text"
// //           className="grow"
// //           style={inputStyle}
// //           placeholder="Stars (comma separated)"
// //           value={starsId}
// //           onChange={(e) => setStarsId(e.target.value)}
// //           required
// //         />
// //         <select
// //           className="grow"
// //           style={inputStyle}
// //           value={country}
// //           onChange={(e) => setCountry(e.target.value)}
// //           required
// //         >
// //           <option value="">Select Country</option>
// //           {countries.map((country) => (
// //             <option key={country} value={country}>
// //               {country}
// //             </option>
// //           ))}
// //         </select>
// //         <input
// //           type="date"
// //           className="grow"
// //           style={inputStyle}
// //           value={releaseDate}
// //           onChange={(e) => setReleaseDate(e.target.value)}
// //           required
// //         />
// //         <input
// //           type="text"
// //           className="grow"
// //           style={inputStyle}
// //           placeholder="Synopsis"
// //           value={synopsis}
// //           onChange={(e) => setSynopsis(e.target.value)}
// //           required
// //         />
// //       </div>
// //       <div className="flex justify-between items-center mt-4">
// //         <button
// //           type="button"
// //           className="btn bg-transparent border-2 text-red-700 border-red-700 rounded-lg px-6 mr-8"
// //           onClick={() => dialogRef.current?.close()}
// //         >
// //           Close
// //         </button>
// //         <button
// //           type="submit"
// //           className="btn border-2 bg-blue-700 rounded-lg px-4"
// //         >
// //           Create Movie
// //         </button>
// //       </div>
// //     </form>
// //   );
// // };

// // export default AddMovie;

// // import { useRef, useState } from "react";

// // const AddMovie = () => {
// //   const dialogRef = useRef<HTMLDialogElement | null>(null);
// //   const [movieTitle, setMovieTitle] = useState("");
// //   const [genre, setGenre] = useState("");
// //   const [duration, setDuration] = useState("");
// //   const [country, setCountry] = useState("");
// //   const [starsId, setStarsId] = useState("");
// //   const [releaseDate, setReleaseDate] = useState("");
// //   const [synopsis, setSynopsis] = useState("");
// //   const [error, setError] = useState("");

// //   const genres = ["Action", "Comedy", "Drama", "Fantasy", "Horror"];
// //   const countries = ["USA", "UK", "Canada", "Australia", "India"];

// //   const backgroundColor = "#1A1F33";
// //   const inputBorderColor = "#4E5460";

// //   const formStyle = {
// //     backgroundColor: backgroundColor,
// //     color: "white",
// //   };

// //   const inputStyle = {
// //     backgroundColor: backgroundColor,
// //     color: "white",
// //     borderColor: inputBorderColor,
// //     borderWidth: "1px",
// //     outline: "none",
// //     borderRadius: "8px",
// //     padding: "10px",
// //     width: "100%",
// //   };

// //   const handleSubmit = async (event: React.FormEvent) => {
// //     event.preventDefault();
// //     setError(""); // Clear any previous errors

// //     const newMovie = {
// //       title: movieTitle,
// //       genre: genre.split(",").map((g) => g.trim()),
// //       duration,
// //       country,
// //       starsId: starsId.split(",").map((id) => id.trim()),
// //       releaseDate,
// //       synopsis,
// //     };

// //     try {
// //       console.log("Sending request to server with payload:", newMovie); // Log request payload
// //       const response = await fetch(
// //         "https://abissinia-backend.vercel.app/api/movies",
// //         {
// //           method: "POST",
// //           headers: {
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify(newMovie),
// //         }
// //       );

// //       if (response.ok) {
// //         const addedMovie = await response.json();
// //         console.log("Movie added successfully:", addedMovie);
// //         setMovieTitle("");
// //         setGenre("");
// //         setDuration("");
// //         setCountry("");
// //         setStarsId("");
// //         setReleaseDate("");
// //         setSynopsis("");
// //         dialogRef.current?.close(); // Close the modal
// //       } else {
// //         const errorData = await response.json();
// //         setError(`Failed to add the movie: ${errorData.message}`);
// //         console.error("Failed to add the movie:", errorData);
// //       }
// //     } catch (error) {
// //       setError("Error adding movie. Please try again later.");
// //       console.error("Error adding movie:", error);
// //     }
// //   };

// //   return (
// //     <dialog ref={dialogRef}>
// //       <form
// //         method="dialog"
// //         className="p-4"
// //         // style={formStyle}
// //         onSubmit={handleSubmit}
// //       >
// //         <div className="space-y-4">
// //           <input
// //             type="text"
// //             className="grow"
// //             style={inputStyle}
// //             placeholder="Movie Title"
// //             value={movieTitle}
// //             onChange={(e) => setMovieTitle(e.target.value)}
// //             required
// //           />
// //           <select
// //             className="grow"
// //             style={inputStyle}
// //             value={genre}
// //             onChange={(e) => setGenre(e.target.value)}
// //             required
// //           >
// //             <option value="">Select Genre</option>
// //             {genres.map((genre) => (
// //               <option key={genre} value={genre}>
// //                 {genre}
// //               </option>
// //             ))}
// //           </select>

// //           <input
// //             type="text"
// //             className="grow"
// //             style={inputStyle}
// //             placeholder="Duration"
// //             value={duration}
// //             onChange={(e) => setDuration(e.target.value)}
// //             required
// //           />

// //           <input
// //             type="text"
// //             className="grow"
// //             style={inputStyle}
// //             placeholder="Stars (comma separated)"
// //             value={starsId}
// //             onChange={(e) => setStarsId(e.target.value)}
// //             required
// //           />
// //           <select
// //             className="grow"
// //             style={inputStyle}
// //             value={country}
// //             onChange={(e) => setCountry(e.target.value)}
// //             required
// //           >
// //             <option value="">Select Country</option>
// //             {countries.map((country) => (
// //               <option key={country} value={country}>
// //                 {country}
// //               </option>
// //             ))}
// //           </select>
// //           <input
// //             type="date"
// //             className="grow"
// //             style={inputStyle}
// //             value={releaseDate}
// //             onChange={(e) => setReleaseDate(e.target.value)}
// //             required
// //           />
// //           <input
// //             type="text"
// //             className="grow"
// //             style={inputStyle}
// //             placeholder="Synopsis"
// //             value={synopsis}
// //             onChange={(e) => setSynopsis(e.target.value)}
// //             required
// //           />
// //         </div>
// //         {error && <div className="text-red-500 mt-2">{error}</div>}
// //         <div className="flex justify-between items-center mt-4">
// //           <button
// //             type="button"
// //             className="btn bg-transparent border-2 text-red-700 border-red-700 rounded-lg px-6 mr-8"
// //             onClick={() => dialogRef.current?.close()}
// //           >
// //             Close
// //           </button>
// //           <button
// //             type="submit"
// //             className="btn border-2 bg-blue-700 rounded-lg px-4"
// //           >
// //             Create Movie
// //           </button>
// //         </div>
// //       </form>
// //     </dialog>
// //   );
// // };

// // export default AddMovie;
