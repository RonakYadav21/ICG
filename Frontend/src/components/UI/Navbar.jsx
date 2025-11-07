import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("dashboard");

  const navItems = [
    { id: "dashboard", label: "Dashboard", path: "/" },
    { id: "about", label: "About Us", path: "/about" },
    { id: "contact", label: "Contact Us", path: "/contact" },
  ];

  return (
    <div>
      {" "}
      <nav className="flex justify-between items-center p-5 border-b shadow-sm border-primary font-heading text-xl bg-bg">
        {/* Logo */}
        <h1
          className="font-bold text-3xl cursor-pointer text-primary ml-28"
          onClick={() => {
            setCurrentTab("dashboard");
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
                  currentTab === item.id
                    ? "bg-gray-200 text-black shadow-md"
                    : "text-text hover:text-primary"
                }`}
              onClick={() => {
                setCurrentTab(item.id);
                navigate(item.path);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>

        {/* Login Button */}
        <button
          className="bg-primary text-white px-5 py-2 rounded-md cursor-pointer hover:bg-primary-dark transition mr-25"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
