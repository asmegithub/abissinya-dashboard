import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

interface Movie {
  _id: string;
  title: string;
}

interface Hall {
  _id: string;
  name: string;
}

interface EditMovieScheduleProps {
  setShowModal: (show: boolean) => void;
  movieShowId: string;
}

const EditMovieSchedule = ({
  setShowModal,
  movieShowId,
}: EditMovieScheduleProps) => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [movieId, setMovieId] = useState("");
  const [hallId, setHallId] = useState("");
  const [schedules, setSchedules] = useState<
    Array<{ date: string; times: string[] }>
  >([{ date: "", times: [""] }]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [moviesResponse, hallsResponse, movieShowResponse] =
          await Promise.all([
            axios.get(
              "https://abissinia-backend.vercel.app/api/movies?page=1&limit=1000"
            ),
            axios.get("https://abissinia-backend.vercel.app/api/halls"),
            axios.get(
              `https://abissinia-backend.vercel.app/api/movie-shows/${movieShowId}`
            ),
          ]);

        setMovies(moviesResponse.data.movies);
        setHalls(hallsResponse.data);
        const movieShow = movieShowResponse.data;

        setMovieId(movieShow.movieId._id);
        setHallId(movieShow.hallId._id);
        setSchedules(
          movieShow.showTime.map((show: any) => ({
            date: show.day,
            times: show.time,
          }))
        );
      } catch (error) {
        console.error("Failed to fetch initial data", error);
      }
    };

    fetchInitialData();
  }, [movieShowId]);

  const handleAddTime = (index: number) => {
    const newSchedules = [...schedules];
    newSchedules[index].times.push("");
    setSchedules(newSchedules);
  };

  const handleRemoveTime = (scheduleIndex: number, timeIndex: number) => {
    const newSchedules = [...schedules];
    newSchedules[scheduleIndex].times.splice(timeIndex, 1);
    setSchedules(newSchedules);
  };

  const handleAddSchedule = () => {
    setSchedules([...schedules, { date: "", times: [""] }]);
  };

  const handleRemoveSchedule = (index: number) => {
    const newSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedules);
  };

  const handleScheduleChange = (
    index: number,
    type: "date" | "time",
    value: string,
    timeIndex?: number
  ) => {
    const newSchedules = [...schedules];
    if (type === "date") {
      newSchedules[index].date = value;
    } else if (type === "time" && timeIndex !== undefined) {
      newSchedules[index].times[timeIndex] = value;
    }
    setSchedules(newSchedules);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const showTime = schedules.map((schedule) => ({
        day: schedule.date,
        time: schedule.times,
      }));

      const requestBody = {
        showTime,
        movieId,
        hallId,
      };

      await axios.put(
        `https://abissinia-backend.vercel.app/api/movie-shows/${movieShowId}`,
        requestBody
      );

      toast.success("Schedule updated successfully!");
      setLoading(false);
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to update schedule. Please try again.");
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div className="space-y-4">
        <select
          className="select select-bordered w-full max-w-xs bg-gray-900"
          value={movieId}
          required
          onChange={(e) => {
            setMovieId(e.target.value);
          }}
        >
          <option disabled value="">
            Select a Movie
          </option>
          {movies.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.title}
            </option>
          ))}
        </select>
        <select
          className="select ml-2 select-bordered w-full max-w-xs bg-gray-900"
          required
          value={hallId}
          onChange={(e) => setHallId(e.target.value)}
        >
          <option disabled value="">
            Select a Hall
          </option>
          {halls.map((hall) => (
            <option key={hall._id} value={hall._id}>
              {hall.name}
            </option>
          ))}
        </select>
        {schedules.map((schedule, index) => (
          <div key={index} className="space-y-2">
            <label className="input input-bordered flex items-center gap-2 bg-gray-900">
              <input
                type="date"
                className="grow"
                value={schedule.date}
                onChange={(e) =>
                  handleScheduleChange(index, "date", e.target.value)
                }
              />
            </label>
            {schedule.times.map((time, timeIndex) => (
              <div
                key={timeIndex}
                className="flex items-center gap-2 bg-gray-900"
              >
                <input
                  required
                  type="time"
                  className="input input-bordered grow bg-gray-900"
                  value={time}
                  onChange={(e) =>
                    handleScheduleChange(
                      index,
                      "time",
                      e.target.value,
                      timeIndex
                    )
                  }
                />
                {schedule.times.length > 1 && (
                  <button
                    type="button"
                    className="btn bg-red-500 text-white"
                    onClick={() => handleRemoveTime(index, timeIndex)}
                  >
                    Remove Time
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              className="btn bg-green-500 text-white"
              onClick={() => handleAddTime(index)}
            >
              Add Time
            </button>
            {schedules.length > 1 && (
              <button
                type="button"
                className="btn bg-red-500 text-white"
                onClick={() => handleRemoveSchedule(index)}
              >
                Remove Schedule
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className="btn bg-blue-500 text-white"
          onClick={handleAddSchedule}
        >
          Add Another Date
        </button>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          className="btn bg-transparent border-2 text-white border-red-300 rounded-lg px-6 mr-8"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
        <button
          className="btn border-2 bg-blue-700 text-white rounded-lg px-4"
          type="submit"
        >
          {loading ? "Uploading..." : "Update Schedule"}
        </button>
      </div>
    </form>
  );
};

export default EditMovieSchedule;
