import React from "react";
import img from "../assets/volunteers.jpg"

const VolunteerSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between bg-white rounded-2xl shadow-md p-8 md:p-12 my-10 max-w-6xl mx-auto font-['Roboto']">
      {/* Left Side - Text Content */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h2 className="text-3xl md:text-4xl font-bold text-[#006400] mb-4">
          Volunteer for a Clean-Up Drive
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Helping communities report and address local cleanliness issues.
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="md:w-1/2">
        <img
          src={img}
          alt="Volunteers cleaning a park"
          className="rounded-xl shadow-md w-full object-cover"
        />
      </div>
    </section>
  );
};

export default VolunteerSection;