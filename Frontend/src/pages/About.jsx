import React from "react";
import Navbar from "../components/UI/Navbar";
import Footer from "../components/UI/Footer";

const About = () => {
  return (
    <div>
      <Navbar />
      <section className="w-full px-20 py-28 text-text">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-heading font-bold text-primary leading-tight">
            About <span className="text-black">IIPS-ICG</span>
          </h1>

          <p className="text-text-secondary mt-8 text-xl leading-relaxed font-body">
            IIPS-ICG is a modern, institution-driven identity management system
            built to simplify student ID creation, data organization, and
            approval workflows. Designed with a focus on automation, security,
            and real-time accessibility, it enables institutions to manage
            complete student identity lifecycles — from onboarding to secure
            authentication — seamlessly and efficiently.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-20 text-text-secondary text-lg leading-relaxed font-body space-y-8 text-center">
          <p>
            Our platform bridges students, faculty, and administrators through a
            unified digital pipeline. From registration and verification to ID
            approval and printing, every step is streamlined, reducing manual
            effort and minimizing delays. Centralized records ensure data
            accuracy while making review and validation significantly faster.
          </p>

          <p>
            With flexible template design, institutions can build personalized
            identity cards tailored to departments, batches, or programs. Secure
            data storage, encrypted access, and role-based permissions ensure
            that student information stays protected at every stage, supporting
            a safe and trustworthy identification ecosystem.
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default About;
