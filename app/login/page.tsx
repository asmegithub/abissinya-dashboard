"use client";
import Image from "next/image";
import logo from "/public/images/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import FormInput from "@/components/formInput/formInput";
import SubmitBtn from "@/components/submitBtn/submitBtn";

export const getUserFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const userString = localStorage.getItem("user");
    return userString ? JSON.parse(userString) : null;
  }
  return null;
};
const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const user = getUserFromLocalStorage();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://abissinia-backend.vercel.app/api/auth/login",
        formData
      );
      const data = response.data;
      console.log(data);
      if (data?.user?.role !== "Admin") {
        toast.error("You don't have Permission to login to the dashboard!");
        return null;
      }
      localStorage.setItem("user", JSON.stringify(data?.user));
      router.push("/");
      toast.success("Logged in");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";
      console.error(error);
      toast.error(errorMessage);
      return null;
    }
  };
  return (
    <div className="h-screen grid place-items-center">
      <form
        onSubmit={handleSubmit}
        method="post"
        className="card w-96 gap-y-4 shadow-lg flex flex-col p-4 bg-gray-900"
      >
        <Image
          style={{
            maxWidth: "100%  ",
            height: "auto",
          }}
          src={logo}
          alt="logo"
        />
        <h4 className="text-center  text-3xl font-bold text-white">Login</h4>
        <FormInput
          type={"email"}
          label={"email"}
          name={"email"}
          handleChange={handleChange}
        />
        <FormInput
          type={"password"}
          label={"password"}
          name={"password"}
          handleChange={handleChange}
        />
        <div className="mt-4">
          <SubmitBtn text={"login"} />
        </div>
      </form>
    </div>
  );
};

export default Login;
