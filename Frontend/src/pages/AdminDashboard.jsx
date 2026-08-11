import { FaUsers, FaFileAlt, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { getDashboardStats } from "../api/templatesApi";
import StudentDetailPage from "./StudentDetailPage";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTemplates: 0,
    pendingApprovals: 0,
    activeAdmins: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);
        const response = await getDashboardStats();
        setStats(response);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const dashboardStats = [
    {
      label: "Total Students",
      value: stats?.totalStudents,
      icon: <FaUsers />,
      tone: "from-blue-500/20 to-blue-500/5 text-blue-600",
    },
    {
      label: "Templates Created",
      value: stats?.totalTemplates,
      icon: <FaFileAlt />,
      tone: "from-emerald-500/20 to-emerald-500/5 text-emerald-600",
    },
    {
      label: "Pending Approvals",
      value: stats?.pendingApprovals,
      icon: <FaEdit />,
      tone: "from-amber-400/20 to-amber-400/5 text-amber-600",

      onClick: () => navigate("/admin-dashboard/pending-admins"),
    },
    {
      label: "Active Admins",
      value: stats?.activeAdmins,
      icon: <FaUsers />,
      tone: "from-rose-500/20 to-rose-500/5 text-rose-600",
    },
  ];

  return (
    <>
      <div className="relative min-h-screen overflow-x-hidden ">
        <div className="pointer-events-none absolute -top-20 -right-24 h-80 w-80 rounded-full opacity-30 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full  opacity-40 blur-2xl" />
        <main className="relative z-10 mx-auto w-full max-w-7xl px-6 py-10 md:px-10 lg:px-12 space-y-10">
          

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {dashboardStats.map((stat) => (
              <div
                key={stat.label}
                onClick={stat.onClick}
                className={`group relative overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_15px_45px_-25px_rgba(15,23,42,0.45)] backdrop-blur transition hover:-translate-y-1 
                
                ${stat.onClick ? "cursor-pointer" : ""}
                `}
              >
                <div className={`absolute inset-0 `} />

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      {stat.label}
                    </p>

                    <p className="mt-3 text-3xl font-bold text-slate-900">
                      {loading ? "..." : stat.value}
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

                {stat.onClick && (
                  <p className="mt-3 text-xs text-amber-600 font-semibold">
                    Click to manage pending admins
                  </p>
                )}
              </div>
            ))}
          </div>
        </main>

        <StudentDetailPage />
      </div>
    </>
  );
};

export default AdminDashboard;
