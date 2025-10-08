import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClasses =
    "block py-2 px-4 rounded hover:bg-blue-100 transition text-gray-700";
  const activeClasses = "bg-blue-500 text-white font-medium";

  return (
    <div className="w-56 min-h-screen bg-gray-50 border-r sticky top-0 p-4">
      <h2 className="text-lg font-bold mb-4">Dashboard</h2>

      <nav className="flex flex-col gap-2">
        <NavLink
          to="/student-registration"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeClasses : ""}`
          }
        >
          Student Registration
        </NavLink>

        <NavLink
          to="/id-card-status"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeClasses : ""}`
          }
        >
          ID Card Status
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeClasses : ""}`
          }
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${linkClasses} ${isActive ? activeClasses : ""}`
          }
        >
          Contact Us
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
