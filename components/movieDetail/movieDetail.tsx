import Image from "next/image";
import React from "react";

const MovieDetail = () => {
  return (
    <div className="">
      <div className="relative w-10 h-10 overflow-hidden rounded-full">
        <Image
          className="rounded-full"
          src={`/images/movie1.jpg`}
          alt={`poster`}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className=""></div>
      <div className=""></div>
    </div>
  );
};

export default MovieDetail;
