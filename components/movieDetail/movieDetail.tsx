import Image from "next/image";
import React from "react";

const MovieDetail = () => {
  return (
    <div className="flex">
      <div className="relative w-80 h-96 overflow-hidden rounded-2xl ">
        <Image
          className=""
          src={`/images/movie1.jpg`}
          alt={`poster`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="max-w-4xl mx-auto">
        <form className="">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-blue-900 text-white"
            />
          </div>
          <div></div>
          <div>
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700"
            >
              Genre (comma separated)
            </label>
            <input
              type="text"
              name="genre"
              id="genre"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-blue-900 text-white"
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700"
            >
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-blue-900 text-white"
            />
          </div>
          <div>
            <label
              htmlFor="releaseDate"
              className="block text-sm font-medium text-gray-700"
            >
              Release Date
            </label>
            <input
              type="date"
              name="releaseDate"
              id="releaseDate"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-blue-900 text-white"
            />
          </div>
          <div>
            <label
              htmlFor="reviewId"
              className="block text-sm font-medium text-gray-700"
            >
              Review ID
            </label>
            <input
              type="text"
              name="reviewId"
              id="reviewId"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-blue-900 text-white"
            />
          </div>
          <div>
            <label
              htmlFor="starsId"
              className="block text-sm font-medium text-gray-700"
            >
              Stars ID
            </label>
            <input
              type="text"
              name="starsId"
              id="starsId"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-blue-900 text-white"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <div className=""></div>
    </div>
  );
};

export default MovieDetail;
