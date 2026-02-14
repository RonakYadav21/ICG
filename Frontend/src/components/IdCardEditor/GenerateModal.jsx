import React, { useState, useEffect } from "react";
import { getAllCourses, getStudentsByCourse } from "../../api/templatesApi";

const GenerateModal = ({ isOpen, onClose, onGenerate }) => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getAllCourses().then(setCourses).catch(console.error);
    }
  }, [isOpen]);

  const handleCourseChange = async (e) => {
    const courseId = e.target.value;
    setSelectedCourse(courseId);

    if (!courseId) {
      setStudents([]);
      setSelectedStudents([]);
      setSelectAll(false);
      return;
    }

    const studentsData = await getStudentsByCourse(courseId);
    setStudents(studentsData);
    setSelectedStudents([]);
    setSelectAll(false);
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedStudents(students.map((s) => s.id.toString()));
    } else {
      setSelectedStudents([]);
    }
    setSelectAll(!selectAll);
  };

  const handleStudentToggle = (id) => {
    const strId = id.toString();
    let newSelection;
    if (selectedStudents.includes(strId)) {
      newSelection = selectedStudents.filter((sid) => sid !== strId);
      setSelectAll(false);
    } else {
      newSelection = [...selectedStudents, strId];
      if (newSelection.length === students.length) setSelectAll(true);
    }
    setSelectedStudents(newSelection);
  };

  const handleSubmit = () => {
    if (!selectedCourse || selectedStudents.length === 0) {
      alert("Please select a course and at least one student");
      return;
    }

    onGenerate({
      courseId: Number(selectedCourse),
      selectedStudentIds: selectedStudents.map((s) => Number(s)),
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-white/80">
      {/* Modal */}
      <div className="relative w-[90vw] max-w-5xl h-[80vh] bg-white rounded-xl shadow-lg p-6 overflow-auto pointer-events-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Generate ID Cards
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Select Course
          </label>
          <select
            value={selectedCourse || ""}
            onChange={handleCourseChange}
            className="w-full border rounded-lg p-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select a course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.courseId}>
                {c.courseName}
              </option>
            ))}
          </select>
        </div>

        {students.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block font-medium text-gray-700">
                Select Students
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  id="selectAllStudents"
                />
                <label htmlFor="selectAllStudents" className="text-gray-700">
                  Select All
                </label>
              </div>
            </div>
            <div className="max-h-[60vh] overflow-auto border rounded-lg p-3">
              {students.map((s) => (
                <div key={s.id} className="flex items-center gap-2 mb-1">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(s.id.toString())}
                    onChange={() => handleStudentToggle(s.id)}
                  />
                  <span>
                    {s.firstName} {s.lastName} ({s.enrollmentNo})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateModal;
