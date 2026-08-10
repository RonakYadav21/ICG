import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import id_card from "../assets/id_cards.png";

const Signup = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/Admin/signup`, formData);

      console.log(res);

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (err) {
      console.log(err);

      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F3] flex">
      <div className="hidden lg:flex w-1/2 items-center justify-center p-10">
        <img
          src={id_card}
          alt="ID card preview"
          className="max-h-[600px] object-contain"
        />
      </div>

      <div className="flex w-full flex-col items-center justify-center p-6 lg:w-1/2">
        <h1 className="mb-4 text-center text-4xl font-bold text-[#2E1C0D]">
          IIPS ICG
        </h1>

        <p className="mb-8 text-center text-gray-600">
          Create your admin account to access the dashboard
        </p>

        <form
          onSubmit={submitHandler}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg space-y-5"
        >
          <div className="text-center text-2xl font-semibold text-gray-700">
            Admin Sign Up
          </div>

          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Full Name <span className="text-red-500">*</span>
            </label>

            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={changeHandler}
              required
              className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email <span className="text-red-500">*</span>
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={changeHandler}
              required
              className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div>
            <label
              htmlFor="phoneNumber"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Phone Number <span className="text-red-500">*</span>
            </label>

            <input
              id="phoneNumber"
              type="tel"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={changeHandler}
              required
              className="w-full rounded-xl border border-gray-300 p-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={changeHandler}
                required
                className="w-full rounded-xl border border-gray-300 p-3 pr-12 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600 transition"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-600 p-3 font-semibold text-white transition hover:bg-orange-700"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an admin account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer font-medium text-orange-600 hover:underline"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
