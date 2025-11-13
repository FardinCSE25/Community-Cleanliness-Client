import { MapPin, Clock, Eye, AlertCircle } from 'lucide-react';
import React, { useState } from 'react';
import { Link } from 'react-router';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Mock Statuses/Severity (since the original issue object didn't have a status)
const issueSeverities = {
  'Garbage': 'High',
  'Illegal Construction': 'Critical',
  'Broken Public Property': 'Medium',
  'Road Damage': 'High',
  'Waterlogging': 'Critical',
  'Illegal Dumping': 'Medium',
  'Other': 'Low'
};

const RecentIssuesUI = ({ issue, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 20,
        delay: index * 0.08
      }
    },
    hover: {
      y: -6, // Increased hover lift
      scale: 1.02, // Slightly increased scale
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)", // Added shadow for depth
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'Garbage': { gradient: 'from-green-500 to-emerald-500', text: 'text-green-500' },
      'Illegal Construction': { gradient: 'from-lime-500 to-green-500', text: 'text-lime-500' },
      'Broken Public Property': { gradient: 'from-teal-500 to-cyan-500', text: 'text-teal-500' },
      'Road Damage': { gradient: 'from-emerald-500 to-teal-500', text: 'text-emerald-500' },
      'Waterlogging': { gradient: 'from-cyan-500 to-blue-500', text: 'text-cyan-500' },
      'Illegal Dumping': { gradient: 'from-slate-500 to-gray-500', text: 'text-slate-500' }
    };
    return colors[category] || { gradient: 'from-green-500 to-emerald-500', text: 'text-green-500' };
  };

  // Get severity color for the right-side section
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'Critical': return { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-600 dark:text-red-400', ring: 'ring-red-500' };
      case 'High': return { bg: 'bg-orange-100 dark:bg-orange-900/50', text: 'text-orange-600 dark:text-orange-400', ring: 'ring-orange-500' };
      case 'Medium': return { bg: 'bg-yellow-100 dark:bg-yellow-900/50', text: 'text-yellow-600 dark:text-yellow-400', ring: 'ring-yellow-500' };
      default: return { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-600 dark:text-green-400', ring: 'ring-green-500' };
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const categoryStyle = getCategoryColor(issue.category);
  const severity = issueSeverities[issue.category] || issueSeverities['Other'];
  const severityStyle = getSeverityStyle(severity);

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      viewport={{ once: true, amount: 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group bg-white dark:bg-gray-800 rounded-2xl p-0 shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all duration-300 transform hover:shadow-2xl"
    >
      {/* Animated Background Gradient */}
      <motion.div
        animate={isHovered ? { opacity: 0.08 } : { opacity: 0 }}
        className={`absolute inset-0 bg-gradient-to-br ${categoryStyle.gradient} opacity-0 transition-opacity duration-500 pointer-events-none`}
      />

      <div className="flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gray-100 dark:divide-gray-700">
        {/* Left Side: Issue Details */}
        <div className="flex-1 p-5 relative z-10">
          {/* Header with Category and Date */}
          <div className="flex items-center justify-between mb-3">
            <motion.div variants={itemVariants}>
              <motion.span
                whileHover={{ scale: 1.02 }}
                className={`inline-flex items-center gap-1.5 text-[10px] px-2.5 py-1 bg-gradient-to-r ${categoryStyle.gradient} text-white rounded-full font-semibold shadow-md`}
              >
                <motion.div
                  variants={pulseVariants}
                  animate="pulse"
                  className="w-1.5 h-1.5 bg-white rounded-full"
                />
                {issue.category}
              </motion.span>
            </motion.div>

            <motion.span
              variants={itemVariants}
              className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1"
            >
              <Clock size={12} className={categoryStyle.text} />
              **Reported:** {issue.createdAt && formatDate(issue.createdAt)}
            </motion.span>
          </div>

          {/* Title */}
          <motion.h2
            variants={itemVariants}
            className="text-lg font-extrabold text-gray-900 dark:text-white line-clamp-1 mb-2 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-300 leading-snug"
          >
            {issue.title || "No title available."}
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 leading-relaxed"
          >
            {issue.description || "No description available for this issue."}
          </motion.p>

          {/* Footer Info */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between text-xs"
          >
            <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
              <MapPin size={14} className="text-green-500" />
              <span className="truncate max-w-[120px] font-medium">{issue.location || "Unknown Location"}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-gray-400">
                <Eye size={14} />
                <span className="text-xs">{issue.views || 0} Views</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Action and Severity Section */}
        <div className="w-full sm:w-44 flex-shrink-0 p-5 flex flex-col justify-between items-center text-center">
          
          {/* Severity Badge */}
          <motion.div
            variants={itemVariants}
            className={`w-full p-3 rounded-xl ${severityStyle.bg} border border-dashed ${severityStyle.ring} dark:border-none`}
          >
            <AlertCircle size={20} className={`mx-auto mb-1 ${severityStyle.text}`} />
            <p className="text-xs font-semibold uppercase tracking-wider">
              Priority
            </p>
            <p className={`text-lg font-bold ${severityStyle.text}`}>
              {severity}
            </p>
          </motion.div>

          {/* Details Button */}
          <Link
            to={`/issueDetails/${issue._id}`}
            className="w-full mt-4"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-semibold py-2.5 rounded-xl shadow-lg transition-all duration-200 flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-700"
            >
              <Eye size={16} />
              <span>View Details</span>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentIssuesUI;