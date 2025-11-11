import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

const MyContribution = () => {
    const { user } = use(AuthContext)
    const [contribution, setContribution] = useState([])

    useEffect(() => {
        if (user?.email) {
            fetch(`https://community-cleanliness-server-phi.vercel.app/contribution?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setContribution(data)
                })
        }
    }, [user?.email])

    return (
        <div className='w-11/12 mx-auto min-h-screen'>
            <h3 className='text-2xl my-6'>My Contributions : {contribution.length}</h3>
            <div className="overflow-x-auto">
                <table className="table mb-7 w-full border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr>
                            <th className="py-3 text-center">No.</th>
                            <th className="py-3">Issue</th>
                            <th className="py-3 text-center">Amount</th>
                            <th className="py-3 text-center">Date</th>
                            <th className="py-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody className="text-sm">
                        {
                            contribution.map((con, index) => (
                                <tr key={con._id} className="hover:bg-gray-50 transition">
                                    <td className="text-center font-medium">{index + 1}</td>

                                    <td>
                                        <div className="flex flex-col justify-center">
                                            <h1 className="font-semibold dark:text-white text-gray-800">{con.title}</h1>
                                            <span className="text-xs dark:text-white text-gray-500 mt-1">{con.category}</span>
                                        </div>
                                    </td>

                                    <td className="text-center font-semibold dark:text-white text-green-700">
                                        ৳ {con.amount}
                                    </td>

                                    <td className="text-center dark:text-white text-gray-600">
                                        {con.date}
                                    </td>

                                    <td className="text-center">
                                        <button className="btn btn-sm bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md">
                                            Download
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

export default MyContribution;