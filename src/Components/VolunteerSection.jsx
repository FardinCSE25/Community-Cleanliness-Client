import React from "react";
import img from "../assets/volunteers.jpg";
// Removed unused 'motion' import as external libraries aren't available in this environment

const VolunteerSection = () => {
  // Placeholder URL for the image

  return (
    <div className="py-16 px-4 md:px-8 bg-base-100 w-full"> {/* Full width background container */}
      <section
        className="flex flex-col md:flex-row items-center justify-between 
                   bg-base-200 rounded-3xl shadow-2xl border border-base-300
                   px-8 md:px-16 py-16 max-w-7xl mx-auto 
                   overflow-hidden transition-all duration-500"
      >
        {/* Text Content */}
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-base-content mb-4 leading-tight" style={{ color: '#228B22' }}>
            Volunteer for a Clean-Up Drive
          </h2>
          <p className="text-base-content/80 mb-8 leading-relaxed text-lg">
            Join hands with your community to report and resolve cleanliness issues. Together, let’s build a greener and cleaner neighborhood. Every minute you volunteer makes a tangible impact on our environment. 🌿
          </p>
          
          {/* Call to Action Button */}
          <button 
            className="btn btn-lg text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition duration-300"
            style={{ backgroundColor: '#228B22' }}
          >
            Find a Drive Near You
          </button>
        </div>

        {/* Image Content */}
        <div className="md:w-1/2 relative group">
          <img
            src={img}
            alt="Volunteers cleaning a park"
            // Aspect-video ensures a nice 16:9 ratio, scaling slightly on hover
            className="rounded-2xl shadow-2xl w-full object-cover aspect-video transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      </section>
    </div>
  );
};

export default VolunteerSection;