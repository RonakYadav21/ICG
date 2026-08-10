const Section4 = () => {
  const studentFeatures = [
    "Encrypted student records",
    "Admin-only template controls",
    "Structured, export-ready data",
  ];

  const adminFeatures = [
    "Smart approval queues",
    "Template version history",
    "Instant bulk export",
  ];
  return (
    <div>
      <section className="bg-[#FFF8F3] py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-primary">
              Security
            </p>

            <h2 className="mt-3 font-heading text-5xl text-[#2E1C0D]">
              Secure by design, easy to manage
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-[#666]">
              Centralize student data, minimize manual errors, and maintain
              complete audit trails throughout every approval.
            </p>
          </div>

          <div className="mt-20 grid gap-16 md:grid-cols-2">
            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-primary">
                Student Data
              </span>

              <div className="mt-6 space-y-6">
                {studentFeatures.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-5 border-b border-[#E9DCCF] pb-6"
                  >
                    <div className="mt-2 h-2.5 w-2.5 rounded-full bg-[#DD6031]" />

                    <p className="text-lg text-[#555]">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-primary">
                Admin Console
              </span>

              <div className="mt-6 space-y-6">
                {adminFeatures.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-5 border-b border-[#E9DCCF] pb-6"
                  >
                    <div className="mt-2 h-2.5 w-2.5 rounded-full bg-[#DD6031]" />

                    <p className="text-lg text-[#555]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section4;
