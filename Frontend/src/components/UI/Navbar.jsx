import { matchPath, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const admin = useAuth();
  const location = useLocation();

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
      <nav className="flex justify-between items-center p-5 shadow-sm font-heading text-sm bg-bg">
        <h1
          className="font-bold text-3xl cursor-pointer text-primary ml-28"
          onClick={() => {
            navigate("/");
          }}
        >
          IIPS ICG
        </h1>

        <ul className="flex items-center gap-10 text-[16px]">
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
          <div className="flex gap-2">
            <button
              className="rounded-md bg-[#DD6031] px-6 py-3 font-semibold text-white shadow-lg shadow-[#DD6031]/30 transition-all hover:-translate-y-0.5 hover:bg-[#B84B22] cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login As Admin
            </button>
            <button
              className="rounded-md border border-[#DD6031] px-6 py-3 font-semibold text-[#7A3A18] transition-all hover:-translate-y-0.5 hover:bg-[#DD6031] hover:text-white cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Signup As Admin
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
