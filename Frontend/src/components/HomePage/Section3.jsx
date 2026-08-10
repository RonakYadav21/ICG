const Section3 = () => {
  const features = [
    {
      title: "Live Template Builder",
      desc: "Drag, align, resize, and style placeholders with precision to design professional ID card templates.",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      title: "Batch Validation",
      desc: "Automatically detect missing or invalid student information before generating ID cards.",
      className: "",
    },
    {
      title: "Role-Based Access",
      desc: "Separate permissions for students and administrators with secure workflows.",
      className: "",
    },
    {
      title: "High-Resolution Export",
      desc: "Generate print-ready PNG files individually or as ZIP archives for bulk downloads.",
      className: "md:col-span-2",
    },
  ];
  return (
    <div>
      <section className="bg-[#FFF8F3] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Features
            </p>

            <h2 className="mt-3 font-heading text-4xl text-[#2E1C0D] md:text-5xl">
              Everything you need
            </h2>
          </div>
          <div className="relative mt-20">
            <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-[#E8D7C7] md:block" />

            <div className="space-y-20">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? "" : "md:flex-row-reverse"
                  } items-center`}
                >
                  <div className="w-full md:w-1/2">
                    <div
                      className={`max-w-md ${
                        index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                      }`}
                    >
                      <span className="text-sm font-semibold tracking-[0.25em] text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-2 font-heading text-3xl text-[#2E1C0D]">
                        {feature.title}
                      </h3>

                      <p className="mt-4 text-lg leading-relaxed text-[#666]">
                        {feature.desc}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 my-8 flex h-6 w-6 items-center justify-center rounded-full border-4 border-[#FFF8F3] bg-primary md:my-0">
                    <div className="h-2 w-2 rounded-full bg-white" />
                  </div>

                  <div className="hidden md:block md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section3;
