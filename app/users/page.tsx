"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa";
import SearchBar from "@/components/searchBar/searchBar";
import AddUser from "@/components/addUserModal/addUser";
import { toast } from "react-toastify";

const UsersPage = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const query = await fetch(
          "https://abissinia-backend.vercel.app/api/users"
        );
        const users = await query.json();
        setUsers(users);
      } catch (error) {
        console.error("Error in fetching users:", error);
      }
    };
    getUsers();
  }, []);

  type User = {
    _id: string;
    avatar: string;
    username: string;
    email: string;
    password: string;
    role: string;
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const handleRemoveUser = async (id: string) => {
    try {
      const response = await fetch(
        `https://abissinia-backend.vercel.app/api/users/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} ${errorText}`);
      }
      toast.success("Successfully deleted!");

      // Update the user list after successful deletion
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(`An expected Error in deleting user`);
    }
  };
  const filteredUsers = users.filter(
    (user) =>
      (selectedRole ? user.role === selectedRole : true) &&
      (user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    // || user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col text-white">
      <SearchBar name="user" onChange={handleSearchChange} />
      <div className="flex justify-between mr-5 my-5">
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex gap-2 text-xl font-bold border border-blue-500 rounded-lg px-6 py-2"
          >
            {selectedRole || "Select Role"}
            <FaAngleDown className="text-blue-500 text-3xl" />
          </button>
          {isDropdownOpen && (
            <div className="absolute z-10 mt-2 w-full bg-gray-800 rounded-lg shadow-lg">
              <button
                onClick={() => handleRoleSelect("Admin")}
                className="block w-full text-center px-4 py-2 text-white hover:text-blue-500 hover:font-bold px-4 py-2 text-xl"
              >
                Admin
              </button>
              <button
                onClick={() => handleRoleSelect("User")}
                className="block w-full text-center px-4 py-2 text-white hover:text-blue-500 hover:font-bold px-4 py-2 text-xl"
              >
                User
              </button>
              <button
                onClick={() => handleRoleSelect("Actor")}
                className="block w-full text-center px-4 py-2 text-white hover:text-blue-500 hover:font-bold px-4 py-2 text-xl"
              >
                Actor
              </button>
              {/* Add more roles as needed */}
            </div>
          )}
        </div>
        <div>
          <dialog className="modal bg-gray-700" ref={dialogRef}>
            <div className="modal-box max-w-96 rounded-2xl">
              <AddUser />
            </div>
          </dialog>
        </div>

        {/* <button
          onClick={openModal}
          className="bg-blue-500 text-white font-bold px-6 py-2 rounded-lg"
        >
          Add User
        </button> */}
      </div>
      <ul className="px-10 rounded-xl border border-blue-500 overflow-x-auto h-[650px]">
        <li className="flex border-b-2 justify-start p-4 mx-4 mb-5">
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">Name</div>
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">E-mail</div>
          <div className="w-1/3 font-bold text-2xl text-[#A1E8EE]">Role</div>
        </li>

        {users.length == 0 ? (
          <p className="text-2xl px-96 py-40">Loading...</p>
        ) : (
          filteredUsers.map((user) => {
            return (
              <li key={user.email} className="flex justify-start pb-5">
                <div className="flex w-4/12 gap-2">
                  <div className="relative w-10 h-10 overflow-hidden rounded-full">
                    <Image
                      className="rounded-full"
                      src={`${user.avatar}`}
                      alt={`${user.username} poster`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <p className="pt-2">{user.username}</p>
                </div>
                <div className="pt-2 w-4/12">{user.email}</div>
                <div className="pt-2 w-3/12">
                  {user.role ? user.role : "User"}
                </div>
                <button
                  className="w-1/12 text-red-500 rounded-lg font-bold border border-red-500 hover:bg-red-500 hover:text-white"
                  onSubmit={() => {
                    handleRemoveUser(user._id);
                    // setIsDropdownOpen(!isDropdownOpen);
                  }}
                >
                  Remove
                </button>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
};

export default UsersPage;
