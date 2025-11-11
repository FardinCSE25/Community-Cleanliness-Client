const CommunityStats = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-16 pb-10">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center">
        Community Stats
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
    
        <div className="border rounded-xl py-8 bg-white">
          <h3 className="text-4xl font-extrabold text-[#228B22]">1,450+</h3>
          <p className="text-gray-600 mt-2 font-medium">Registered Users</p>
        </div>

        <div className="border rounded-xl py-8 bg-white">
          <h3 className="text-4xl font-extrabold text-[#228B22]">862</h3>
          <p className="text-gray-600 mt-2 font-medium">Issues Resolved</p>
        </div>

        <div className="border rounded-xl py-8 bg-white">
          <h3 className="text-4xl font-extrabold text-[#228B22]">476</h3>
          <p className="text-gray-600 mt-2 font-medium">Pending</p>
        </div>

      </div>
    </div>
  );
};

export default CommunityStats;
