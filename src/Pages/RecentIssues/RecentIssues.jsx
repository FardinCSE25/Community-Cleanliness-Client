import React from 'react';
import RecentIssuesUI from '../RecentIssues/RecentIssuesUI';

const RecentIssues = ({ issuesList }) => {


    return (
        <>
        <h1 className='text-4xl my-10 font-bold text-center'>
                Recent Issues
            </h1>
        <div className="w-11/12 mx-auto grid md:grid-cols-3 gap-6">
            {issuesList.map(issue => {
                return (
                    <RecentIssuesUI
                        key={issue._id}
                        issue={issue}
                    />
                )
            })}
        </div>
        </>
    );
};

export default RecentIssues;