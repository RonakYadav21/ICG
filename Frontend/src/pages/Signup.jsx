import React, { useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const API_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

    console.log({ formData: formData });
    try {
      await axios.post(`${API_URL}/signup`, formData);
      toast.success("account created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler} action="">
        <h2 className="">Create your account</h2>
        <input
          type="text"
          name="name"
          className=""
          placeholder="enter your name"
          value={formData.name}
          onChange={changeHandler}
        />
        <input
          type="text"
          name="email"
          className=""
          placeholder="enter your email"
          value={formData.email}
          onChange={changeHandler}
        />
        <input
          type="password"
          name="password"
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

export default Signup;
