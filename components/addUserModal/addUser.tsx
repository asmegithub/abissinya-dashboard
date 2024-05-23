import { useRef, useState } from "react";
import avatarURL from "/public/images/chapa.png";
import Image from "next/image";

const AddUser = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handlePaymentMethodSelect = (paymentMethod: string) => {
    setSelectedPaymentMethod(paymentMethod);
  };
  return (
    <form method="dialog" className="p-4 ">
      <div className="space-y-4">
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="email"
            className="grow"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

export default AddUser;
