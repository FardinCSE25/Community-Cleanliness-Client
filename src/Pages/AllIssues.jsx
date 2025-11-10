import React from 'react';
import { useLoaderData } from 'react-router';
import AllIssuesUI from './AllIssuesUI';

const AllIssues = () => {
    const issuesList = useLoaderData();
    return (
    <div className="w-11/12 mx-auto my-6 grid md:grid-cols-3 gap-6">
      {issuesList?.map(issue => (
        <AllIssuesUI 
          key={issue._id} 
          issue={issue} 
        />
      ))}
    </div>
  );
};

export default AllIssues;