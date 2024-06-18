"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import SearchBar from "@/components/searchBar/searchBar";
import AddUser from "@/components/addUserModal/addUser";
import axios from "axios";
import { toast } from "react-toastify";
import SetUserRoleModal from "@/components/userRoleModal/userRoleModal";

const UsersPage = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null); // State to track the user for role setting

  type User = {
    _id: string;
    avatar: string;
    username: string;
    email: string;
    password: string;
    role: string;
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          "https://abissinia-backend.vercel.app/api/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error in fetching users:", error);
        toast.error("Error in fetching users.");
      }
    };
    getUsers();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveUser = async (id: string) => {
    try {
      await axios.delete(
        `https://abissinia-backend.vercel.app/api/users/${id}`
      );
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user.");
    }
  };

  const handleOpenRoleModal = (user: User) => {
    setCurrentUser(user);
    setShowRoleModal(true);
  };

  const handleCloseRoleModal = () => {
    setShowRoleModal(false);
    setCurrentUser(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      (selectedRole ? user.role === selectedRole : true) &&
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex flex-col text-white">
      <SearchBar name="user" onChange={handleSearchChange} />
      <div className="flex justify-between mr-5 my-5">
        <div>
          <dialog className="modal bg-gray-700" ref={dialogRef}>
            <div className="modal-box max-w-96 rounded-2xl">
              <AddUser />
            </div>
          </dialog>
        </div>
      </div>
      <ul className="px-10 rounded-xl border border-blue-500 overflow-x-auto h-[650px]">
        <li className="flex border-b-2 justify-start p-4 mx-4 mb-5">
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">Name</div>
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">E-mail</div>
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">Role</div>
        </li>
        {filteredUsers.map((user) => (
          <li key={user._id} className="flex justify-start pb-5">
            <div className="flex w-4/12 gap-2">
              <div className="relative w-10 h-10 overflow-hidden rounded-full">
                <Image
                  className="rounded-full"
                  src={user.avatar}
                  alt={`${user.username} avatar`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="pt-2">{user.username}</p>
            </div>
            <div className="pt-2 w-4/12">{user.email}</div>
            <div className="pt-2 w-3/12">{user.role || "User"}</div>
            <button
              className="w-1/12 text-red-500 rounded-lg font-bold border border-red-500 hover:bg-red-500 hover:text-white"
              onClick={() => handleRemoveUser(user._id)}
            >
              Remove
            </button>
            <button
              className="w-1/12 text-blue-500 rounded-lg font-bold border border-blue-500 hover:bg-blue-500 hover:text-white ml-2"
              onClick={() => handleOpenRoleModal(user)}
            >
              Set Role
            </button>
          </li>
        ))}
      </ul>
      {showRoleModal && currentUser && (
        <SetUserRoleModal
          user={currentUser}
          onClose={handleCloseRoleModal}
          onRoleUpdate={(updatedUser) => {
            setUsers((prevUsers) =>
              prevUsers.map((user) =>
                user._id === updatedUser._id ? updatedUser : user
              )
            );
            toast.success("User role updated successfully");
          }}
        />
      )}
    </div>
  );
};

export default UsersPage;
