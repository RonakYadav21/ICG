import { useNavigate } from "react-router-dom";
import Footer from "../components/UI/Footer";
import Navbar from "../components/UI/Navbar";
import id_card from "../assets/id_cards.png";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* NAVBAR */}
      <Navbar />
      {/* HERO SECTION */}
      <div className="w-full min-h-[100vh] bg-gradient-to-br from-[#ffeacc97] to-[#FFFFFF] flex flex-col md:flex-row items-center justify-center px-8  gap-10 ">
        {/* LEFT COLUMN */}
        <div className="w-full md:w-1/2 flex flex-col gap-6 text-left px-30">
          {/* Small Tag */}
          <div className="inline-block border border-[#C8663C] px-4 py-1 rounded-full bg-white/60 shadow-xl max-w-100 ">
            <p className="text-[#C8663C] text-[15px] font-semibold tracking-wide">
              International Institute of Professional Studies
            </p>
          </div>

          {/* Heading */}
          <h1 className="font-heading text-4xl md:text-7xl font-extrabold text-[#3B2B1B] leading-tight">
            WELCOME TO <span className="text-[#C8663C]">IIPS</span> <br />
            ID CARD GENERATION <br />
            PLATFORM
          </h1>

          {/* Subtitle */}
          <p className="text-[#6e6e6e] font-body text-[20px] max-w-md leading-relaxed">
            A smarter way to generate and manage IDs. <br />
            Seamless, secure, and stress-free.
          </p>

          {/* Buttons */}
          <div className="flex gap-5 mt-4">
            <button
              onClick={() => {
                navigate("/student-registration");
              }}
              className="px-7 py-3 text-lg font-semibold bg-[#C8663C] text-white rounded-md shadow hover:bg-[#A84E27] transition-all cursor-pointer"
            >
              Register now
            </button>

            <button
              onClick={() => {
                navigate("/admin-dashboard");
              }}
              className="px-7 py-3 text-lg font-semibold border border-[#C8663C] text-[#C8663C] rounded-md shadow hover:bg-[#C8663C] hover:text-white transition-all cursor-pointer"
            >
              Admin Dashboard
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          <img src={id_card} alt="id" className="" />
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="w-full py-24 bg-white font-body">
        <div className="text-center">
          <h1 className="text-5xl font-heading font-bold text-[#1E1E24]">
            How It <span className="text-primary">Works</span>
          </h1>
          <p className="text-[#6E6E6E] mt-3 text-xl">
            Simple 3-step process to generate ID Cards
          </p>
        </div>

        <div className="mt-16 relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-[#FFC300]/40"></div>

          {[
            {
              title: "Student Registration",
              desc: "Students register with personal details, select program and upload a profile picture.",
              color: "#FFC300",
            },
            {
              title: "Admin Creates Templates",
              desc: "Admins design, edit & manage multiple templates that fit institutional branding.",
              color: "#4E6F4F",
            },
            {
              title: "Export",
              desc: "Admin selects template & student batch and exports ID cards as PNG or ZIP files.",
              color: "#DD6031",
            },
          ].map((step, i) => (
            <div
              key={i}
              className={`flex items-center w-full mb-16 ${
                i % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              {/* Text Block */}
              <div className="w-1/2 px-6">
                <h2
                  className="font-heading text-4xl font-semibold"
                  style={{ color: step.color }}
                >
                  {step.title}
                </h2>
                <p className="text-[#6E6E6E] mt-2 text-lg leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Center icon */}
              <div
                className="w-16 h-16 rounded-full border-4 flex items-center justify-center shadow-lg z-10 text-2xl font-bold"
                style={{
                  borderColor: step.color,
                  color: step.color,
                }}
              >
                {i + 1}
              </div>

              {/* Spacer */}
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      {/* PLATFORM FEATURES */}
      <section className="w-full py-28 text-text mt-28 px-20 bg-gradient-to-br from-[#ffeacc97] to-[#ffffff]">
        {/* HEADING */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-6xl font-heading font-bold text-primary leading-tight">
            Platform <span className="text-black">Features</span>
          </h1>

          <p className="text-text-secondary mt-6 max-w-2xl mx-auto font-body text-xl leading-relaxed">
            A smart, structured workflow for seamless ID card generation.
          </p>

          <div className="flex justify-center mt-8">
            <div className="border-b-2 border-primary w-[90px]" />
          </div>
        </div>

        {/* CARD ROW */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {[
            {
              title: "Register Students",
              desc: "Collect student data & photos securely through an onboarding portal to streamline records.",
            },
            {
              title: "Build Templates",
              desc: "Admins design personalized templates using institute branding and visual guidelines.",
            },
            {
              title: "Approve & Export",
              desc: "Verify card data and export multiple IDs as PNG or ZIP — ready to print.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-10 rounded-2xl shadow-md border bg-white hover:-translate-y-2 transition-all duration-300"
            >
              {/* Number icon */}
              <div
                className="w-16 h-16 rounded-full flex mx-auto items-center justify-center font-heading 
        text-2xl border-2 border-primary text-primary"
              >
                {index + 1}
              </div>

              <h3 className="text-3xl font-heading text-primary mt-6 font-semibold text-center">
                {item.title}
              </h3>

              <p className="text-text-secondary mt-4 text-lg leading-relaxed text-center">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="w-full py-28 text-text mt-28 px-20 ">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-6xl font-heading font-bold text-primary leading-tight">
            Why Choose <span className="text-black">IIPS-ICG?</span>
          </h1>

          <p className="text-text-secondary mt-6 max-w-2xl mx-auto font-body text-xl leading-relaxed">
            A powerful platform crafted for institutional workflows — secure,
            automated & student-centric.
          </p>

          <div className="w-full flex justify-center mt-8">
            <div className="border-b-2 border-primary w-[90px]" />
          </div>
        </div>

        {/* Blocks */}
        <div className="mt-28 flex flex-col gap-28">
          {/* BLOCK 1 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-heading text-primary font-semibold leading-snug">
                Centralized Workflow
              </h2>

              <p className="text-text-secondary mt-6 text-xl font-body leading-relaxed max-w-xl">
                From registration to ID approval — every step happens digitally.
                Students submit details, admins verify, approve & print. No
                paperwork. Minimal effort. Maximum efficiency.
              </p>
            </div>

            <div className="flex-1 bg-primary/10 border border-primary rounded-2xl p-12 shadow-sm hover:-translate-y-2 transition-all">
              <h3 className="font-heading text-2xl mb-4 text-primary">
                Highlights
              </h3>
              <ul className="list-disc pl-6 text-text-secondary font-body text-lg leading-relaxed space-y-2">
                <li>Digital workflow</li>
                <li>Quick approvals</li>
                <li>Structured student data</li>
              </ul>
            </div>
          </div>

          {/* BLOCK 2 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 bg-[#4E6F4F]/10 border border-[#4E6F4F] rounded-2xl p-12 shadow-sm hover:-translate-y-2 transition-all">
              <h3 className="font-heading text-2xl mb-4 text-[#355A3A]">
                Highlights
              </h3>
              <ul className="list-disc pl-6 text-text-secondary font-body text-lg leading-relaxed space-y-2">
                <li>Easy editing tools</li>
                <li>Dynamic placeholders</li>
                <li>Reusable designs</li>
              </ul>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-heading text-primary font-semibold leading-snug">
                Flexible Designs
              </h2>

              <p className="text-text-secondary mt-6 text-xl font-body leading-relaxed max-w-xl">
                Create and manage ID templates visually — colors, layout,
                program information & student fields. Reuse them anytime,
                perfect for batch-wise and department-wise themes.
              </p>
            </div>
          </div>

          {/* BLOCK 3 */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl font-heading text-primary font-semibold leading-snug">
                Trusted & Secure
              </h2>

              <p className="text-text-secondary mt-6 text-xl font-body leading-relaxed max-w-xl">
                Built for privacy & safety — student identity data is encrypted,
                protected & accessible only to authorized personnel.
              </p>
            </div>

            <div className="flex-1 bg-[#DD6031]/10 border border-[#DD6031] rounded-2xl p-12 shadow-sm hover:-translate-y-2 transition-all">
              <h3 className="font-heading text-2xl mb-4 text-[#B5421E]">
                Highlights
              </h3>
              <ul className="list-disc pl-6 text-text-secondary font-body text-lg leading-relaxed space-y-2">
                <li>Encrypted storage</li>
                <li>Admin-only access</li>
                <li>Reliable & audit-safe</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
