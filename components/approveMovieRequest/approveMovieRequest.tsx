import axios from "axios";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";

interface FormData {
  _id?: string | null;
  userId?: string | null;
  title: string;
  duration: number;
  releaseDate: string;
  posterURL: string;
  description: string;
  director: string;
  genres: string[];
  country: string;
  stars: { value: string; label: string }[];
}

interface ApproveMovieRequestProps {
  setShowModal: (show: boolean) => void;
  movieData: Partial<FormData>;
}

const ApproveMovieRequest: React.FC<ApproveMovieRequestProps> = ({
  setShowModal,
  movieData,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: movieData.title || "",
    duration: movieData.duration || 0,
    releaseDate: movieData.releaseDate || "",
    posterURL: movieData.posterURL || "",
    description: movieData.description || "",
    director: "",
    genres: [],
    country: "",
    stars: [],
  });

  const [starsOptions, setStarsOptions] = useState<
    { value: string; label: string }[]
  >([]);
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
  ];
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
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const requestBody = {
        ...formData,
        starsId: formData.stars.map((star) => star.value),
        poster: formData.posterURL,
      };

      const response = await axios.post(
        "https://abissinia-backend.vercel.app/api/movies",
        requestBody
      );
      const response2 = await axios.delete(
        `https://abissinia-backend.vercel.app/api/movie-requests/${movieData._id}`
      );
      const response3 = await axios.post(
        `https://abissinia-backend.vercel.app/api/notifications`,
        {
          userId: movieData.userId,
          content: "Your movie request is approved it will scheduled soon.",
          link: "#",
        }
      );
      toast.success("Movie approved and submitted successfully!");
      setLoading(false);
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to approve movie. Please try again.");
      setLoading(false);
      console.error(error);
    }
  };

  const inputStyle = {
    backgroundColor: "#1A1F33",
    color: "white",
    borderColor: "#4E5460",
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
            type="number"
            className="grow"
            style={inputStyle}
            placeholder="Duration (in minutes)"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
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
            readOnly
          />
          <img
            src={formData.posterURL}
            alt="Poster"
            className="w-full h-64 object-cover"
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
                borderColor: "#4E5460",
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
                borderColor: "#4E5460",
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
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="btn border-2 bg-blue-700 rounded-lg px-4"
            type="submit"
          >
            {loading ? "Submitting..." : "Approve Movie"}
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

export default ApproveMovieRequest;
