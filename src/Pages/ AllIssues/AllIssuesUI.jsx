import React from 'react';
import { MapPin } from "lucide-react";
import { Link } from 'react-router';

const AllIssuesUI = ({ issue }) => {
  if (!issue) return <div>Loading...</div>;

  return (
    <div className="my-6 rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <div className="h-52 w-full bg-gray-100 overflow-hidden relative">
        <img
          src={issue.image}
          alt={issue.title}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />

        <span className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full bg-green-700 text-white shadow-md">
          {issue.category}
        </span>
      </div>

      <div className="p-5 flex flex-col h-full">
        <div>
          <h2 className="text-xl font-bold mt-1 text-gray-900 hover:text-green-800 transition-colors duration-200">
            {issue.title}
          </h2>

          <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
            <MapPin size={18} className="text-green-700" />
            <span>{issue.location}</span>
          </div>

          <p className="text-sm text-gray-700 mt-3 line-clamp-3 leading-relaxed">
            {issue.description?.slice(0, 100) || "No description available."}
          </p>

          <p className="text-sm font-semibold text-gray-800 mt-3">
            Estimated Cost:{" "}
            <span className="text-green-600 font-bold">৳ {issue.amount}</span>
          </p>
        </div>

        <Link
          to={`/issueDetails/${issue._id}`}
          className="mt-5 inline-block w-full text-center bg-green-600 hover:bg-green-800 text-white font-semibold py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          See Details
        </Link>
      </div>
    </div>
  );
};

export default AllIssuesUI;
