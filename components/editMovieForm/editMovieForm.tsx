import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

type Movie = {
  _id: string;
  title: string;
  description: string;
  genre: string[];
  poster: string;
  country: string;
  releaseDate: string;
  reviewId: string[];
  starsId: string[];
  averageRating: string;
  duration?: string;
};
type MovieFormProps = {
  movie: Movie | null; // Define props for the movie
};

const MovieForm = ({ movie }: MovieFormProps) => {
  console.log("fetched Movie=", movie);
  const [formData, setFormData] = useState({
    title: movie?.title || "",
    genre: movie?.genre.join(", ") || "", // Assuming genre is an array
    duration: movie?.duration ? movie.duration : "", // Initialize with appropriate movie data if available
    rating: movie?.averageRating || "", // Initialize with appropriate movie data if available
    releaseDate: movie?.releaseDate || "",
    synopsis: movie?.description || "",
    poster: movie?.poster || "",
    starsId: movie?.starsId || [],
    reviewId: movie?.reviewId || [],
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    // If you want to handle image preview or any other side effects, you can do it here.
  }, []); // Ensure dependencies are correct based on your use case

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    try {
      const response = await axios.put(
        `https://abissinia-backend.vercel.app/api/movies/${movie?._id}`,
        {
          title: formData.title,
          genre: formData.genre.split(",").map((g) => g.trim()), // Convert genre back to array
          duration: formData.duration,
          averageRating: formData.rating,
          releaseDate: formData.releaseDate,
          description: formData.synopsis,
          reviewId: formData.reviewId,
          starsId: formData.starsId,
          poster: selectedImage ? selectedImage : formData.poster,
          // Include other movie data as necessary
        }
      );
      toast.success("Movie Udated successfully");

      console.log("Update successful:", response.data);
      redirect("/movies");
    } catch (error) {
      console.error("Error updating movie:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-24">
      <div className="flex">
        <div className="w-1/4">
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-300"
            >
              Change Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
            />
          </div>
          {imagePreviewUrl && (
            <div className="mb-4">
              <div className="relative w-full h-64">
                <Image
                  src={imagePreviewUrl}
                  alt="Selected"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-md"
                />
              </div>
            </div>
          )}
        </div>

        <div className=" w-3/4 max-w-lg mx-auto p-6 bg-gray-800 rounded-lg shadow-md text-white">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-300"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-300"
            >
              Genre
            </label>
            <input
              type="text"
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="duration"
              className="block text-sm font-medium text-gray-300"
            >
              Duration (min)
            </label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="rating"
              className="block text-sm font-medium text-gray-300"
            >
              Rating
            </label>
            <input
              type="number"
              step="0.1"
              id="rating"
              name="rating"
              value={parseFloat(formData.rating)}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="releaseDate"
              className="block text-sm font-medium text-gray-300"
            >
              Release Date
            </label>
            <input
              type="date"
              id="releaseDate"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="synopsis"
              className="block text-sm font-medium text-gray-300"
            >
              Synopsis
            </label>
            <textarea
              id="synopsis"
              name="synopsis"
              value={formData.synopsis}
              onChange={handleChange}
              className="mt-1 block w-full p-2 bg-gray-900 border border-gray-700 rounded-md"
              rows={4}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <button type="submit" className="px-4 py-2 bg-blue-600 rounded-md">
          Update
        </button>
      </div>
    </form>
  );
};

export default MovieForm;
