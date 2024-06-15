// import { useRef, useState } from "react";
// import avatarURL from "/public/images/chapa.png";
// import Image from "next/image";

// const AddUser = () => {
//   const dialogRef = useRef<HTMLDialogElement | null>(null);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] =
//     useState<string>("");
//   const [firstName, setFirstName] = useState<string>("");
//   const [lastName, setLastName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");

//   const handlePaymentMethodSelect = (paymentMethod: string) => {
//     setSelectedPaymentMethod(paymentMethod);
//   };
//   return (
//     <form method="dialog" className="p-4 ">
//       <div className="space-y-4">
//         <label className="input input-bordered flex items-center gap-2">
//           <input
//             type="text"
//             className="grow"
//             placeholder="First Name"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </label>
//         <label className="input input-bordered flex items-center gap-2">
//           <input
//             type="text"
//             className="grow"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </label>
//         <label className="input input-bordered flex items-center gap-2">
//           <input
//             type="email"
//             className="grow"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </label>
//       </div>
//       <div className="flex justify-between items-center mt-4">
//         <button
//           className="btn bg-transparent border-2 text-red-700 border-red-700 rounded-lg px-6 mr-8"
//           onClick={() => dialogRef.current?.close()}
//         >
//           Close
//         </button>
//         <button className="btn border-2  bg-blue-700 rounded-lg px-4">
//           Create User
//         </button>
//       </div>
//     </form>
//   );
// };

// export default AddUser;

import { useRef, useState, FormEvent } from "react";
import Image from "next/image";

type User = {
  avatar: string;
  username: string;
  email: string;
  password: string;
  role: string;
};

const AddUser: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [avatar, setAvatar] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      avatar,
      username,
      email,
      password,
      role,
    };
    console.log("new User=", newUser);

    try {
      const response = await fetch(
        "https://abissinia-backend.vercel.app/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );
      console.log("request send successfully...");
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("User created successfully:", result);

      // Close the dialog after successful creation
      dialogRef.current?.close();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <form method="dialog" className="p-4" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </label>
      </div>
      <div className="flex justify-between items-center mt-4">
        <button
          type="button"
          className="btn bg-transparent border-2 text-red-700 border-red-700 rounded-lg px-6 mr-8"
          onClick={() => dialogRef.current?.close()}
        >
          Close
        </button>
        <button
          type="submit"
          className="btn border-2 bg-blue-700 rounded-lg px-4"
        >
          Create User
        </button>
      </div>
    </form>
  );
};

export default AddUser;
