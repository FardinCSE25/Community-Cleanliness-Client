import React from 'react';
import RecentIssuesUI from './RecentIssuesUI';

const RecentIssues = ({ issuesList }) => {


    return (
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
    );
};

export default RecentIssues;