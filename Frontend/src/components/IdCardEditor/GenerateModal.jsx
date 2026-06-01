import React, { useState, useEffect } from "react";
import { getAllCourses, getStudentsByCourse } from "../../api/templatesApi";

const GenerateModal = ({ isOpen, onClose, onGenerate }) => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (isOpen) {
      getAllCourses()
        .then(setCourses)
        .catch(console.error);

      // prevent body scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
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

    try {
      const studentsData = await getStudentsByCourse(courseId);

      setStudents(studentsData || []);
      setSelectedStudents([]);
      setSelectAll(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectAll = () => {
    if (!selectAll) {
      setSelectedStudents(
        students.map((s) => s.id.toString())
      );
    } else {
      setSelectedStudents([]);
    }

    setSelectAll(!selectAll);
  };

  const handleStudentToggle = (id) => {
    const strId = id.toString();

    let updated = [];

    if (selectedStudents.includes(strId)) {
      updated = selectedStudents.filter(
        (sid) => sid !== strId
      );
      setSelectAll(false);
    } else {
      updated = [...selectedStudents, strId];

      if (updated.length === students.length) {
        setSelectAll(true);
      }
    }

    setSelectedStudents(updated);
  };

  const handleSubmit = () => {
    if (!selectedCourse) {
      alert("Please select a course");
      return;
    }

    if (selectedStudents.length === 0) {
      alert("Please select at least one student");
      return;
    }

    onGenerate({
      courseId: Number(selectedCourse),
      selectedStudentIds: selectedStudents.map(Number),
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4">
      {/* Modal */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b bg-white sticky top-0 z-10">
          <h2 className="text-2xl font-bold text-gray-800">
            Generate ID Cards
          </h2>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* Course */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-gray-700">
              Select Course
            </label>

            <select
              value={selectedCourse}
              onChange={handleCourseChange}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a course</option>

              {courses.map((c) => (
                <option key={c.id} value={c.courseId}>
                  {c.courseName}
                </option>
              ))}
            </select>
          </div>

          {/* Students */}
          {students.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="font-semibold text-gray-700">
                  Select Students
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  Select All
                </label>
              </div>

              <div className="border rounded-xl p-3 max-h-[350px] overflow-y-auto bg-gray-50">
                {students.map((s) => (
                  <label
                    key={s.id}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-white cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(
                        s.id.toString()
                      )}
                      onChange={() =>
                        handleStudentToggle(s.id)
                      }
                    />

                    <span className="text-gray-800">
                      {s.firstName} {s.lastName}
                    </span>

                    <span className="text-sm text-gray-500">
                      ({s.enrollmentNo})
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-6 py-4 bg-white sticky bottom-0 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
          >
            Generate
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateModal;