import { useNavigate } from "react-router-dom";
import { HiOutlineArrowUpRight, HiOutlineMapPin } from "react-icons/hi2";
import { HiOutlineMail } from "react-icons/hi";

const Footer = () => {
  const navigate = useNavigate();

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin-dashboard" },
  ];

  return (
    <footer className="bg-[#b74225] text-[#F8F2EC]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="font-heading text-5xl">
            IIPS<span className="text-[#C79745]"> · </span>ICG
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg text-[#D6C8BE]">
            A smarter platform to create, manage and export student ID cards
            with speed, accuracy and security.
          </p>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-10">
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => navigate(link.path)}
              className="group flex items-center gap-1 text-lg transition hover:text-[#C79745] cursor-pointer"
            >
              {link.name}

              <HiOutlineArrowUpRight className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </button>
          ))}
        </div>

        <div className="flex flex-col items-center gap-5 text-[#D6C8BE]">
          <div className="flex items-center mt-2 gap-3">
            <HiOutlineMapPin className="text-[#C79745]" />
            <span>Indore, Madhya Pradesh</span>
          </div>

          <div className="flex items-center gap-3">
            <HiOutlineMail className="text-[#C79745]" />
            <span>khansarah0716@gmail.com</span>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-[#BBAEA4]">
          © {new Date().getFullYear()} IIPS-ICG · Designed & Developed by Saara
          & Ronak
        </div>
      </div>
    </footer>
  );
};

export default Footer;
