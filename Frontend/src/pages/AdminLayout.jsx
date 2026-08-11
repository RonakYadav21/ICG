import { NavLink, Outlet } from "react-router-dom";
import { FiFileText, FiUsers, FiPlus, FiUser } from "react-icons/fi";

const AdminLayout = () => {
  const linkClass = ({ isActive }) =>
    `inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-primary text-white"
        : "bg-white text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <div className="min-h-screen bg-[#faf8f6]">
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold text-heading">Admin Dashboard</h1>
        </div>

        <div className="mx-auto flex justify-center max-w-7xl gap-3 px-6 pb-4">
          <NavLink to="/admin-dashboard/" className={linkClass}>
            <FiUser />
            Admin Dashboard
          </NavLink>

          <NavLink to="/admin-dashboard/editor" className={linkClass}>
            <FiPlus />
            New Template
          </NavLink>

          <NavLink to="/admin-dashboard/templates" className={linkClass}>
            <FiFileText />
            Manage Templates
          </NavLink>

          <NavLink to="/admin-dashboard/student-details" className={linkClass}>
            <FiUsers />
            Student Details
          </NavLink>

          <NavLink to="/admin-dashboard/pending-admins" className={linkClass}>
            <FiUsers />
            Admin Approval
          </NavLink>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
