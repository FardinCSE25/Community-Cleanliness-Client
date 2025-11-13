// AllIssuesUI.jsx

import React from 'react';
import { 
    MapPin, 
    Calendar, 
    ArrowRight, 
    Eye, 
    Trash2, 
    Building, 
    Hammer, 
    Droplets, 
    Archive,
    AlertTriangle,
    Construction
} from "lucide-react";
import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const AllIssuesUI = ({ issue, index }) => {
    // Category configuration with Lucide icons
   const getCategoryConfig = (category) => {
    const configs = {
        'Garbage': {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-700',
            icon: Trash2,
            description: 'Waste management and sanitation issues including improper disposal and collection problems'
        },
        'Illegal Construction': {
            bg: 'bg-emerald-50',
            border: 'border-emerald-200',
            text: 'text-emerald-700',
            icon: Building,
            description: 'Unauthorized construction work and building code violations'
        },
        'Broken Public Property': {
            bg: 'bg-lime-50',
            border: 'border-lime-200',
            text: 'text-lime-700',
            icon: Hammer,
            description: 'Damaged public infrastructure including benches, lights, and public facilities'
        },
        'Road Damage': {
            bg: 'bg-teal-50',
            border: 'border-teal-200',
            text: 'text-teal-700',
            icon: Construction,
            description: 'Road maintenance issues including potholes, cracks, and surface damage'
        },
        'Waterlogging': {
            bg: 'bg-cyan-50',
            border: 'border-cyan-200',
            text: 'text-cyan-700',
            icon: Droplets,
            description: 'Drainage problems and water accumulation issues in public areas'
        },
        'Illegal Dumping': {
            bg: 'bg-green-100',
            border: 'border-green-300',
            text: 'text-green-800',
            icon: Archive,
            description: 'Unauthorized waste dumping in prohibited areas'
        }
    };
    
    return configs[category] || { 
        bg: 'bg-green-50',
        border: 'border-green-200',
        text: 'text-green-700',
        icon: AlertTriangle,
        description: 'General public issue requiring attention'
    };
};

    // Format date to "23 November 2025"
    const formatDate = (dateString) => {
        if (!dateString) return 'Date not available';
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        } catch {
            return 'Invalid date';
        }
    };

    const categoryConfig = getCategoryConfig(issue.category);
    const CategoryIcon = categoryConfig.icon;

    // Animation variants
    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 30
        },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.5,
                delay: index * 0.1
            } 
        },
        hover: { 
            y: -4,
            transition: { 
                duration: 0.2
            } 
        }
    };

    const imageVariants = {
        hover: { 
            scale: 1.08,
            transition: { 
                duration: 0.4
            }
        }
    };

    return (
        <motion.div
            className="group relative flex flex-col rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-[480px]"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            layout
        >
            {/* Image Section - Fixed height with overflow hidden */}
            <div className="h-56 w-full bg-gray-100 overflow-hidden relative flex-shrink-0">
                <motion.img
                    src={issue.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=320&fit=crop'}
                    alt={issue.title}
                    className="w-full h-full object-cover"
                    variants={imageVariants}
                    whileHover="hover"
                />

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                 <motion.div
                        className={`inline-flex absolute top-2 left-2 items-center gap-2 px-3 py-1.5 rounded-lg ${categoryConfig.bg} ${categoryConfig.border} ${categoryConfig.text} text-sm font-semibold mb-3 backdrop-blur-sm border`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.2 }}
                    >
                        <CategoryIcon size={14} />
                        <span>{issue.category || "General"}</span>
                    </motion.div>

                {/* Content Overlay on Image */}
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    {/* Category Badge */}
                   
                    {/* Title */}
                    <motion.h2 
                        className="text-xl font-bold mb-2 line-clamp-2 leading-tight"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                    >
                        {issue.title || "Untitled Issue"}
                    </motion.h2>

                    {/* Location */}
                    <motion.div 
                        className="flex items-center gap-2 text-gray-200 text-sm mb-1"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.4 }}
                    >
                        <MapPin size={14} className="text-green-300" />
                        <span className="font-medium">{issue.location || 'Location not specified'}</span>
                    </motion.div>
                </div>

                {/* View Count */}
                <motion.div
                    className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 text-white text-xs font-medium"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                >
                    <Eye size={12} />
                    <span>{issue.views || Math.floor(Math.random() * 100) + 1}</span>
                </motion.div>
            </div>

            {/* Content Section */}
            <div className="flex-1 p-5 flex flex-col">
                {/* Category Description */}
                <motion.div 
                    className="mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                >
                   
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {categoryConfig.description}
                    </p>
                </motion.div>

                {/* Issue Description */}
                <motion.p 
                    className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed flex-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                >
                    {issue.description?.slice(0, 100) || "No detailed description available. Click to view complete issue details and updates."}
                    {issue.description && issue.description.length > 100 && '...'}
                </motion.p>

                {/* Metadata Section */}
                <div className="space-y-3 mt-auto">
                    {/* Date */}
                    <motion.div 
                        className="flex items-center gap-2 text-xs text-gray-500 border-t border-gray-100 pt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                    >
                        <Calendar size={12} className="text-gray-400" />
                        <span className="font-medium">Reported on {formatDate(issue.date)}</span>
                    </motion.div>

                    {/* Cost and Action */}
                    <motion.div
                        className="flex items-center justify-between pt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.7 }}
                    >
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-500 font-medium">Estimated Cost</span>
                            <span className="text-lg font-bold text-gray-900">
                                ৳{issue.amount ? issue.amount.toLocaleString() : 'Not specified'}
                            </span>
                        </div>
                        
                        {/* Action Button */}
                        <Link
                            to={`/issueDetails/${issue._id}`}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition-colors duration-200 group/btn"
                        >
                            <span className="text-sm">View Details</span>
                            <motion.div
                                animate={{ x: [0, 3, 0] }}
                                transition={{ 
                                    duration: 1.5, 
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                <ArrowRight size={14} />
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Subtle Hover Effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-600/10 rounded-xl pointer-events-none transition-colors duration-300" />
        </motion.div>
    );
};

export default AllIssuesUI;