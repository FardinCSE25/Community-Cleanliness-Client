import React, { use, useEffect, useRef, useState } from 'react';
import { MapPin, Calendar, Wallet } from "lucide-react";
import { useLoaderData, useParams } from 'react-router';
import Loading from '../Components/Loading';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const IssueDetails = () => {
    const issues = useLoaderData();
    const contributionModalRef = useRef(null);
    const [contribution, setContribution] = useState([])
    const { user } = use(AuthContext);


    const { id } = useParams();
    const issue = issues.find(iss => iss._id == id)

    useEffect(() => {
        fetch(`https://community-cleanliness-server-phi.vercel.app/issues/contribution/${issue._id}`)
            .then(res => res.json())
            .then(data => {
                console.log('bids for this product', data)
                setContribution(data);
            })
    }, [issue._id])

    const handleContributionModal = () => {
        contributionModalRef.current.showModal()
    }
    // console.log(user.photoURL)

    const handleContributionSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        const category = e.target.category.value
        const amount = e.target.amount.value;
        const name = e.target.name.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        // console.log(issue._id ,title, amount, name, email, phone, address);

        const newContribution = {
            issueId: issue._id,
            title: title,
            category: category,
            amount: amount,
            name: name,
            email: email,
            phone: phone,
            address: address,
            photo: user?.photoURL,
            date: new Date().toLocaleDateString(),
        }

        fetch("https://community-cleanliness-server-phi.vercel.app/contribution", {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newContribution)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    contributionModalRef.current.close()
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Thanks for your Contribution!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    newContribution._id = data.insertedId;
                    const newCon = [...contribution, newContribution];
                    setContribution(newCon);
                }

            })

    }

    if (!issue) return <Loading />
    return (
        <>
            <title>Community Cleanliness- Issue Details</title>
            <div className="max-w-5xl mx-auto pt-40 pb-24 px-6">

                <div className="mb-6">
                    <h1 className="text-3xl font-bold dark:text-white text-gray-800">{issue.title}</h1>

                    <div className="flex items-center gap-3 mt-3">
                        <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
                            {issue.category}
                        </span>

                        <div className="flex items-center dark:text-white gap-1 text-gray-500 text-sm">
                            <MapPin size={16} />
                            {issue.location}
                        </div>

                        <div className="flex items-center dark:text-white gap-1 text-gray-500 text-sm">
                            <Calendar size={16} />
                            {issue.date}
                        </div>
                    </div>
                </div>

                <div className="w-full h-80 bg-gray-200 rounded-xl overflow-hidden shadow-md">
                    <img
                        src={issue.image}
                        alt={issue.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                <p className="mt-6 dark:text-white text-gray-700 leading-relaxed text-lg">
                    {issue.description}
                </p>

                <div className="mt-6 p-4 bg-gray-50 border rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-700">
                        <Wallet size={20} />
                        <span className="font-medium">Suggested Clean-Up Contribution:</span>
                    </div>
                    <span className="text-green-600 font-bold text-xl">৳ {issue.amount}</span>
                </div>

                <button onClick={handleContributionModal} className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition">
                    Pay Clean-Up Contribution
                </button>

                <dialog ref={contributionModalRef} className="modal modal-bottom sm:modal-middle">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-3 text-center">Make your Contribution</h3>
                        <form onSubmit={handleContributionSubmit}>
                            <fieldset className="fieldset">
                                <label className="label dark:text-white text-black font-medium">Issue Title</label>
                                <input type="text" name='title' className="input w-full"
                                />
                                <label className="label dark:text-white text-black font-medium">Category</label>
                                <select name="category"
                                    className="select select-bordered w-full" required>
                                    <option value="">Select Category</option>
                                    <option value="Garbage">Garbage</option>
                                    <option value="Illegal Construction">Illegal Construction</option>
                                    <option value="Broken Public Property">Broken Public Property</option>
                                    <option value="Road Damage">Road Damage</option>
                                </select>
                                <label className="label dark:text-white text-black font-medium">Amount</label>
                                <input type="text" name='amount' className="input w-full"
                                />
                                <label className="label dark:text-white text-black font-medium">Contributor Name</label>
                                <input type="text" name='name' className="input w-full"
                                />
                                <label className="label dark:text-white text-black font-medium">Email</label>
                                <input type="email" className="input w-full" name='email' readOnly defaultValue={user?.email} />
                                <label className="label dark:text-white text-black font-medium">Phone Number</label>
                                <input type="text" name='phone' className="input w-full"
                                />
                                <label className="label dark:text-white text-black font-medium">Address</label>
                                <input type="text" name='address' className="input w-full"
                                />
                                <button className="btn bg-[#006400] text-white mt-4">Pay Contribution</button>
                            </fieldset>
                        </form>

                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn bg-[#228B22] text-white">Cancel</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
            <div className='w-11/12 mx-auto'>
                <h3 className="text-3xl font-semibold my-6">Contributions for this Issue: <span className='text-[#228B22]'>{contribution.length}</span></h3>
                <div className="overflow-x-auto pb-10 min-h-[200px]">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>
                                    No.
                                </th>
                                <th>Contributor Image </th>
                                <th>Contributor Name</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                contribution.map((con, index) =>
                                    <tr>
                                        <th>{index + 1} </th>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img referrerPolicy="no-referrer"
                                                            src={con.photo}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {con.name}
                                        </td>
                                        <td>{con.amount}</td>
                                    </tr>)
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
};

export default IssueDetails;