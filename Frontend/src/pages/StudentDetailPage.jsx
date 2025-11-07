import React, { useState, useEffect } from "react";
import { getAllCourses, getStudentsByCourse } from "../api/templatesApi";
import { toast } from "react-hot-toast";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer";
import Sidebar from "../components/Sidebar";
import { FaSpinner } from "react-icons/fa";

const StudentDetailPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [students, setStudents] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoadingCourses(true);
        const data = await getAllCourses();
        setCourses(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch courses");
      } finally {
        setLoadingCourses(false);
      }
    };
    fetchCourses();
  }, []);

  // Fetch students on course select
  useEffect(() => {
    if (!selectedCourseId) {
      setStudents([]);
      return;
    }

    const fetchStudents = async () => {
      try {
        setLoadingStudents(true);
        const data = await getStudentsByCourse(selectedCourseId);
        setStudents(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch students");
      } finally {
        setLoadingStudents(false);
      }
    };
    fetchStudents();
  }, [selectedCourseId]);

  return (
    <>
      <Navbar />
      <div className="flex bg-gray-50 min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8 space-y-8">
          {/* Header & Course Select */}
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Student Details
            </h2>
            <div className="w-full md:w-1/2">
              {loadingCourses ? (
                <div className="flex items-center justify-center gap-2 text-blue-500 font-semibold">
                  <FaSpinner className="animate-spin text-xl" />
                  Loading courses...
                </div>
              ) : (
                <select
                  value={selectedCourseId || ""}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  className="w-full text-center text-lg font-semibold border border-gray-300 rounded-lg px-6 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="">-- Select a course --</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.courseName}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Student Table */}
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            {loadingStudents ? (
              <div className="flex justify-center items-center h-64 text-blue-500 text-lg font-semibold">
                <FaSpinner className="animate-spin mr-2 text-xl" />
                Loading students...
              </div>
            ) : students.length === 0 ? (
              <div className="flex justify-center items-center h-64 text-gray-500 font-medium">
                No students found for this course.
              </div>
            ) : (
              <table className="min-w-full table-auto">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-3 text-center text-lg font-medium uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-center text-lg font-medium uppercase tracking-wider">
                      Roll No
                    </th>
                    <th className="px-6 py-3 text-center text-lg font-medium uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-center text-lg font-medium uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-center text-lg font-medium uppercase tracking-wider">
                      Admission Batch
                    </th>
                    <th className="px-6 py-3 text-center text-lg font-medium uppercase tracking-wider">
                      Course ID
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr
                      key={student.id}
                      className="hover:bg-blue-50 transition duration-150"
                    >
                      <td className="px-6 py-4 text-center text-gray-800 font-medium">
                        {student.firstName} {student.lastName}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-700">
                        {student.rollNo}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-700">
                        {student.emailAddress}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-700">
                        {student.phoneNo}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-700">
                        {student.admissionBatch}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-700">
                        {student.courseId}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default StudentDetailPage;
