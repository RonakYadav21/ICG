import axios from "axios";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const API_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
      const res = await axios.post(`${API_URL}/auth/login`, formData);
      const data = await res.data;
      login(data.token);
      toast.success("Login successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <div>
      <form onSubmit={submitHandler} action="">
        <input
          type="text"
          className=""
          placeholder="enter your email"
          value={formData.email}
          onChange={changeHandler}
        />
        <input
          type="password"
          className=""
          placeholder="enter your password"
          value={formData.password}
          onChange={changeHandler}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Login;
