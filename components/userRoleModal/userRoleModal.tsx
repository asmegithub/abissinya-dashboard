import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

type SetUserRoleModalProps = {
  user: {
    _id: string;
    username: string;
    email: string;
    role: string;
  };
  onClose: () => void;
  onRoleUpdate: (user: any) => void;
};

const SetUserRoleModal: React.FC<SetUserRoleModalProps> = ({
  user,
  onClose,
  onRoleUpdate,
}) => {
  const [role, setRole] = useState(user.role || "User");
  const [loading, setLoading] = useState(false);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `https://abissinia-backend.vercel.app/api/users/${user._id}/role`,
        { role }
      );
      onRoleUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Error updating user role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-gray-700 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">
          Set Role for {user.username}
        </h2>
        <form onSubmit={handleSubmit}>
          <select
            className="select select-bordered w-full mb-4 bg-gray-900"
            value={role}
            onChange={handleRoleChange}
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
            <option value="Filmmaker">Filmmaker</option>
          </select>
          <div className="flex justify-between items-center">
            <button
              type="button"
              className="btn border-2 bg-red-700 text-white rounded-lg px-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn border-2 bg-blue-700 text-white rounded-lg px-4"
            >
              {loading ? "Updating..." : "Update Role"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SetUserRoleModal;
