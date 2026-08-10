import React from "react";

const Section2 = () => {
  const steps = [
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
  ];
  return (
    <div>
      <section className="bg-[#FFF8F3] py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Workflow
            </p>

            <h2 className="mt-3 font-heading text-5xl text-[#2E1C0D]">
              A clean workflow from registration to print
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg text-[#666]">
              Every step is structured for accuracy and speed.
            </p>
          </div>

          <div className="mt-20 flex flex-col md:flex-row md:items-start">
            {steps.map((step, i) => (
              <React.Fragment key={step.title}>
                <div className="flex-1 text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#DD6031] text-xl font-bold text-white">
                    {i + 1}
                  </div>

                  <h3 className="mt-6 font-heading text-2xl text-[#2E1C0D]">
                    {step.title}
                  </h3>

                  <p className="mx-auto mt-3 max-w-xs text-[#666]">
                    {step.desc}
                  </p>
                </div>

                {i !== steps.length - 1 && (
                  <div className="hidden flex-1 items-center justify-center md:flex">
                    <div className="h-[2px] w-full bg-[#E9DCCF]" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section2;
