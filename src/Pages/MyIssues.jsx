import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const MyIssues = () => {
    const { user } = use(AuthContext)
        const [issues, setIssues] = useState([])

         useEffect(() => {
                if (user?.email) {
                    fetch(`https://community-cleanliness-server-9ktkhbgsn.vercel.app/issues?email=${user.email}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            setIssues(data)
                        })
                }
            }, [user?.email])

    return (
        <div className='w-11/12 mx-auto min-h-screen'>
            <h3 className='text-2xl my-6'>My Issues : {issues.length}</h3>
            <div className="overflow-x-auto">
                <table className="table mb-7 w-full border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="py-3 text-center">No.</th>
                            <th className="py-3">Issue</th>
                        </tr>
                    </thead>

                    <tbody className="text-sm">
                        {
                            issues.map((iss, index) => (
                                <tr key={iss._id} className="hover:bg-gray-50 transition">
                                    <td className="text-center font-medium">{index + 1}</td>

                                    <td>
                                        <div className="flex flex-col justify-center">
                                            <h1 className="font-semibold text-gray-800">{iss.title}</h1>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <button className="btn btn-sm bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md">
                                            Update
                                        </button>
                                    </td>

                                    <td className="text-center">
                                        <button className="btn btn-sm bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default MyIssues;