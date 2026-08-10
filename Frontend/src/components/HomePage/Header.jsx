import { useNavigate } from "react-router-dom";
import id_card from "../../assets/id_cards.png";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      {/* GRADIENT IF WANT : bg-[radial-gradient(circle_at_20%_20%,#FFE3C7,transparent_55%),radial-gradient(circle_at_90%_10%,#EED8C2,transparent_45%),linear-gradient(180deg,#FFF6EC_0%,#FFFFFF_60%)] */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 " />
        <div className="absolute -top-30 -left-24 h-72 w-72 rounded-full bg-[#F9C784]/40 blur-3xl" />
        <div className="absolute -bottom-16 right-0 h-80 w-80 rounded-full bg-[#DD6031]/15 blur-3xl" />
        <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center gap-12 px-6 py-20 md:flex-row md:gap-10">
          <div className="flex w-full flex-col gap-6 md:w-1/2">
            {/* <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#DD6031]/40 bg-white/70 px-4 py-1 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#DD6031]" />
              <p className="text-sm font-semibold tracking-wide text-[#7A3A18]">
                International Institute of Professional Studies
              </p>
            </div> */}

            <h1 className="font-heading text-4xl font-extrabold leading-tight text-[#2E1C0D] md:text-6xl">
              Build stunning, secure ID cards in minutes.
            </h1>

            <p className="font-body text-lg leading-relaxed text-[#5E5E5E] md:text-xl">
              <b>IIPS ICG</b> (ID Card Generation) is a platform that enables
              students to register their details, <br /> while allowing
              administrators to
              <i>
                <b> design, generate, and export </b>
              </i>
              professional ID cards in <u>multiple formats</u>, making the
              entire process seamless and efficient.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/student-registration")}
                className="rounded-md bg-[#DD6031] px-6 py-3 text-base font-semibold text-white shadow-lg shadow-[#DD6031]/30 transition-all hover:-translate-y-0.5 hover:bg-[#B84B22] cursor-pointer"
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
                className="rounded-md border border-[#DD6031] px-6 py-3 text-base font-semibold text-[#7A3A18] transition-all hover:-translate-y-0.5 hover:bg-[#DD6031] hover:text-white cursor-pointer"
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
    </div>
  );
};

export default Header;
