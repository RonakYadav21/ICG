export default function CourseSelector({ courses, value, onChange, loading }) {
  return (
    <label className="block text-sm font-semibold text-[#6f4835]">
      Course
      <select
        value={value || ""}
        onChange={(event) => onChange(event.target.value)}
        disabled={loading}
        className="mt-2 w-full rounded-xl border border-[#e7c9b6] bg-white px-4 py-3 text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
      >
        <option value="">
          {loading ? "Loading courses…" : "Select a course"}
        </option>
        {courses.map((course) => (
          <option key={course.id || course.courseId} value={course.courseId}>
            {course.courseName || course.name}
          </option>
        ))}
      </select>
    </label>
  );
}
