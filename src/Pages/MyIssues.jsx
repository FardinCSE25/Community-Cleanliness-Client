import React, { use, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading';

const MyIssues = () => {
    const { user } = use(AuthContext)
    const [issues, setIssues] = useState([])
    const issueModalRef = useRef(null);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://community-cleanliness-server-phi.vercel.app/issues?email=${user.email}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    setIssues(data)
                })
        }
    }, [user?.email])

    const handleIssueModal = () => {
        issueModalRef.current.showModal()
    }

    const handleIssueUpdate = (e, id) => {
        e.preventDefault();
        const updatedIssueData = {
        title : e.target.title.value,
        category : e.target.category.value,
        amount : Number(e.target.amount.value),
        description : e.target.description.value
        }

          fetch(`https://community-cleanliness-server-phi.vercel.app/issues/${id}`, {
                    method: "PUT",
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(updatedIssueData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        
                        // if (data.insertedId) {
                        //     // Swal.fire({
                        //     //     position: "center",
                        //     //     icon: "success",
                        //     //     title: "New Issue Added!",
                        //     //     showConfirmButton: false,
                        //     //     timer: 1500
                        //     // });
                        //     // e.target.reset()
                        //     // newIssue._id = data.insertedId;
                        //     // const newIss = [...issues, newIssue];
                        //     // setIssues(newIss);
                        // }
        
                    })
    }
    const handleIssueDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to access this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#FF0000",
            cancelButtonColor: "#228B22",
            confirmButtonText: "Yes, delete it!"
        })
            .then(res => {
                if (res.isConfirmed) {
                    fetch(`https://community-cleanliness-server-phi.vercel.app/issues/${id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json()
                            .then(data => {
                                if (data.deletedCount) {
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your issue has been deleted.",
                                        icon: "success"
                                    });
                                    const remainingIssues = issues.filter(issue => issue._id !== id)
                                    setIssues(remainingIssues)
                                }
                            })
                        )
                }
            })
    }

    return (
        <div className='w-11/12 mx-auto min-h-screen'>
            <h3 className='text-2xl my-6'>My Issues : {issues.length}</h3>
            <div className="overflow-x-auto">
                <table className="table mb-7 w-full border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-gray-100 text-gray-700 text-sm">
                        <tr className='w-full'>
                            <th className="py-3 text-center">No.</th>
                            <th className="py-3">Issue</th>
                            <th className="py-3"></th>
                            <th className="py-3"></th>
                        </tr>
                    </thead>

                    <tbody className="text-sm">
                        {
                            issues.map((iss, index) => (
                                <tr key={iss._id} className="hover:bg-gray-50 dark:hover:bg-black transition">
                                    <td className="text-center font-medium">{index + 1}</td>

                                    <td>
                                        <div className="flex flex-col justify-center">
                                            <h1 className="font-semibold dark:text-white text-black">{iss.title}</h1>
                                        </div>
                                    </td>
                                    <td className="text-center">
                                        <button onClick={handleIssueModal} className="btn btn-sm bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md">
                                            Update
                                        </button>
                                    </td>
                                    <td className="text-center">
                                        <button onClick={() => handleIssueDelete( iss._id)} className="btn btn-sm bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md">
                                            Delete
                                        </button>
                                    </td>
                                    <dialog ref={issueModalRef} className="modal modal-bottom sm:modal-middle">
                                        <div className="modal-box">
                                            <h3 className="font-bold text-lg mb-3 text-center">Update your Issue</h3>
                                            <form onSubmit={() => handleIssueUpdate(iss._id)}>
                                                <fieldset className="fieldset">
                                                    <label className="label text-black font-medium">Issue Title</label>
                                                    <input type="text" defaultValue={iss.title} name='title' className="input w-full"
                                                    />
                                                    <label className="label text-black font-medium">Category</label>
                                                    <select name="category" defaultValue={iss.category}
                                                        className="select select-bordered w-full" required>
                                                        <option value="">Select Category</option>
                                                        <option value="Garbage">Garbage</option>
                                                        <option value="Illegal Construction">Illegal Construction</option>
                                                        <option value="Broken Public Property">Broken Public Property</option>
                                                        <option value="Road Damage">Road Damage</option>
                                                    </select>
                                                    <label className="label text-black font-medium">Amount</label>
                                                    <input type="text" name='amount' defaultValue={iss.amount} className="input w-full"
                                                    />
                                                    <label className="label text-black font-medium">Description</label>
                                                    <input type="text" name='description' defaultValue={iss.description} className="input w-full"
                                                    />
                                                    <button className="btn bg-[#006400] text-white mt-4">Update</button>
                                                </fieldset>
                                            </form>

                                            <div className="modal-action">
                                                <form method="dialog">
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <button className="btn bg-[#228B22] text-white">Cancel</button>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
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