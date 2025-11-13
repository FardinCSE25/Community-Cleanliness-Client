import React from "react";
import { Users, CheckCircle, Clock } from "lucide-react";

const statsData = [
  { value: "1,450+", label: "Registered Users", icon: <Users className="w-8 h-8" style={{ color: '#228B22' }} /> },
  { value: "862", label: "Issues Resolved", icon: <CheckCircle className="w-8 h-8" style={{ color: '#228B22' }} /> },
  { value: "476", label: "Pending Issues", icon: <Clock className="w-8 h-8" style={{ color: '#228B22' }} /> },
];

const CommunityStats = () => {
  return (
    <div className="py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">


        <h2 className="text-4xl font-extrabold text-base-content mb-12 text-center">
          Community Impact Metrics
        </h2>



        <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 w-full">

          {statsData.map((stat, index) => (
            <div
              key={index}

              className="flex-1 min-w-[280px] card bg-base-200 shadow-xl border-t-4 p-8 text-center 
                         transition-transform duration-300 hover:shadow-2xl hover:translate-y-[-2px]
                         flex flex-col items-center justify-center"
              style={{ borderTopColor: '#228B22' }}
            >
              <div className="mb-3">
                {stat.icon}
              </div>

              <div className="text-base-content/70 font-medium tracking-wide mt-1">
                {stat.label}
              </div>

              <div className="text-5xl font-extrabold my-2" style={{ color: '#228B22' }}>
                {stat.value}
              </div>


              <div className="text-base-content/60 mt-2 text-sm">
                {index === 0 && "Active participants growing monthly"}
                {index === 1 && "Cleanliness reports successfully closed"}
                {index === 2 && "Awaiting action and resolution"}
              </div>
            </div>
          ))}

        </div>


        <div className="text-center mt-12">
          <p className="text-base-content/70">
            These numbers reflect the collective effort of our dedicated community. Join us in making an even greater impact!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;