import React, { use, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import Loading from '../Components/Loading';
import { Edit3, Trash2, FileText, Calendar, MapPin, DollarSign, X, RefreshCw, AlertCircle } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router';

const MyIssues = () => {
    const { user } = use(AuthContext)
    const [issues, setIssues] = useState([])
    const [loading, setLoading] = useState(true)
    const issueModalRef = useRef(null);
    const [selectedIssue, setSelectedIssue] = useState(null)
    const [refetch, setRefetch] = useState(0)
    const [updateLoading, setUpdateLoading] = useState(false)

    useEffect(() => {
        if (user?.email) {
            setLoading(true)
            fetch(`https://community-cleanliness-server-phi.vercel.app/issues?email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${user.accessToken}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setIssues(data)
                    setLoading(false)
                })
                .catch(() => setLoading(false))
        }
    }, [user?.email, user.accessToken, refetch])

    const handleIssueModal = (issue) => {
        setSelectedIssue(issue)
        issueModalRef.current.showModal()
    }

    const handleIssueUpdate = (id, e) => {
        e.preventDefault();
        const form = e.target;
        const updatedIssueData = {
            title: form.title.value,
            category: form.category.value,
            amount: Number(form.amount.value),
            description: form.description.value
        }

        setUpdateLoading(true)
        fetch(`https://community-cleanliness-server-phi.vercel.app/issues/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedIssueData)
        })
            .then(res => res.json())
            .then(data => {
                setUpdateLoading(false)
                if (data.acknowledged) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Issue Updated Successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                        background: 'oklch(var(--b1))',
                        color: 'oklch(var(--bc))'
                    });
                    issueModalRef.current.close();
                    setRefetch(refetch + 1)
                }
            })
            .catch(() => setUpdateLoading(false))
    }

    const handleIssueDelete = (id) => {
        Swal.fire({
            title: "Delete Issue?",
            text: "This action cannot be undone",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DC2626",
            cancelButtonColor: "#059669",
            confirmButtonText: "Yes, delete it",
            cancelButtonText: "Cancel",
            background: 'oklch(var(--b1))',
            color: 'oklch(var(--bc))'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://community-cleanliness-server-phi.vercel.app/issues/${id}`, {
                        method: "DELETE"
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Issue has been deleted successfully",
                                    icon: "success",
                                    confirmButtonColor: "#059669",
                                    background: 'oklch(var(--b1))',
                                    color: 'oklch(var(--bc))'
                                });
                                const remainingIssues = issues.filter(issue => issue._id !== id)
                                setIssues(remainingIssues)
                            }
                        })
                }
            })
    }

    const getCategoryColor = (category) => {
        const colors = {
            'Garbage': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800',
            'Illegal Construction': 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800',
            'Broken Public Property': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
            'Road Damage': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800'
        };
        return colors[category] || 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900/20 pt-40 pb-20">
            <title>Community Cleanliness - My Issues</title>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className='text-4xl md:text-5xl font-bold text-base-content mb-4'>
                        My Reported Issues
                    </h1>
                    <p className='text-lg text-base-content/70 max-w-2xl mx-auto'>
                        Manage and track all the community issues you've reported
                    </p>
                </motion.div>


                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-base-100 rounded-2xl shadow-lg border border-base-300 p-6 mb-8"
                >
                    <div className="flex justify-center">
                        <div className="text-center p-6">
                            <div className="text-4xl text-[#228B22] font-bold mb-2">
                                {issues.length}
                            </div>
                            <div className="text-sm font-medium text-base-content/70">
                                Total Issues Reported
                            </div>
                        </div>
                    </div>
                </motion.div>


                {issues.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-16"
                    >
                        <FileText className="w-24 h-24 text-base-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-semibold text-base-content/70 mb-2">
                            No Issues Reported
                        </h3>
                        <p className="text-base-content/60 mb-6">
                            You haven't reported any community issues yet.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn bg-[#228B22] text-white font-semibold py-3 px-8 rounded-xl"
                        >
                            <Link to="/addIssue">
                                Report First Issue
                            </Link>
                        </motion.button>
                    </motion.div>
                ) : (
                    <div className="grid gap-6">
                        <AnimatePresence>
                            {issues.map((issue, index) => (
                                <motion.div
                                    key={issue._id}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="hidden"
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="bg-base-100 rounded-2xl shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300 overflow-hidden hover:border-primary/50"
                                >
                                    <div className="p-6">
                                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-3">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(issue.category)}`}>
                                                        {issue.category}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-sm text-base-content/70">
                                                        <Calendar size={14} />
                                                        {new Date(issue.timestamp || Date.now()).toLocaleDateString()}
                                                    </span>
                                                </div>

                                                <h3 className="text-xl font-semibold text-base-content mb-2">
                                                    {issue.title}
                                                </h3>

                                                <p className="text-base-content/70 mb-3 line-clamp-2">
                                                    {issue.description}
                                                </p>

                                                <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/70">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin size={14} />
                                                        {issue.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">

                                                        ৳ {issue.amount?.toLocaleString()}
                                                    </span>
                                                </div>
                                            </div>


                                            <div className="flex items-center gap-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleIssueModal(issue)}
                                                    className="btn bg-[#228B22]  text-white gap-2"
                                                >
                                                    <Edit3 size={16} />
                                                    Edit
                                                </motion.button>

                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => handleIssueDelete(issue._id)}
                                                    className="btn btn-outline bg-white text-gray-700 gap-2"
                                                >
                                                    <Trash2 size={16} />
                                                    Delete
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}


                <dialog ref={issueModalRef} className="modal modal-middle">
                    <div className="modal-box max-w-2xl p-0 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:bg-black bg-white">


                        <div className="p-6 bg-green-600 text-white relative border-b-4 border-green-700">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-bold flex items-center gap-3 tracking-wide">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="26"
                                            height="26"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-refresh-cw"
                                        >
                                            <path d="M21 12a9 9 0 0 0-9-9c-4.65 0-7.9 4.35-7.9 9" />
                                            <path d="M3 12a9 9 0 0 0 9 9c4.65 0 7.9-4.35 7.9-9" />
                                            <path d="M12 21V12.5" />
                                            <path d="M16 16.5 12 12.5 8 16.5" />
                                        </svg>
                                        Update Issue
                                    </h3>
                                    <p className="opacity-80 mt-1 text-sm font-medium">
                                        Modify your issue details below and submit for review.
                                    </p>
                                </div>


                                <motion.button
                                    whileHover={{ scale: 1.1, rotate: 90 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => issueModalRef.current.close()}
                                    className="btn btn-ghost btn-circle btn-sm text-white hover:bg-white/20 transition-all duration-300"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-x"
                                    >
                                        <path d="M18 6 6 18" />
                                        <path d="m6 6 12 12" />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>


                        {selectedIssue && (
                            <form
                                onSubmit={(e) => handleIssueUpdate(selectedIssue._id, e)}
                                className="p-8"
                            >
                                <div className="space-y-6">

                                    <div className="form-control">
                                        <label className="label flex">
                                            <span className="label-text text-lg font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="#228B22"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-alert-circle"
                                                >
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="12" x2="12" y1="8" y2="12" />
                                                    <line x1="12" x2="12.01" y1="16" y2="16" />
                                                </svg>
                                                Issue Title
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            name="title"
                                            defaultValue={selectedIssue.title}
                                            required
                                            placeholder="Enter a descriptive title for the issue..."
                                            className="input input-bordered w-full input-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                                        />
                                    </div>


                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                        <div className="form-control">
                                            <label className="label flex">
                                                <span className="label-text font-bold text-gray-700 dark:text-gray-200">
                                                    Category
                                                </span>
                                            </label>
                                            <select
                                                name="category"
                                                defaultValue={selectedIssue.category}
                                                required
                                                className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                                            >
                                                <option value="" disabled>
                                                    Select Issue Type
                                                </option>
                                                <option value="Garbage">🗑️ Garbage</option>
                                                <option value="Illegal Construction">
                                                    🏗️ Illegal Construction
                                                </option>
                                                <option value="Broken Public Property">
                                                    ⚡ Broken Public Property
                                                </option>
                                                <option value="Road Damage">🛣️ Road Damage</option>
                                            </select>
                                        </div>

                                        <div className="form-control">
                                            <label className="label flex">
                                                <span className="label-text font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="20"
                                                        height="20"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="#228B22"
                                                        strokeWidth="2"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        className="lucide lucide-dollar-sign"
                                                    >
                                                        <line x1="12" x2="12" y1="2" y2="22" />
                                                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                                    </svg>
                                                    Estimated Amount (৳)
                                                </span>
                                            </label>
                                            <input
                                                type="number"
                                                name="amount"
                                                defaultValue={selectedIssue.amount}
                                                placeholder="Enter estimated cost (optional)..."
                                                className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-green-600"
                                            />
                                        </div>
                                    </div>


                                    <div className="form-control">
                                        <label className="label flex">
                                            <span className="mb-2 label-text text-lg font-bold text-gray-700 dark:text-gray-200">
                                                Detailed Description
                                            </span>
                                        </label>
                                        <textarea
                                            name="description"
                                            defaultValue={selectedIssue.description}
                                            required
                                            placeholder="Describe the issue, location, and potential remedies in detail..."
                                            className="textarea w-full textarea-bordered h-36 focus:outline-none focus:ring-2 focus:ring-green-600 resize-none text-base"
                                        />
                                        <div className="label">
                                            <span className="mt-2 label-text-alt text-gray-500 dark:text-gray-100">
                                                Be specific about the location and nature of the issue for
                                                faster resolution.
                                            </span>
                                        </div>
                                    </div>
                                </div>


                                <div className="modal-action mt-8 flex flex-col sm:flex-row gap-4">
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02, backgroundColor: '#3CB33C' }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={updateLoading}
                                        className="btn text-white flex-1 text-lg py-4 font-semibold shadow-lg transition-all duration-200"
                                        style={{ backgroundColor: '#228B22' }}
                                    >
                                        {updateLoading ? (
                                            <>
                                                <span
                                                    className="loading loading-spinner loading-sm"
                                                    style={{ color: 'white' }}
                                                ></span>
                                                Updating...
                                            </>
                                        ) : (
                                            <>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-save"
                                                >
                                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                                    <polyline points="17 21 17 13 7 13 7 21" />
                                                    <polyline points="7 3 7 8 15 8" />
                                                </svg>
                                                Save Changes
                                            </>
                                        )}
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => issueModalRef.current.close()}
                                        className="btn btn-outline flex-1 text-lg py-4 font-semibold transition-all duration-200 border-green-600 text-green-700"
                                    >
                                        Cancel
                                    </motion.button>
                                </div>


                                <div className="mt-6 p-4 rounded-xl text-center bg-green-50 border border-green-200">
                                    <p className="text-sm font-medium text-gray-600">
                                        💡 Your updates will be reviewed by our team before being approved
                                        and going live.
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>


                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>

            </div>
        </div>
    );
};

export default MyIssues;