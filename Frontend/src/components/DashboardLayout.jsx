// DashboardLayout.jsx
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
