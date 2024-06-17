"use client";
import React, { useEffect, useState } from "react";
import MovieForm from "@/components/editMovieForm/editMovieForm";
import axios from "axios";

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
    duration?:string;

};
type Props = {
  params: {
    id: string;
  };
};

const MovieDetailPage = ({ params: { id } }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  console.log("movie Id=", id);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await axios.get(
          `https://abissinia-backend.vercel.app/api/movies/${id}`
        );
        setMovie(response.data); // Corrected to response.data.movie
        console.log("response=", response.data);
      } catch (error) {
        console.error("Error in fetching movie:", error);
      }
    };

    getMovie();
  }, [id]);

  return (
    <div className="">
      {movie && <MovieForm movie={movie} />}{" "}
      {/* Ensure movie is not null before rendering MovieForm */}
    </div>
  );
};

export default MovieDetailPage;
