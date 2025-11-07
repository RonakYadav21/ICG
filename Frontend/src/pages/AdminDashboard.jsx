import { FaUsers, FaFileAlt, FaEdit } from "react-icons/fa";
import StudentDetailPage from "./StudentDetailPage";
import EditorPage from "./EditorPage";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer";
import Sidebar from "../components/Sidebar";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="flex bg-gray-100 min-h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-8 space-y-8">
          {/* Dashboard Header */}
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-800">
              Dashboard Overview
            </h2>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <FaUsers className="text-3xl text-blue-500" />
                <div>
                  <p className="text-gray-500 text-xl">Total Students</p>
                  <p className="text-2xl font-bold text-gray-800">120</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <FaFileAlt className="text-3xl text-green-500" />
                <div>
                  <p className="text-gray-500 text-xl">Templates Created</p>
                  <p className="text-2xl font-bold text-gray-800">15</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <FaEdit className="text-3xl text-yellow-500" />
                <div>
                  <p className="text-gray-500 text-xl">Pending Approvals</p>
                  <p className="text-2xl font-bold text-gray-800">5</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <FaUsers className="text-3xl text-red-500" />
                <div>
                  <p className="text-gray-500 text-xl">Active Users</p>
                  <p className="text-2xl font-bold text-gray-800">80</p>
                </div>
              </div>
            </div>
          </div>

          {/* Editor Section */}
          <div className="bg-white rounded-lg p-8 shadow">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              ID Card Template Editor
            </h3>
            <EditorPage />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
