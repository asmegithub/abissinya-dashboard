import { useRef, useState } from "react";
import avatarURL from "/public/images/chapa.png";
import Image from "next/image";

const AddMovie = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [movieTitle, setmovieTitle] = useState<string>("");
  const [genre, setgenre] = useState<string>("");
  const [duration, setduration] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [starsId, setStarsId] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");
  const [synopsis, setSynopsis] = useState<string>("");

  const handlePaymentMethodSelect = (paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod);
  };
  return (
    <form method="dialog" className="p-4 ">
      <div className="space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Movie Title"
            value={movieTitle}
            onChange={(e) => setmovieTitle(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setgenre(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Duration"
            value={duration}
            onChange={(e) => setduration(e.target.value)}
          />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Stars"
            value={starsId}
            onChange={(e) => setStarsId(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Release Date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Synopsis"
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
          />
        </label>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn bg-transparent border-2 text-red-700 border-red-700 rounded-lg px-6 mr-8"
          onClick={() => dialogRef.current?.close()}
        >
          Close
        </button>
        <button className="btn border-2  bg-blue-700 rounded-lg px-4">
          Create Movie
        </button>
      </div>
    </form>
  );
};

export default AddMovie;
