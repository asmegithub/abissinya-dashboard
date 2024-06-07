import { useRef, useState } from "react";

const AddMovie = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [movieTitle, setMovieTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [duration, setDuration] = useState("");
  const [country, setCountry] = useState("");
  const [starsId, setStarsId] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [synopsis, setSynopsis] = useState("");

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

  return (
    <form
      method="dialog"
      className="p-4"
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
          placeholder="Stars"
          value={starsId}
          onChange={(e) => setStarsId(e.target.value)}
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
        <button className="btn border-2 bg-blue-700 rounded-lg px-4">
          Create Movie
        </button>
      </div>
    </form>
  );
};

export default AddMovie;
