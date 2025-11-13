import React from "react";
import { Leaf, Globe, Users, ClipboardList, Recycle, HeartHandshake } from "lucide-react";

const missions = [
  {
    icon: <Leaf className="w-10 h-10" style={{ color: '#228B22' }} />,
    title: "Promote Community Cleanliness",
    desc: "Encourage citizens to actively participate in keeping their surroundings clean and green.",
  },
  {
    icon: <ClipboardList className="w-10 h-10" style={{ color: '#228B22' }} />,
    title: "Simplify Issue Reporting",
    desc: "Allow users to easily report cleanliness or environmental issues anytime, anywhere.",
  },
  {
    icon: <Globe className="w-10 h-10" style={{ color: '#228B22' }} />,
    title: "Ensure Transparency & Accountability",
    desc: "Track every report from submission to resolution to build community trust.",
  },
  {
    icon: <Users className="w-10 h-10" style={{ color: '#228B22' }} />,
    title: "Empower Local Volunteers",
    desc: "Connect volunteers and organizations to take part in cleanup drives and awareness campaigns.",
  },
  {
    icon: <Recycle className="w-10 h-10" style={{ color: '#228B22' }} />,
    title: "Support Sustainable Solutions",
    desc: "Promote eco-friendly and long-term waste management practices.",
  },
  {
    icon: <HeartHandshake className="w-10 h-10" style={{ color: '#228B22' }} />,
    title: "Enhance Civic Responsibility",
    desc: "Inspire citizens to care for their environment and public spaces responsibly.",
  },
];

const MissionSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto my-10 bg-base-200 rounded-3xl shadow-2xl">
      
      {/* Title with decorative element */}
      <h2 className="text-5xl font-extrabold text-center text-base-content mb-4">
        Our Mission
      </h2>
      <p className="text-xl text-center text-base-content/80 mb-12 max-w-3xl mx-auto">
        We are dedicated to fostering a cleaner, more responsible community through technology and collaboration.
      </p>

      {/* Mission Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {missions.map((mission, index) => (
          <div
            key={index}
            // Card styling using DaisyUI/Tailwind for light/dark mode compatibility
            className="card p-8 bg-base-100 shadow-xl border-t-4 hover:shadow-2xl transition duration-300 transform hover:-translate-y-1"
            style={{ borderTopColor: '#228B22' }}
          >
            <div className="card-body p-0 items-center text-center">
                {/* Icon Circle */}
                <div className="mb-4 p-4 rounded-full bg-base-200 border-2" style={{ borderColor: '#228B22' }}>
                    {mission.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3" style={{ color: '#228B22' }}>
                    {mission.title}
                </h3>
                
                {/* Description */}
                <p className="text-base-content/80">
                    {mission.desc}
                </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MissionSection;