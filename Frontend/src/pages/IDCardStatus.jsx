import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const IDCardStatus = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api";

  const [email, setEmail] = useState("");
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);

  // Check student ID card status (NOT currently used)
  const checkStatus = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");

    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/studentStatus?email=${email}`);
      setStudent(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        toast.error("No registration found");
        setStudent(null);
      } else {
        toast.error("Error fetching status");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Check ID Card Status</h2>

      <form onSubmit={checkStatus} className="flex gap-2 mb-6">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Check
        </button>
      </form>

      {loading && <p className="text-center">Loading...</p>}

      {student && student.status !== "Approved" && (
        <p className="text-center text-yellow-600 font-bold text-lg">
          Status: {student.status}
        </p>
      )}

      {student && student.status === "Approved" && (
        <div className="border p-4 rounded shadow text-center bg-gray-50">
          <img
            src={student.digitalCardUrl}
            alt="Digital ID Card"
            className="mx-auto w-64 h-auto mb-4 rounded"
          />
          <p className="font-bold text-lg">{student.firstName} {student.lastName}</p>
          <p>Roll No: {student.rollNo}</p>
          <p>Program: {student.programName}</p>
          <p>Batch: {student.batch}</p>
          <p className="text-green-600 font-semibold mt-2">ID Card Approved ✅</p>
        </div>
      )}
    </div>
  );
};

export default IDCardStatus;
