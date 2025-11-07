import React from "react";
import { FaEdit, FaUsers } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <aside className="w-64 bg-white shadow-md h-screen sticky top-0">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Admin Panel</h1>
          <nav className="space-y-4">
            <button
              onClick={() => navigate("/admin-dashboard")}
              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              <FaEdit /> Dashboard
            </button>
            <button
              onClick={() => navigate("/admin-dashboard/student-details")}
              className="flex items-center gap-3 w-full px-4 py-2 rounded-lg hover:bg-gray-100 text-gray-700 font-medium transition"
            >
              <FaUsers /> Student Details
            </button>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
