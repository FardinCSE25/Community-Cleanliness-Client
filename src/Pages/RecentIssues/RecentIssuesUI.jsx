import { MapPin } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const RecentIssuesUI = ({issue}) => {
    
    return (
        <div className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-lg transition">
      <span className="text-xs px-3 py-1 bg-[#006400] text-white rounded-full">
        {issue.category}
      </span>
      
      <h2 className="text-lg font-semibold mt-3 text-black">{issue.title}</h2>

      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
        {issue.description}
      </p>

      <div className="flex items-center gap-1 text-gray-500 text-sm mt-3">
        <MapPin size={16} />
        <span>{issue.location}</span>
      </div>

      <Link to={`/issueDetails/${issue._id}`} className="btn mt-4 w-full bg-[#228B22] hover:bg-[#006400] text-white py-2 rounded-lg transition">
        See Details
      </Link>
    </div>
    );
};

export default RecentIssuesUI;