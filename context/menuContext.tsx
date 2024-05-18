"use client";

import React, { createContext, useState, ReactNode } from "react";

// Define the type for the context value
interface MenuContextType {
  open: boolean;
  toggle: () => void;
}

// Create the context with a default value
export const MenuContext = createContext<MenuContextType | undefined>(
  undefined
);

// Define the type for the props
interface Props {
  children: ReactNode;
}

// Create the context provider component
const MenuContextProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  // Function to toggle the menu state
  const toggle = () => {
    console.log(open);
    setOpen((prev) => !prev);
  };

  // Context value to be provided to consumers
  const value = {
    open,
    toggle,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

// Export the provider component
export default MenuContextProvider;
