import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <footer className="w-full bg-primary text-white py-12 px-20 mt-20 font-body">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-3xl font-heading font-bold">IIPS-ICG</h2>
            <p className="mt-4 text-white/80 leading-relaxed max-w-sm text-[18px]">
              A smarter, secure platform to create, manage & export student ID
              cards.
            </p>
          </div>
          {/* Links */}
          <div>
            <h3 className="text-[20px] font-heading font-semibold">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2 text-[18px] text-white/80 cursor-pointer">
              <li
                className="hover:text-white transition"
                onClick={() => {
                  navigate("/");
                }}
              >
                Dashboard
              </li>
              <li
                className="hover:text-white transition"
                onClick={() => {
                  navigate("/about");
                }}
              >
                About Us
              </li>
              <li
                className="hover:text-white transition"
                onClick={() => {
                  navigate("/contact");
                }}
              >
                Contact Us
              </li>
              <li
                className="hover:text-white transition"
                onClick={() => {
                  navigate("/admin-dashboard");
                }}
              >
                Admin Login
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-heading font-semibold">Contact</h3>
            <p className="mt-4 text-white/80 text-[18px]">
              Indore, Madhya Pradesh
            </p>
            <p className="text-white/80 text-[18px]">
              Email: khansarah0716@gmail.com
            </p>
          </div>
        </div>

        <hr className="border-white/30 my-10" />

        <p className="text-center text-white/70">
          © {new Date().getFullYear()} IIPS-ICG. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
