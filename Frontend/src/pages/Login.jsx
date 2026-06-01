import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import id_card from "../assets/id_cards.png";

export default function Login() {
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
  const { login } = useAuth();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        username: formData.email,
        password: formData.password,
      });
      console.log(res);

      const data = res.data;
      login(data.token);
      toast.success("Login successfully!");
      navigate("/admin-dashboard");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-gradient-to-br from-orange-50 to-white">
      <div className="hidden lg:flex items-center justify-center w-1/2 p-10">
        <img
          src={id_card}
          alt="ID card preview"
          className="max-h-[600px] object-contain"
        />
      </div>

      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 p-6">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          IIPS - ICG
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Welcome to IIPS ID Card Generation Platform
        </p>

        <form
          onSubmit={submitHandler}
          className="w-full max-w-md space-y-5 bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="text-center font-semibold text-2xl text-gray-700">
            Login as Admin
          </div>

          <input
            type="text"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={changeHandler}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring"
          />

          <input
            type="text"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={changeHandler}
            className="w-full p-3 border rounded-xl focus:outline-none focus:ring"
          />

          <button
            type="submit"
            className="w-full p-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition"
          >
            Log In
          </button>
          <p className="text-center text-sm text-gray-600">
  Don&apos;t have an admin account?{" "}
  <span
    className="text-orange-600 cursor-pointer hover:underline font-medium"
    onClick={() => navigate("/Signup")}
  >
    Create Account
  </span>
</p>
        </form>
      </div>
    </div>
  );
}
