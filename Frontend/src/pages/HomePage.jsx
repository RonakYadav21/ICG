import { useNavigate } from "react-router-dom";
import Footer from "../components/UI/Footer";
import Navbar from "../components/UI/Navbar";
import id_card from "../assets/id_cards.png";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="bg-[#FCFBF7] text-[#1E1E24]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#FFE3C7,transparent_55%),radial-gradient(circle_at_90%_10%,#EED8C2,transparent_45%),linear-gradient(180deg,#FFF6EC_0%,#FFFFFF_60%)]" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#F9C784]/40 blur-3xl" />
        <div className="absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-[#DD6031]/15 blur-3xl" />
        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center gap-12 px-6 py-20 md:flex-row md:gap-10">
          <div className="flex w-full flex-col gap-6 md:w-1/2">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#DD6031]/40 bg-white/70 px-4 py-1 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#DD6031]" />
              <p className="text-sm font-semibold tracking-wide text-[#7A3A18]">
                International Institute of Professional Studies
              </p>
            </div>

            <h1 className="font-heading text-4xl font-extrabold leading-tight text-[#2E1C0D] md:text-6xl">
              Build stunning, secure ID cards in minutes.
            </h1>

            <p className="font-body text-lg leading-relaxed text-[#5E5E5E] md:text-xl">
              IIPS ICG is a streamlined platform for student onboarding,
              template design, and bulk exports — all in one seamless flow.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/student-registration")}
                className="rounded-md bg-[#DD6031] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-[#DD6031]/30 transition-all hover:-translate-y-0.5 hover:bg-[#B84B22]"
              >
                Register now
              </button>

              <button
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                  } else {
                    navigate("/admin-dashboard");
                  }
                }}
                className="rounded-md border border-[#DD6031] px-6 py-3 text-base font-semibold text-[#7A3A18] transition-all hover:-translate-y-0.5 hover:bg-[#DD6031] hover:text-white"
              >
                Admin dashboard
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-3">
              {[
                { label: "Templates", value: "50+" },
                { label: "Faster approvals", value: "3x" },
                { label: "Export formats", value: "PNG/ZIP" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[#F1D8C3] bg-white/70 p-4 text-center shadow-sm"
                >
                  <div className="font-heading text-2xl text-[#DD6031]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#6E6E6E]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex w-full justify-center md:w-1/2">
            <div className="absolute -top-6 left-10 h-24 w-24 rounded-2xl bg-[#FFE3C7] shadow-lg" />
            <div className="absolute -bottom-6 right-12 h-20 w-20 rounded-full border border-[#DD6031]/40 bg-white/70" />
            <img
              src={id_card}
              alt="ID card preview"
              className="relative z-10 w-[90%] max-w-lg drop-shadow-2xl"
              style={{ animation: "float 4s ease-in-out infinite" }}
            />
          </div>
        </div>

        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-16px); }
            }
            @keyframes shimmer {
              0% { background-position: 0% 50%; }
              100% { background-position: 100% 50%; }
            }
          `}
        </style>
      </section>

      {/* WORKFLOW */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <h2 className="font-heading text-4xl font-bold text-[#2E1C0D] md:text-5xl">
            A clean workflow from registration to print
          </h2>
          <p className="mt-4 text-lg text-[#6E6E6E]">
            Every step is structured for accuracy and speed.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Register students",
              desc: "Students submit details and photos through a simple onboarding form.",
            },
            {
              title: "Design templates",
              desc: "Admins create beautiful layouts with institute branding and dynamic fields.",
            },
            {
              title: "Approve & export",
              desc: "Verify entries, then export high-quality ID cards in bulk.",
            },
          ].map((step, i) => (
            <div
              key={step.title}
              className="rounded-2xl border border-[#F1D8C3] bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#DD6031]/10 font-heading text-xl text-[#DD6031]">
                0{i + 1}
              </div>
              <h3 className="font-heading text-2xl text-[#2E1C0D]">
                {step.title}
              </h3>
              <p className="mt-3 text-base text-[#6E6E6E]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative overflow-hidden bg-[#FFF4E8] py-24">
        <div className="absolute inset-0 opacity-70" />
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#DD6031]">
              Platform highlights
            </p>
            <h2 className="mt-3 font-heading text-4xl font-bold text-[#2E1C0D] md:text-5xl">
              Purpose-built for campus workflows
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-[#6E6E6E]">
              A focused toolset that keeps data tidy, approvals fast, and design
              consistently on-brand.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "Live template builder",
                desc: "Drag, align, and style placeholders with precision so every ID looks polished.",
              },
              {
                title: "Batch validation",
                desc: "Automatic checks highlight missing fields before exports begin.",
              },
              {
                title: "Role-based access",
                desc: "Student and admin actions are cleanly separated with safe approvals.",
              },
              {
                title: "High-resolution exports",
                desc: "Generate print-ready PNG and ZIP files with consistent sizing.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-[#F1D8C3] bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-heading text-2xl text-[#2E1C0D]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base text-[#6E6E6E]">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST / SECURITY */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-heading text-4xl font-bold text-[#2E1C0D] md:text-5xl">
              Secure by design, easy to manage
            </h2>
            <p className="mt-4 text-lg text-[#6E6E6E]">
              Centralize student data, minimize manual errors, and maintain
              audit trails across every approval.
            </p>

            <div className="mt-6 grid gap-4">
              {[
                "Encrypted student records",
                "Admin-only template controls",
                "Structured, export-ready data",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl border border-[#F1D8C3] bg-white p-4"
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-[#DD6031]" />
                  <p className="text-base text-[#5E5E5E]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#F1D8C3] bg-white p-10 shadow-lg">
            <h3 className="font-heading text-2xl text-[#2E1C0D]">
              What admins get
            </h3>
            <p className="mt-3 text-base text-[#6E6E6E]">
              A clean console to approve batches, edit templates, and monitor
              readiness.
            </p>
            <div className="mt-6 space-y-4">
              {[
                "Smart approval queues",
                "Template version history",
                "Instant bulk export",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-[#F1D8C3] bg-[#FFF7EE] p-4"
                >
                  <p className="text-base font-semibold text-[#7A3A18]">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl border border-[#F1D8C3] bg-[linear-gradient(120deg,#DD6031,#F4A261,#F9C784)] p-10 text-white md:p-16">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.15),transparent)]" />
          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold md:text-4xl">
                Ready to launch your next ID batch?
              </h2>
              <p className="mt-3 max-w-xl text-base text-white/90 md:text-lg">
                Start registrations today and deliver print-ready cards faster
                than ever.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/student-registration")}
                className="rounded-md bg-white px-6 py-3 text-base font-semibold text-[#7A3A18] shadow-lg transition-all hover:-translate-y-0.5"
              >
                Start registration
              </button>
              <button
                onClick={() => {
                  if (!user) {
                    navigate("/login");
                  } else {
                    navigate("/admin-dashboard");
                  }
                }}
                className="rounded-md border border-white/60 px-6 py-3 text-base font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#7A3A18]"
              >
                Go to dashboard
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
