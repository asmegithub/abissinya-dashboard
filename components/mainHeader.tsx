"use client";

import { MenuContext } from "@/context/menuContext";
import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";

const MainHeader = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error("MainHeader must be used within a MenuContextProvider");
  }

  const { toggle } = context;

  return (
    <div>
      <div className="bg-[#1D2132] text-white flex justify-between p-4 h-12">
        <div className="">Brand</div>
        <div className="" onClick={toggle}>
          <FaBars className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
