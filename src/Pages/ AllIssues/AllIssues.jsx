import React, { useState, useMemo } from 'react';
import { useLoaderData } from 'react-router';
// es
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search } from 'lucide-react';
import AllIssuesUI from './AllIssuesUI';

const AllIssues = () => {
    const issuesList = useLoaderData() || [];

    const issuesWithMeta = useMemo(() => issuesList.map(issue => ({
        ...issue,
        _id: issue._id || Math.random().toString(36).substring(2, 9),
        date: issue.date || new Date(Date.now() - Math.random() * 86400000 * 30).toISOString(),
    })), [issuesList]);

    const [filter, setFilter] = useState("All");

    const filteredIssues = useMemo(() => {
        let filtered = issuesWithMeta;

        if (filter !== 'All') {
            filtered = filtered.filter(issue => issue.category === filter);
        }
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

        return filtered;
    }, [filter, issuesWithMeta]);

    const categories = ["All", "Garbage", "Illegal Construction", "Broken Public Property", "Road Damage"];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };
    return (
        <div className="min-h-screen bg-gray-50/50">
            <title>Community Cleanliness - All Issues</title>

            <div className='max-w-7xl mx-auto pt-44 pb-12 px-4 sm:px-6 lg:px-8'>

                <motion.div
                    className='md:flex justify-between items-center mb-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100'
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className='text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 md:mb-0 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500'>
                        🌟 All Community Issues
                    </h1>

                    <div className='flex flex-col text-lg'>
                        <label className='ml-1 mb-1 font-semibold text-gray-700 flex items-center gap-1'>
                            <Filter size={18} className='text-green-500' /> Filter by Category:
                        </label>
                        <motion.select
                            className='w-full md:w-56 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl p-3 text-base shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 appearance-none'
                            value={filter}
                            onChange={e => setFilter(e.target.value)}
                            whileHover={{ scale: 1.01 }}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat} {cat === 'All' ? '🌍' : '➡️'}</option>
                            ))}
                        </motion.select>
                    </div>
                </motion.div>


                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    layout
                >
                    <AnimatePresence>
                        {filteredIssues.length > 0 ? (
                            filteredIssues.map((issue, index) => (
                                <motion.div key={issue._id} layout exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}>

                                    <AllIssuesUI issue={issue} index={index} />
                                </motion.div>
                            ))
                        ) : (

                            <motion.div
                                key="empty-state"
                                className="md:col-span-3 text-center py-20 bg-white/70 rounded-2xl shadow-lg border border-gray-100"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="text-7xl mb-4">😔</div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">No Issues Found</h3>
                                <p className="text-gray-500">Try selecting "All" or a different category.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default AllIssues;