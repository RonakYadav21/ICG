import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CourseSelector from "../components/Students/CourseSelector";
import StudentTable from "../components/Students/StudentTable";
import { getAllCourses, getStudentsByCourse } from "../api/templatesApi";

export default function StudentDetailPage() {
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState("");
  const [students, setStudents] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  useEffect(() => {
    getAllCourses()
      .then(setCourses)
      .catch(() => toast.error("Failed to fetch courses"))
      .finally(() => setLoadingCourses(false));
  }, []);
  useEffect(() => {
    if (!courseId) {
      setStudents([]);
      return;
    }
    setLoadingStudents(true);
    getStudentsByCourse(courseId)
      .then(setStudents)
      .catch(() => toast.error("Failed to fetch students"))
      .finally(() => setLoadingStudents(false));
  }, [courseId]);
  // There are 2 types of student in a course -> verified and unverified
  // Show verified at top and not verified at bottom

  return (
    <main className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a55c37]">
          Student directory
        </p>
        <h1 className="mt-2 font-heading text-4xl text-heading">
          Find students by course
        </h1>
        <p className="mt-2 text-[#7a6256]">
          Review enrollment and contact information before generating ID cards.
        </p>
      </div>
      <section className="rounded-[28px] border border-[#e9c9b0] bg-[#fff8f0] p-5 shadow-sm">
        <div className="max-w-md">
          <CourseSelector
            courses={courses}
            value={courseId}
            onChange={setCourseId}
            loading={loadingCourses}
          />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <h2 className="font-heading text-xl text-heading">
            Enrolled students
          </h2>
          {courseId && (
            <span className="rounded-full bg-[#f9dec9] px-3 py-1 text-xs font-semibold text-[#7a4228]">
              {students.length} students
            </span>
          )}
        </div>
        <div className="mt-4">
          <StudentTable students={students} loading={loadingStudents} />
        </div>
      </section>
    </main>
  );
}
