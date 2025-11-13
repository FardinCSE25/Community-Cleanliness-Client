// AllIssuesUI.jsx

import React from 'react';
import { MapPin, Tag, DollarSign, ArrowRight, Clock, AlertTriangle, Users, Eye } from "lucide-react";
import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const AllIssuesUI = ({ issue, index }) => {
    // Category color mapping
    const getCategoryColor = (category) => {
      
        const colors = {
            'Garbage': { 
                gradient: 'from-red-500 to-orange-500', 
                text: 'text-red-500',
                light: 'bg-red-50',
                border: 'border-red-200',
                icon: '🗑️'
            },
            'Illegal Construction': { 
                gradient: 'from-yellow-500 to-amber-500', 
                text: 'text-yellow-500',
                light: 'bg-yellow-50',
                border: 'border-yellow-200',
                icon: '🏗️'
            },
            'Broken Public Property': { 
                gradient: 'from-blue-500 to-cyan-500', 
                text: 'text-blue-500',
                light: 'bg-blue-50',
                border: 'border-blue-200',
                icon: '⚡'
            },
            'Road Damage': { 
                gradient: 'from-purple-500 to-pink-500', 
                text: 'text-purple-500',
                light: 'bg-purple-50',
                border: 'border-purple-200',
                icon: '🛣️'
            },
            'Waterlogging': { 
                gradient: 'from-teal-500 to-blue-500', 
                text: 'text-teal-500',
                light: 'bg-teal-50',
                border: 'border-teal-200',
                icon: '💧'
            },
            'Illegal Dumping': { 
                gradient: 'from-gray-500 to-slate-500', 
                text: 'text-gray-500',
                light: 'bg-gray-50',
                border: 'border-gray-200',
                icon: '🚯'
            }
        };
        return colors[category] || { 
            gradient: 'from-green-500 to-emerald-500', 
            text: 'text-green-500',
            light: 'bg-green-50',
            border: 'border-green-200',
            icon: '📌'
        };
    };

    // Severity style mapping

    const categoryColor = getCategoryColor(issue.category);

    // Animation variants
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 60, 
            scale: 0.9,
            rotateX: -10
        },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            rotateX: 0,
            transition: { 
                duration: 0.8, 
                type: "spring", 
                stiffness: 80,
                damping: 15,
                delay: index * 0.1
            } 
        },
        hover: { 
            y: -12, 
            scale: 1.02,
            rotateY: 2,
            transition: { 
                type: "spring", 
                stiffness: 400,
                damping: 25
            } 
        },
        tap: { 
            scale: 0.98,
            transition: { 
                type: "spring", 
                stiffness: 500 
            } 
        }
    };

    const imageVariants = {
        hover: { 
            scale: 1.15,
            rotateZ: 0.5,
            transition: { 
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const floatAnimation = {
        y: [0, -8, 0],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }
    };

    return (
        <motion.div
            className="group relative h-[500px] flex flex-col rounded-3xl overflow-hidden bg-white border-2 border-gray-100 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-pointer transform perspective-1000"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            whileTap="tap"
            layout
        >
            {/* Background Glow Effect */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${categoryColor.gradient} opacity-0 group-hover:opacity-5 blur-xl transition-opacity duration-500`}
                animate={{
                    backgroundPosition: ['0% 0%', '100% 100%'],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            {/* Image Section with Enhanced Overlay */}
            <div className="h-60 w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
                <motion.img
                    src={issue.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop'}
                    alt={issue.title}
                    className="w-full h-full object-cover transform brightness-95 saturate-110"
                    variants={imageVariants}
                    whileHover="hover"
                />

                {/* Multi-layer Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Category Badge with Enhanced Animation */}
                <motion.div
                    className={`bg-gradient-to-r ${categoryColor.gradient} absolute top-4 left-4 px-4 py-2 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl`}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
                >
                    <span className="flex items-center gap-2 text-white font-bold text-sm">
                        <motion.span
                            animate={floatAnimation}
                        >
                            {categoryColor.icon}
                        </motion.span>
                        {issue.category || "General"}
                    </span>
                </motion.div>

                {/* Severity Indicator with Pulse */}
                {/* <motion.div
                    className={`absolute top-4 right-4 flex items-center gap-2 px-3 py-2 rounded-2xl backdrop-blur-md ${severityStyle.bg} ${severityStyle.text} border border-white/30 shadow-lg`}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.1 + 0.4 }}
                >
                    <motion.div
                        className={`w-2 h-2 rounded-full ${severityStyle.pulse} ring-2 ring-white`}
                        animate={pulseAnimation}
                    />
                    <span className="text-xs font-bold flex items-center gap-1">
                        {severityStyle.icon} {issue.severity || 'Medium'}
                    </span>
                </motion.div> */}

                {/* View Count Badge */}
                <motion.div
                    className="absolute bottom-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full backdrop-blur-md bg-black/50 text-white text-xs"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                >
                    <Eye size={12} />
                    <span>{issue.views || Math.floor(Math.random() * 100) + 1}</span>
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow relative z-10">
                <div className="flex-grow">
                    {/* Title with Gradient Text */}
                    <motion.h2 
                        className="text-2xl font-black mb-3 line-clamp-2 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent group-hover:from-green-700 group-hover:to-emerald-600 transition-all duration-500"
                        whileHover={{ x: 3 }}
                    >
                        {issue.title || "🚫 Untitled Issue"}
                    </motion.h2>

                    {/* Location with Enhanced Styling */}
                    <motion.div 
                        className="flex items-center gap-3 text-gray-600 text-sm mb-4 pb-3 border-b border-gray-100 group-hover:border-gray-200 transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                    >
                        <motion.div
                            className="p-2 bg-red-50 rounded-lg"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <MapPin size={16} className="text-red-500" />
                        </motion.div>
                        <span className='font-semibold'>📍 {issue.location || 'Unknown Location'}</span>
                    </motion.div>

                    {/* Description */}
                    <motion.p 
                        className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed h-[60px] group-hover:text-gray-700 transition-colors duration-300"
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                    >
                        {issue.description?.slice(0, 150) || "📝 A brief description of the issue is not available. Click to see details."}
                    </motion.p>

                    {/* Stats Row */}
                    <motion.div 
                        className="flex items-center justify-between text-xs text-gray-500 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                    >
                        <div className="flex items-center gap-4">
                            <motion.div 
                                className="flex items-center gap-1"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Clock size={14} />
                                <span>{issue.date || '2 days ago'}</span>
                            </motion.div>
                            {/* <motion.div 
                                className="flex items-center gap-1"
                                whileHover={{ scale: 1.05 }}
                            >
                                <Users size={14} />
                                <span>{issue.supporters || '15'} supporters</span>
                            </motion.div> */}
                        </div>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="flex items-center gap-1 text-orange-500"
                        >
                            <AlertTriangle size={14} />
                            <span>Urgent</span>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Cost & Action Section */}
                <div className="pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-300 flex justify-between items-center mt-auto">
                    {/* Cost with Taka Sign */}
                    <motion.div
                        className="flex items-center gap-3"
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.div
                            className="p-2 bg-green-50 rounded-xl border border-green-100"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.7 }}
                        >
                            
                        </motion.div>
                        <div>
                            <div className="text-xs text-gray-500 font-medium">Estimated Cost</div>
                            <div className="text-xl font-black text-gray-900 flex items-center gap-1">
                                <motion.span
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="text-green-600"
                                >
                                    ৳
                                </motion.span>
                                {issue.amount ? issue.amount.toLocaleString() : 'N/A'}
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Button with Enhanced Animation */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            to={`/issueDetails/${issue._id}`}
                            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-green-600 to-green-400 shadow-lg hover:shadow-xl transition-all duration-300 group/btn relative overflow-hidden`}
                        >
                            {/* Button Background Animation */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
                                whileHover={{ x: ['0%', '100%'] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                            
                            <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                                View Details
                            </span>
                            <motion.div
                                className="relative z-10"
                                animate={{ x: [0, 4, 0] }}
                                transition={{ 
                                    duration: 1.5, 
                                    repeat: Infinity, 
                                    ease: "easeInOut",
                                    repeatDelay: 1
                                }}
                                whileHover={{ x: 8 }}
                            >
                                <ArrowRight size={18} />
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Floating Particles Effect */}
            <motion.div
                className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full opacity-60"
                animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5
                }}
            />
            <motion.div
                className="absolute bottom-2 left-2 w-1 h-1 bg-blue-400 rounded-full opacity-60"
                animate={{
                    y: [0, 15, 0],
                    opacity: [0.3, 1, 0.3],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.5 + 1
                }}
            />
        </motion.div>
    );
};

export default AllIssuesUI;