import React from 'react';
import { MapPin, Calendar, Wallet } from "lucide-react";
import { useLoaderData, useParams } from 'react-router';
import Loading from '../Components/Loading';

const IssueDetails = () => {
    const issues = useLoaderData();
    const { id } = useParams();
    const issue = issues.find(iss => iss._id == id)

    if (!issue) return <Loading />

    return (
        <div className="max-w-5xl mx-auto p-6">

            {/* Title Section */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">{issue.title}</h1>

                <div className="flex items-center gap-3 mt-3">
                    <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
                        {issue.category}
                    </span>

                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <MapPin size={16} />
                        {issue.location}
                    </div>

                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <Calendar size={16} />
                        {issue.date}
                    </div>
                </div>
            </div>

            {/* Image */}
            <div className="w-full h-80 bg-gray-200 rounded-xl overflow-hidden shadow-md">
                <img
                    src={issue.image}
                    alt={issue.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Description */}
            <p className="mt-6 text-gray-700 leading-relaxed text-lg">
                {issue.description}
            </p>

            {/* Budget */}
            <div className="mt-6 p-4 bg-gray-50 border rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700">
                    <Wallet size={20} />
                    <span className="font-medium">Suggested Clean-Up Contribution:</span>
                </div>
                <span className="text-green-600 font-bold text-xl">৳ {issue.amount}</span>
            </div>

            {/* Button */}
            <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
                Pay Clean-Up Contribution
            </button>

        </div>
    );
};

export default IssueDetails;