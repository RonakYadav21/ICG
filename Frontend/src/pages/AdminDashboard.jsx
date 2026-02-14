import { FaUsers, FaFileAlt, FaEdit, FaArrowRight } from "react-icons/fa";
import EditorPage from "./EditorPage";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,#f9f5ff_0%,#fef7ef_35%,#f8fbff_70%)]">
        <div className="pointer-events-none absolute -top-20 -right-24 h-80 w-80 rounded-full bg-[conic-gradient(from_120deg,#ffb997,#ffd6a5,#bde0fe,#cdb4db)] opacity-30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[radial-gradient(circle,#f7cad0_0%,#e2ece9_50%,transparent_70%)] opacity-40 blur-2xl" />
        {/* Main Content */}
        <main className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10 md:px-10 lg:px-12 space-y-10">
          {/* Dashboard Header */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-black/60 shadow-sm">
                Admin Console
              </span>
              <h2 className="text-4xl font-bold text-slate-900 md:text-5xl">
                Dashboard Overview
              </h2>
              <p className="max-w-2xl text-lg text-slate-600">
                Keep an eye on activity, manage templates, and move students
                through approval without the clutter.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/25 transition hover:-translate-y-0.5 hover:bg-slate-800"
                onClick={() => {
                  document
                    .getElementById("template-editor")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Open Editor
              </button>
              <button
                className="rounded-full border border-slate-900/15 bg-white/70 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-900/30 hover:text-slate-900"
                onClick={() => navigate("/admin-dashboard/student-details")}
              >
                Review Students
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total Students",
                value: "120",
                icon: <FaUsers />,
                tone: "from-blue-500/20 to-blue-500/5 text-blue-600",
              },
              {
                label: "Templates Created",
                value: "15",
                icon: <FaFileAlt />,
                tone: "from-emerald-500/20 to-emerald-500/5 text-emerald-600",
              },
              {
                label: "Pending Approvals",
                value: "5",
                icon: <FaEdit />,
                tone: "from-amber-400/20 to-amber-400/5 text-amber-600",
              },
              {
                label: "Active Users",
                value: "80",
                icon: <FaUsers />,
                tone: "from-rose-500/20 to-rose-500/5 text-rose-600",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="group relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_15px_45px_-25px_rgba(15,23,42,0.45)] backdrop-blur transition hover:-translate-y-1 hover:shadow-[0_25px_60px_-25px_rgba(15,23,42,0.45)]"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.tone} opacity-0 transition group-hover:opacity-100`}
                />
                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      {stat.label}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-slate-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/80 text-2xl shadow-inner">
                    {stat.icon}
                  </div>
                </div>
                <div className="relative mt-6 flex items-center gap-2 text-sm font-semibold text-slate-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  Updated a few minutes ago
                </div>
              </div>
            ))}
          </div>

          {/* Editor Section */}
          <div
            id="template-editor"
            className="rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[0_20px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-2xl font-semibold text-slate-900">
                ID Card Template Editor
              </h3>
              <span className="rounded-full bg-slate-900/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Live workspace
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Build and preview templates in real time. Save drafts before
              exporting a batch.
            </p>
            <EditorPage />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
