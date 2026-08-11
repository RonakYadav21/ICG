import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/axios";

const AddCourse = () => {
  const navigate = useNavigate();

  const [courseName, setCourseName] = useState("");
  const [courseId, setCourseId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseName.trim() || !courseId.trim()) {
      alert("Please enter both Course Name and Course ID");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/templates/addcourse",
        {
          courseName,
          courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log("Course added:", response.data);

      alert("Course added successfully");

      setCourseName("");
      setCourseId("");

      navigate("/admin-dashboard");
    } catch (error) {
      console.error("Failed to add course:", error);

      alert(error.response?.data?.message || "Failed to add course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="mx-auto max-w-xl">
          <div className="rounded-3xl bg-white p-8 shadow-lg">
            <h1 className="text-3xl font-bold text-slate-900">
              Add New Course
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Add a course that students can select during registration.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* Course Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Course Name
                </label>

                <input
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="B.Tech Information Technology"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-900"
                />
              </div>

              {/* Course ID */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Course ID
                </label>

                <input
                  type="text"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  placeholder="BTECH-IT"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 uppercase outline-none focus:border-slate-900"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => navigate("/admin-dashboard")}
                  className="flex-1 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
                >
                  {loading ? "Adding..." : "Add Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourse;
