import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import id_card from "../assets/id_cards.png";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";
  const { login } = useAuth();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

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

      const data = res.data;
      login(data.token);

      toast.success("Login successfully!");
      navigate("/admin-dashboard");
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error("Your account is pending approval");
      } else if (err.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Something went wrong");
      }
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
          IIPS ICG
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Welcome to IIPS ID Card Generation Platform
        </p>

        <form
          onSubmit={submitHandler}
          className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg"
        >
          <div className="text-center text-2xl font-semibold text-gray-700">
            Login as Admin
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
              required
              value={formData.email}
              onChange={changeHandler}
              placeholder="Enter your email"
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
                required
                value={formData.password}
                onChange={changeHandler}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-gray-300 p-3 pr-12 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 transition hover:text-orange-600"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-600 p-3 font-semibold text-white transition hover:bg-orange-700 cursor-pointer"
          >
            Log In
          </button>

          <p className="text-center text-sm text-gray-600">
            Don't have an admin account?
            <span
              className="cursor-pointer font-medium text-orange-600 hover:underline"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
