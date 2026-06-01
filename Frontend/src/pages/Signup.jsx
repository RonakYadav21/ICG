import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import id_card from "../assets/id_cards.png";

const Signup = () => {
  const API_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

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
      const res = await axios.post(
        `${API_URL}/Admin/signup`,
        formData
      );

      console.log(res);

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (err) {
      console.log(err);

      toast.error(
        err.response?.data?.message || "Signup failed"
      );
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-orange-50 to-white">
      
      {/* Left Side Image */}
      <div className="hidden lg:flex items-center justify-center w-1/2 p-10">
        <img
          src={id_card}
          alt="ID card preview"
          className="max-h-[600px] object-contain"
        />
      </div>

      {/* Right Side Form */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-6">
        
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          IIPS - ICG
        </h1>

        <p className="text-center text-gray-600 mb-8">
          Create your admin account to access the dashboard
        </p>

        <form
          onSubmit={submitHandler}
          className="w-full max-w-md space-y-5 bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="text-center font-semibold text-2xl text-gray-700">
            Admin Sign Up
          </div>

          {/* Full Name */}
          <input
            type="text"
            placeholder="Enter your full name"
            name="fullName"
            value={formData.fullName}
            onChange={changeHandler}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          {/* Phone Number */}
          <input
            type="text"
            placeholder="Enter your phone number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={changeHandler}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
          >
            Sign Up
          </button>

          {/* Login Redirect */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              className="text-orange-600 cursor-pointer hover:underline font-medium"
              onClick={() => navigate("/login")}
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