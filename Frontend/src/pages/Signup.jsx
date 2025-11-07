import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
  // const API_URL = "http://localhost:8080";

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
      const res = await axios.post(`${API_URL}/auth/register`, formData);
      console.log(res);
      console.log("signed up!");
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md space-y-6"
      >
        <div>
          <label>Full Name</label>
          <input
            name="fullName"
            value={formData.fullName}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label>Email</label>
          <input name="email" value={formData.email} onChange={changeHandler} />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-medium py-2 rounded hover:bg-blue-700 transition-all cursor-pointer"
        >
          {" "}
          Sign Up{" "}
        </button>{" "}
        <p className="text-center text-sm text-gray-600">
          {" "}
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            {" "}
            Login{" "}
          </span>{" "}
        </p>
      </form>
    </div>
  );
};

export default Signup;
