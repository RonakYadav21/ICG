import React, { useState, useEffect } from "react";

const GenerateModal = ({ isOpen, onClose, onGenerate }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Fetch courses when modal opens
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/api/courses");
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };

    if (isOpen) {
      fetchCourses();
    }
  }, [isOpen]);

  // Fetch students when course is selected
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedCourse) return;

      try {
        setLoading(true);
        const response = await fetch(
          `/api/students/by-course/${selectedCourse}`
        );
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedCourse]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">Generate ID Cards</h2>

        {/* Course Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Select Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => {
              setSelectedCourse(e.target.value);
              setSelectedStudents([]);
            }}
            className="w-full p-2 border rounded"
          >
            <option value="">Choose a course...</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>

        {/* Student Selection */}
        {selectedCourse && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">
                Select Students
              </label>
              <button
                onClick={() => setSelectedStudents(students.map((s) => s._id))}
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                Select All
              </button>
            </div>
            <div className="max-h-[300px] overflow-y-auto border rounded p-2">
              {loading ? (
                <div className="text-center py-4">Loading students...</div>
              ) : (
                students.map((student) => (
                  <label
                    key={student._id}
                    className="flex items-center p-2 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student._id)}
                      onChange={(e) => {
                        setSelectedStudents((prev) =>
                          e.target.checked
                            ? [...prev, student._id]
                            : prev.filter((id) => id !== student._id)
                        );
                      }}
                      className="mr-2"
                    />
                    <span>{student.name}</span>
                  </label>
                ))
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onGenerate({ courseId: selectedStudents, selectedStudents })
            }
            disabled={loading || selectedStudents.length === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Generate Cards
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateModal;
