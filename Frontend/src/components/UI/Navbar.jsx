import { useState } from "react";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const admin = useAuth();
  const location = useLocation();
  console.log(admin);

  const navItems = [
    { id: "dashboard", label: "Dashboard", path: "/" },
    { id: "about", label: "About Us", path: "/about" },
    { id: "contact", label: "Contact Us", path: "/contact" },
  ];

  function pathMatch(path) {
    return matchPath({ path }, location.pathname);
  }

  return (
    <div>
      {" "}
      <nav className="flex justify-between items-center p-5 border-b shadow-sm border-primary font-heading text-xl bg-bg">
        {/* Logo */}
        <h1
          className="font-bold text-3xl cursor-pointer text-primary ml-28"
          onClick={() => {
            navigate("/");
          }}
        >
          IIPS-ICG
        </h1>

        {/* Navigation Links */}
        <ul className="flex items-center gap-10 text-xl">
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`cursor-pointer transition px-3 py-1 rounded-md
                ${
                  pathMatch(item?.path)
                    ? "bg-gray-200 text-black shadow-md"
                    : "text-text hover:text-primary"
                }`}
              onClick={() => {
                navigate(item.path);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* Login  Button */}
        {admin?.user ? (
          <div className="flex items-center gap-4 mr-10">
            <span className="text-primary font-semibold">{admin.user.sub}</span>

            <button
              className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600 transition"
              onClick={admin.logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="bg-primary text-white px-5 py-2 rounded-md cursor-pointer hover:bg-primary-dark transition mr-25"
            onClick={() => navigate("/login")}
          >
            Login As Admin
          </button>
        )}

        {/* Logout button */}
      </nav>
    </div>
  );
};

export default Navbar;
