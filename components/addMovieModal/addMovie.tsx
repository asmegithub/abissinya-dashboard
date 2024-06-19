import axios from "axios";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  UploadTaskSnapshot,
} from "firebase/storage";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import { storage } from "../firebase/firebaseconfig";

interface FormData {
  title: string;
  durationHours: string;
  durationMinutes: string;
  director: string;
  genres: string[];
  releaseDate: string;
  country: string;
  poster: File | null;
  posterURL: string;
  description: string;
  stars: { value: string; label: string }[];
}

const AddMovie = ({
  setShowModal,
  setMovies,
}: {
  setShowModal: any;
  setMovies:any;
}) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [starsOptions, setStarsOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    director: "",
    genres: [],
    durationHours: "",
    durationMinutes: "",
    releaseDate: "",
    country: "",
    poster: null,
    posterURL: "",
    description: "",
    stars: [],
  });
  const genres = [
    "Action",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Adventure",
    "Animation",
    "Biography",
    "Crime",
    "Documentary",
    "Family",
    "History",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "War",
    "Western",
    "Sports",
  ];
  const countries = [
    "USA",
    "UK",
    "Canada",
    "Australia",
    "India",
    "Germany",
    "France",
    "Italy",
    "Spain",
    "Japan",
    "China",
    "Russia",
    "Brazil",
    "Mexico",
    "South Korea",
    "Argentina",
    "South Africa",
    "Egypt",
    "Nigeria",
    "Kenya",
    "Morocco",
    "Ethiopia",
  ];

  const backgroundColor = "#1A1F33";
  const inputBorderColor = "#4E5460";

  const formStyle = {
    backgroundColor: backgroundColor,
    color: "white",
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch stars from the server
    const fetchStars = async () => {
      try {
        const response = await axios.get(
          "https://abissinia-backend.vercel.app/api/stars"
        );
        const starsData = response.data.map(
          (star: { _id: string; name: string }) => ({
            value: star._id,
            label: star.name,
          })
        );
        setStarsOptions(starsData);
      } catch (error) {
        console.error("Failed to fetch stars", error);
      }
    };

    fetchStars();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleMultiSelectChange = (selectedOptions: any) => {
    setFormData((prevData) => ({ ...prevData, stars: selectedOptions }));

    console.log("stars :", formData.stars);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList | null;
    if (files && files.length > 0) {
      const file = files[0];
      setFormData((prevData) => ({ ...prevData, poster: file }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          posterURL: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (formData.poster) {
        const storageRef = ref(storage, `posters/${formData.poster.name}`);
        const uploadTask = uploadBytesResumable(storageRef, formData.poster);
        uploadTask.on(
          "state_changed",
          (snapshot: UploadTaskSnapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setLoading(true);
          },
          (error) => {
            setLoading(false);
            toast.error("Image upload failed. Please try again.");
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setLoading(false);
            resolve(downloadURL);
          }
        );
      } else {
        reject(new Error("No file selected"));
      }
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const posterURL = await handleUpload();
      const formDataWithPosterURL = { ...formData, posterURL };

      const durationInMinutes =
        parseInt(formDataWithPosterURL.durationHours) * 60 +
        parseInt(formDataWithPosterURL.durationMinutes);
      const requestBody = {
        title: formDataWithPosterURL.title,
        duration: durationInMinutes,
        releaseDate: new Date(formDataWithPosterURL.releaseDate),
        poster: formDataWithPosterURL.posterURL,
        description: formDataWithPosterURL.description,
        director: formDataWithPosterURL.director,
        genre: formDataWithPosterURL.genres, // Ensure genre is sent as an array of strings
        country: formDataWithPosterURL.country,
        starsId: formData.stars.map((star) => star.value), // Use starsId instead of stars
      };

      await axios.post(
        `https://abissinia-backend.vercel.app/api/movies`,
        requestBody
      );
      const response = await axios.get(
        "https://abissinia-backend.vercel.app/api/movies"
      );
      const newMovies = response.data;
      setMovies(newMovies);
      toast.success("Form submitted successfully!");

      setFormData({
        title: "",
        durationHours: "",
        durationMinutes: "",
        releaseDate: "",
        director: "",
        genres: [],
        country: "",
        poster: null,
        posterURL: "",
        description: "",
        stars: [],
      });
    } catch (error) {
      toast.error("Form submission failed. Please try again.");
      console.error(error);
    }
  };

  const inputStyle = {
    backgroundColor: backgroundColor,
    color: "white",
    borderColor: inputBorderColor,
    borderWidth: "1px",
    outline: "none",
    borderRadius: "8px",
    padding: "10px",
    width: "100%",
  };

  return (
    <div className="p-4 overflow-y-hidden">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="space-y-4">
          <input
            type="text"
            className="grow"
            style={inputStyle}
            placeholder="Movie Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            className="grow"
            style={inputStyle}
            placeholder="Director"
            name="director"
            value={formData.director}
            onChange={handleChange}
            required
          />
          <Select
            isMulti
            name="genres"
            options={genres.map((genre) => ({ value: genre, label: genre }))}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={(selectedOptions) =>
              setFormData((prevData) => ({
                ...prevData,
                genres: selectedOptions.map((option) => option.value),
              }))
            }
            placeholder="Select Genre(s)"
            value={formData.genres.map((genre) => ({
              value: genre,
              label: genre,
            }))}
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: "gray",
                borderColor: inputBorderColor,
                borderWidth: "1px",
                outline: "none",
                borderRadius: "8px",
                padding: "10px",
                width: "100%",
                color: "white",
              }),
              multiValue: (provided) => ({
                ...provided,
                backgroundColor: "#4E5460",
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                color: "white",
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "white",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "white",
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "gray",
                color: "white",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#4E5460" : "gray",
                color: "white",
              }),
            }}
          />
          <input
            type="number"
            className="grow"
            style={inputStyle}
            placeholder="Duration Hours"
            name="durationHours"
            value={formData.durationHours}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            className="grow"
            style={inputStyle}
            placeholder="Duration Minutes"
            name="durationMinutes"
            value={formData.durationMinutes}
            onChange={handleChange}
            required
          />
          <Select
            isMulti
            name="stars"
            options={starsOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleMultiSelectChange}
            placeholder="Select Stars"
            value={formData.stars}
            styles={{
              control: (provided) => ({
                ...provided,
                backgroundColor: "gray",
                borderColor: inputBorderColor,
                borderWidth: "1px",
                outline: "none",
                borderRadius: "8px",
                padding: "10px",
                width: "100%",
                color: "white",
              }),
              multiValue: (provided) => ({
                ...provided,
                backgroundColor: "#4E5460",
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                color: "white",
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "white",
              }),
              singleValue: (provided) => ({
                ...provided,
                color: "white",
              }),
              menu: (provided) => ({
                ...provided,
                backgroundColor: "gray",
                color: "white",
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isSelected ? "#4E5460" : "gray",
                color: "white",
              }),
            }}
          />
          <select
            className="grow"
            style={inputStyle}
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
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
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            required
          />
          <textarea
            className="grow"
            style={inputStyle}
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            className="grow"
            style={inputStyle}
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="btn border-2 bg-blue-700 rounded-lg px-4"
            type="submit"
          >
            {loading ? "Uploading..." : "Create Movie"}
          </button>
        </div>
      </form>
      <div className="flex justify-between items-center mt-4">
        <button
          className="button btn bg-transparent border-2 text-red-700 border-red-700 rounded-lg px-6 mr-8"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default AddMovie;
