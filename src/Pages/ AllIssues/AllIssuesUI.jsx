import React from 'react';
import { MapPin } from "lucide-react";
import { Link } from 'react-router';

const AllIssuesUI = ({ issue }) => {
    console.log(issue);
    if (!issue) return <Loading />
    return (
        <div className="my-6rounded-xl overflow-hidden bg-white border shadow-sm hover:shadow-md transition">

            {/* Image */}
            <div className="h-48 w-full bg-gray-200 overflow-hidden">
                <img
                    src={issue.image}
                    alt={issue.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content */}
            <div className="p-4">

                <span className="text-xs px-3 py-1 rounded-full bg-[#006400] text-white">
                    {issue.category}
                </span>

                <h2 className="text-lg font-semibold mt-2 text-black">
                    {issue.title}
                </h2>

                <div className="flex items-center gap-1 text-gray-500 text-sm mt-2">
                    <MapPin size={16} />
                    <span>{issue.location}</span>
                </div>

                <p className="text-sm font-medium text-gray-700 mt-3">
                    Cost: <span className="text-green-600 font-semibold">৳ {issue.amount}</span>
                </p>

                <Link to={`/issueDetails/${issue._id}`} className="btn mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition">
                    See Details
                </Link>

            </div>
        </div>
    );
};

export default AllIssuesUI;