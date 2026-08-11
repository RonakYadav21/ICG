const fullName = (student) =>
  `${student.firstName || ""} ${student.lastName || ""}`.trim() ||
  "Unnamed student";

export default function StudentTable({ students, loading }) {
  const verifyHandler = async (studentId) => {
    try {
      await verifyStudent(studentId);
    } catch (error) {
      console.log(error);
    }
  };
  if (loading)
    return (
      <div className="rounded-2xl bg-[#fff8f0] p-8 text-center text-[#8b6a59]">
        Loading students…
      </div>
    );
  if (!students.length)
    return (
      <div className="rounded-2xl border border-dashed border-[#d9bba5] bg-[#fff8f0] p-8 text-center text-sm text-[#8b6a59]">
        Choose a course to view its enrolled students.
      </div>
    );
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#ead4c4] bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[#fff1e5] text-xs uppercase tracking-wide text-[#8b5a40]">
          <tr>
            <th className="px-5 py-4">Student</th>
            <th className="px-5 py-4">Enrollment</th>
            <th className="px-5 py-4">Contact</th>
            <th className="px-5 py-4">Program</th>
            <th className="px-5 py-4">Verfify</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#f1e1d5]">
          {students.map((student) => (
            <tr key={student.id || student.enrollmentNo} className="">
              <td className="px-5 py-4">
                <p className="font-semibold text-heading">
                  {fullName(student)}
                </p>
                <p className="mt-1 text-xs text-[#907463]">
                  Roll no. {student.rollNo || "—"}
                </p>
              </td>
              <td className="px-5 py-4 text-[#6f4835]">
                {student.enrollmentNo || "—"}
              </td>
              <td className="px-5 py-4">
                <p className="text-slate-700">{student.emailAddress || "—"}</p>
                <p className="mt-1 text-xs text-[#907463]">
                  {student.phoneNo || "—"}
                </p>
              </td>
              <td className="px-5 py-4 text-[#6f4835]">
                {student.programName || "—"}
              </td>
              <td>
                <button
                  className="bg-green-500 p-2 rounded text-white cursor-pointer hover:text-gray-500"
                  onClick={() => verifyHandler(student.id)}
                >
                  verify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
import { verifyStudent } from "../../api/templatesApi";
