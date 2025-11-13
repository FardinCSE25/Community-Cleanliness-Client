import React, { use, useEffect, useRef, useState } from 'react';
import { MapPin, Calendar, Wallet, User, DollarSign, List, X, Heart, Share2, Target } from "lucide-react";
import { useLoaderData, useParams } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import Loading from '../Components/Loading';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const IssueDetails = () => {
    // --- State and Context Hooks ---
    const issues = useLoaderData();
    const contributionModalRef = useRef(null);
    const [contribution, setContribution] = useState([]);
    const { user } = use(AuthContext);

    const { id } = useParams();
    const issue = issues.find(iss => iss._id === id);

    // --- Data Fetching Effect ---
    useEffect(() => {
        if (!issue?._id) return;
        
        fetch(`https://community-cleanliness-server-phi.vercel.app/issues/contribution/${issue._id}`)
            .then(res => res.json())
            .then(data => {
                setContribution(data);
            })
            .catch(error => console.error("Error fetching contributions:", error));
    }, [issue?._id]);

    // --- Handlers ---
    const handleContributionModal = () => {
        if (!user) {
             Swal.fire({
                icon: "error",
                title: "Authentication Required",
                text: "Please log in to make a contribution.",
            });
            return;
        }

        contributionModalRef.current.showModal();
    }

    const handleContributionSubmit = (e) => {
        e.preventDefault();
        
        // Form field data extraction
        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const amount = form.amount.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const address = form.address.value;

        const newContribution = {
            issueId: issue._id,
            title: title,
            category: category,
            amount: parseFloat(amount),
            name: name,
            email: email,
            phone: phone,
            address: address,
            photo: user?.photoURL || 'https://i.ibb.co/L8G2Q8g/default-user.png',
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
                    contributionModalRef.current.close();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Thanks for your Contribution!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    
                    newContribution._id = data.insertedId;
                    setContribution(prev => [...prev, newContribution]);
                } else {
                     Swal.fire("Error", "Failed to record contribution.", "error");
                }
            })
            .catch(error => {
                console.error("Contribution submission error:", error);
                 Swal.fire("Error", "An error occurred during submission.", "error");
            });
    }

    // --- UI Helpers ---
    const totalContribution = contribution.reduce((sum, con) => sum + (parseFloat(con.amount) || 0), 0).toFixed(2);
    const progressPercentage = Math.min((totalContribution / issue.amount) * 100, 100);
    
    // --- Framer Motion Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.4,
                when: "beforeChildren",
                staggerChildren: 0.1,
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
    };
    
    const tableRowVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3
            }
        })
    };

    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });

    if (!issue) return <Loading />;

    return (
        <>
            <title>Community Cleanliness - {issue.title}</title>
            <motion.div 
                className="max-w-7xl mx-auto pt-32 pb-16 px-4 sm:px-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold dark:text-white text-gray-900 mb-3 leading-tight">
                        {issue.title}
                    </h1>
                    <div className="flex flex-wrap justify-center items-center gap-3 text-sm">
                        <span className="px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 font-semibold shadow-sm">
                            {issue.category}
                        </span>
                        <div className="flex items-center dark:text-gray-300 gap-1 text-gray-600">
                            <MapPin size={14} className="text-green-500" />
                            {issue.location}
                        </div>
                        <div className="flex items-center dark:text-gray-300 gap-1 text-gray-600">
                            <Calendar size={14} className="text-green-500" />
                            {issue.date}
                        </div>
                    </div>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Left Column - Issue Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image */}
                        <motion.div 
                            variants={itemVariants} 
                            className="w-full h-80 sm:h-96 bg-gray-200 rounded-xl overflow-hidden shadow-lg"
                            whileHover={{ scale: 1.005 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <img
                                src={issue.image}
                                alt={issue.title}
                                className="w-full h-full object-cover transition duration-500 hover:scale-[1.02]"
                                referrerPolicy="no-referrer"
                            />
                        </motion.div>

                        {/* Description */}
                        <motion.div 
                            variants={itemVariants} 
                            className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
                        >
                            <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white flex items-center gap-2">
                                <Target size={20} className="text-green-500" />
                                Issue Description
                            </h3>
                            <p className="dark:text-gray-200 text-gray-700 leading-relaxed">
                                {issue.description}
                            </p>
                        </motion.div>

                        {/* Contribution Progress */}
                        <motion.div variants={itemVariants} className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold text-lg text-gray-900 dark:text-white">Funding Progress</h3>
                                <span className="text-green-600 dark:text-green-400 font-bold">৳ {totalContribution} / ৳ {issue.amount}</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                                <motion.div 
                                    className="bg-green-500 h-3 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progressPercentage}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <button 
                                    onClick={handleContributionModal} 
                                    className="bg-green-600 hover:bg-green-700 text-white py-2.5 px-6 rounded-lg font-semibold shadow-md transition transform hover:scale-[1.02] flex items-center gap-2"
                                >
                                    <Wallet size={18} />
                                    Contribute Now
                                </button>
                                <div className="flex gap-2">
                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                                        <Heart size={18} className="text-gray-500" />
                                    </button>
                                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition">
                                        <Share2 size={18} className="text-gray-500" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column - Contributions */}
                    <motion.div variants={itemVariants} className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-fit sticky top-32">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                            <List size={20} className="text-green-600" />
                            Recent Contributions 
                            <span className='text-sm text-green-600 dark:text-green-400'>({contribution.length})</span>
                        </h3>
                        
                        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                            {contribution.length > 0 ? (
                                contribution.map((con, index) => (
                                    <motion.div 
                                        key={con._id}
                                        custom={index}
                                        variants={tableRowVariants}
                                        initial="hidden"
                                        animate="visible"
                                        className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition duration-200 border border-gray-100 dark:border-gray-600"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full overflow-hidden">
                                                <img 
                                                    referrerPolicy="no-referrer"
                                                    src={con.photo || 'https://i.ibb.co/L8G2Q8g/default-user.png'}
                                                    alt={con.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white text-sm">{con.name}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{con.date}</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-green-600 dark:text-green-400">
                                            ৳ {con.amount}
                                        </span>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400 italic">
                                    No contributions yet. Be the first to contribute!
                                </div>
                            )}
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-5 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-100 dark:border-green-800">
                            <div className="text-center">
                                <div className="text-green-700 dark:text-green-400 text-2xl font-bold">৳ {totalContribution}</div>
                                <div className="text-green-600 dark:text-green-300 text-sm">Total Raised</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Contribution Modal */}
            <dialog ref={contributionModalRef} className="modal modal-bottom sm:modal-middle">
                <AnimatePresence>
                    <motion.div 
                        className="modal-box p-5 bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <h3 className="font-bold text-xl mb-4 text-center text-gray-900 dark:text-white">
                            Make Your Contribution
                        </h3>
                        
                        <form onSubmit={handleContributionSubmit} className="space-y-4">
                            <input type="hidden" name='title' defaultValue={issue.title} />
                            <input type="hidden" name='category' defaultValue={issue.category} />
                            <input type="hidden" name='email' defaultValue={user?.email} readOnly />
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <fieldset className="space-y-1">
                                    <label className="label dark:text-gray-300 text-gray-700 font-medium text-sm">
                                        Your Name *
                                    </label>
                                    <input 
                                        type="text" 
                                        name='name' 
                                        className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 text-sm h-10"
                                        placeholder="Your Name"
                                        required
                                        defaultValue={user?.displayName || ''}
                                    />
                                </fieldset>
                                
                                <fieldset className="space-y-1">
                                    <label className="label dark:text-gray-300 text-gray-700 font-medium text-sm">
                                        Amount (৳) *
                                    </label>
                                    <input 
                                        type="number" 
                                        name='amount' 
                                        className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 text-sm h-10 font-semibold"
                                        placeholder={`${issue.amount}`}
                                        required
                                        min="1"
                                    />
                                </fieldset>
                            </div>
                            
                            <fieldset className="space-y-1">
                                <label className="label dark:text-gray-300 text-gray-700 font-medium text-sm">
                                    Address
                                </label>
                                <input 
                                    type="text" 
                                    name='address' 
                                    className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 text-sm h-10"
                                    placeholder="Your Address"
                                />
                            </fieldset>
                            
                            <fieldset className="space-y-1">
                                <label className="label dark:text-gray-300 text-gray-700 font-medium text-sm">
                                    Phone Number
                                </label>
                                <input 
                                    type="text" 
                                    name='phone' 
                                    className="input input-bordered w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600 text-sm h-10"
                                    placeholder="017xxxxxxxx"
                                />
                            </fieldset>

                            <motion.button 
                                type="submit" 
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg font-semibold text-base shadow-md mt-2 flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                            >
                                <Wallet size={18} />
                                Pay Contribution
                            </motion.button>
                        </form>

                        <div className="modal-action mt-4">
                            <form method="dialog" className="w-full">
                                <motion.button 
                                    className="btn btn-sm btn-ghost w-full text-gray-500 dark:text-gray-400 text-sm h-9"
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <X size={16} /> Close
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </dialog>
        </>
    );
};

export default IssueDetails;