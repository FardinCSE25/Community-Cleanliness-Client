const CommunityStats = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 pt-16 pb-10">
      <h2 className="text-2xl md:text-3xl font-bold dark:text-gray-200 text-black mb-10 text-center">
        Community Stats
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
        {[
          { value: "1,450+", label: "Registered Users" },
          { value: "862", label: "Issues Resolved" },
          { value: "476", label: "Pending" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-2xl py-10 px-6 
                       shadow-md hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 
                       transition-all duration-300 ease-out"
          >
            <h3 className="text-4xl font-extrabold text-[#228B22] drop-shadow-sm transition-transform duration-300">
              {stat.value}
            </h3>
            <p className="text-gray-600 mt-3 font-medium tracking-wide">
              {stat.label}
            </p>
            <div className="mt-4 w-16 h-1 mx-auto bg-[#228B22] rounded-full opacity-0 group-hover:opacity-100 transition duration-300"></div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CommunityStats;
