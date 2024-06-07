import { useRef, useState } from "react";

// Mock data for movies and halls
const movies = [
  { id: "1", name: "Inception" },
  { id: "2", name: "The Dark Knight" },
  { id: "3", name: "Interstellar" },
  { id: "4", name: "Parasite" },
];

const halls = [
  { id: "A", name: "Main Hall" },
  { id: "B", name: "Screen 2" },
  { id: "C", name: "VIP Lounge" },
  { id: "D", name: "Outdoor Screen" },
];

const AddMovieSchedule = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [movieId, setMovieId] = useState("");
  const [hallId, setHallId] = useState("");
  const [schedules, setSchedules] = useState<
    Array<{ date: string; times: string[] }>
  >([{ date: "", times: [""] }]);

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

  return (
    <form method="dialog" className="p-4 ">
      <div className="space-y-4">
        <select
          className="select select-bordered w-full"
          value={movieId}
          onChange={(e) => setMovieId(e.target.value)}
        >
          <option disabled value="">
            Select a Movie
          </option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.name}
            </option>
          ))}
        </select>
        <select
          className="select select-bordered w-full"
          value={hallId}
          onChange={(e) => setHallId(e.target.value)}
        >
          <option disabled value="">
            Select a Hall
          </option>
          {halls.map((hall) => (
            <option key={hall.id} value={hall.id}>
              {hall.name}
            </option>
          ))}
        </select>
        {schedules.map((schedule, index) => (
          <div key={index} className="space-y-2">
            <label className="input input-bordered flex items-center gap-2">
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
              <div key={timeIndex} className="flex items-center gap-2">
                <input
                  type="time"
                  className="input input-bordered grow"
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
          className="btn bg-transparent border-2 text-red-700 border-red-700 rounded-lg px-6 mr-8"
          onClick={() => dialogRef.current?.close()}
        >
          Close
        </button>
        <button className="btn border-2  bg-blue-700 rounded-lg px-4">
          Create Schedule
        </button>
      </div>
    </form>
  );
};

export default AddMovieSchedule;
