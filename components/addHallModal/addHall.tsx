import React from "react";
import { useRef, useState } from "react";
import avatarURL from "/public/images/chapa.png";
import Image from "next/image";

const AddHallModal = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useState<string>("");
  const [hallName, setHallName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [mapUrl, setMapUrl] = useState<string>("");

  return (
    <form method="dialog" className="p-4 ">
      <div className="space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Hall Name"
            value={hallName}
            onChange={(e) => setHallName(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Map Url"
            value={mapUrl}
            onChange={(e) => setMapUrl(e.target.value)}
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
          Create User
        </button>
      </div>
    </form>
  );
};

export default AddHallModal;
