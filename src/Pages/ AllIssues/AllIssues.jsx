import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import AllIssuesUI from '../ AllIssues/AllIssuesUI';

const AllIssues = () => {
    const issuesList = useLoaderData();
    const [filter, setFilter] = useState("All")

    const filteredIssues = (() => {
      if(filter=='All'){
        return issuesList
      }
        else if (filter) {
            return issuesList.filter(issues => issues.category == filter)
        }
    })()
    return (
      
     <div>
     <title>Community Cleanliness- All Issues</title>
       <div className='w-11/12 mx-auto pt-52 flex justify-between items-center'>
       <div>
         <h1 className='text-5xl mb-10 font-bold text-left'>
                All Issues
            </h1>
       </div>
            <div className='flex flex-col text-lg'>
              <label className='ml-3'>Filter by</label>
              <select className='border-2 dark:border-gray-200 dark:bg-black border-black rounded-md p-1' value={filter} onChange={e => setFilter(e.target.value)}>
                        <option value="All">All</option>
                        <option value="Garbage">Garbage</option>
                        <option value="Illegal Construction">Illegal Construction</option>
                        <option value="Broken Public Property">Broken Public Property</option>
                        <option value="Road Damage">Road Damage</option>
                    </select>
            </div>
       </div>
     
    <div className="w-11/12 mx-auto py-6 grid md:grid-cols-3 gap-6">
      {filteredIssues?.map(issue => (
        <AllIssuesUI 
          key={issue._id} 
          issue={issue} 
        />
      ))}
    </div>
    </div>
  );
};

export default AllIssues;