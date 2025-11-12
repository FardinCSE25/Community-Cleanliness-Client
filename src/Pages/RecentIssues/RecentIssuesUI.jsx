import { MapPin } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const RecentIssuesUI = ({ issue }) => {
  return (
    <div className="border border-gray-200 rounded-2xl p-6 shadow-md bg-white hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105">

      <span className="inline-block text-xs px-3 py-1 bg-green-700 text-white rounded-full font-medium">
        {issue.category}
      </span>

      <h2 className="text-xl font-bold mt-4 text-gray-900 hover:text-green-800 transition-colors duration-200">
        {issue.title}
      </h2>

      <p className="text-gray-600 text-sm mt-2 line-clamp-3">
        {issue.description}
      </p>

      <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">
        <MapPin size={18} className="text-green-700" />
        <span>{issue.location}</span>
      </div>

      <Link
        to={`/issueDetails/${issue._id}`}
        className="mt-5 inline-block w-full text-center bg-green-600 hover:bg-green-800 text-white font-semibold py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
      >
        See Details
      </Link>
    </div>
  );
};

export default RecentIssuesUI;
