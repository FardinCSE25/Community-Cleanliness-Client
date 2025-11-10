import { MapPin } from 'lucide-react';
import React from 'react';

const RecentIssuesUI = ({ issue }) => {
    if (!issue) return <Loading />
    return (
        <div className="border rounded-xl p-5 shadow-sm bg-white hover:shadow-lg transition">
            <span className="text-xs px-3 py-1 bg-secondary text-white rounded-full">
                {issue.category}
            </span>

            <h2 className="text-lg font-semibold mt-3">{issue.title}</h2>

            <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                {issue.description}
            </p>

            <div className="flex items-center gap-1 text-gray-500 text-sm mt-3">
                <MapPin size={16} />
                <span>{issue.location}</span>
            </div>

            <button className="mt-4 w-full bg-primary hover:bg-secondary text-white py-2 rounded-lg transition">
                See Details
            </button>
        </div>
    );
};

export default RecentIssuesUI;