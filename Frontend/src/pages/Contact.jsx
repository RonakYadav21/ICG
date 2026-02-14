import React from "react";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer";
import saara_img from "../assets/saara_2.jpeg";
import ronak_img from "../assets/ronak.jpeg";
const Contact = () => {
  return (
    <div>
      <Navbar />

      {/* CONTACT SECTION */}
      <section className="w-full px-20 py-24 bg-white text-text">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-6xl font-heading font-bold text-primary leading-tight">
            Contact <span className="text-black">Us</span>
          </h1>

          <p className="text-text-secondary mt-6 text-xl leading-relaxed">
            Have questions? We’d love to hear from you!
          </p>

          {/* Divider */}
          <div className="w-full flex justify-center mt-8">
            <div className="border-b-2 border-primary w-[90px]" />
          </div>
        </div>

        {/* CONTACT FORM + DETAILS */}
        <div className="mt-20 flex flex-col md:flex-row gap-16">
          {/* FORM */}
          <form
            action="https://formsubmit.co/khansarah0716@gmail.com"
            method="POST"
            className="flex-1 bg-bg rounded-2xl shadow-lg p-10 border border-primary/40"
          >
            <h2 className="text-3xl font-heading font-semibold text-primary mb-6">
              Send a Message
            </h2>

            {/* Name */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-primary"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-primary"
                placeholder="Enter your email"
              />
            </div>

            {/* Message */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-2">Message</label>
              <textarea
                name="message"
                required
                rows="6"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-primary"
                placeholder="Write your message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-7 py-3 text-lg font-semibold bg-primary text-white rounded-md shadow hover:bg-primary-dark transition-all cursor-pointer w-full"
            >
              Submit
            </button>
          </form>

          {/* CONTACT INFO */}
          <div className="flex-1 bg-primary/10 border border-primary rounded-2xl p-10 shadow-sm">
            <h2 className="text-3xl font-heading font-semibold text-primary mb-6">
              Contact Details
            </h2>

            <p className="text-text-secondary leading-relaxed text-xl mb-6">
              You can reach us anytime for concerns, queries, or suggestions.
            </p>

            <ul className="space-y-4 text-lg text-text-secondary">
              <li>
                📍 <b>Address:</b> IIPS DAVV, Indore (M.P), India
              </li>
              <li>
                📧 <b>Email:</b> khansarah0716@gmail.com
              </li>
              <li>
                🕒 <b>Hours:</b> Mon–Fri: 10:00 AM – 6:00 PM
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="w-full px-20 py-24 bg-gradient-to-tr from-[#ffeacc97] to-white text-text">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-6xl font-heading font-bold text-primary leading-tight">
            Meet Our <span className="text-black">Team</span>
          </h1>

          <p className="text-text-secondary mt-6 text-xl leading-relaxed">
            A group of passionate developers behind this platform.
          </p>

          <div className="w-full flex justify-center mt-8">
            <div className="border-b-2 border-primary w-[90px]" />
          </div>
        </div>

        {/* TEAM CARDS */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-14">
          {/* CARD 1 */}
          <div className="rounded-2xl border border-primary/40 bg-white p-10 shadow-lg text-center hover:-translate-y-2 transition-all">
            <img
              src={saara_img}
              alt="Sara"
              className="w-36 h-36 rounded-full object-cover mx-auto border-4 border-primary"
            />

            <h3 className="text-3xl font-heading font-semibold mt-6 text-primary">
              Saara Khan
            </h3>

            <p className="text-text-secondary mt-3 text-lg">
              MERN Stack Developer <br /> Contributed to Frontend
            </p>

            <div className="flex gap-6 justify-center mt-6">
              <a
                className="text-primary font-semibold hover:underline"
                href="https://github.com/saarakhan"
                target="_blank"
              >
                GitHub
              </a>
              <a
                className="text-primary font-semibold hover:underline"
                href="https://linkedin.com/saarakhan001"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* CARD 2 */}
          <div className="rounded-2xl border border-primary/40 bg-white p-10 shadow-lg text-center hover:-translate-y-2 transition-all">
            <img
              src={ronak_img}
              alt="Ronak"
              className="w-36 h-36 rounded-full object-cover mx-auto border-4 border-primary"
            />

            <h3 className="text-3xl font-heading font-semibold mt-6 text-primary">
              Ronak
            </h3>

            <p className="text-text-secondary mt-3 text-lg">
              Backend Developer <br /> Contributed to Backend
            </p>

            <div className="flex gap-6 justify-center mt-6">
              <a
                className="text-primary font-semibold hover:underline"
                href="https://github.com/RonakYadav21"
                target="_blank"
              >
                GitHub
              </a>
              <a
                className="text-primary font-semibold hover:underline"
                href="https://www.linkedin.com/in/ronak-yadav-63859b292/"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
