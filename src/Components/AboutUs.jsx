import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
    Leaf,
    Sprout,
    Heart,
    CheckCircle,
    Award,
    Users,
    Target
} from 'lucide-react';
import img from "../assets/verified-team.webp";
import badge from "../assets/badge.png";
import { Link } from 'react-router';

const AboutUs = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 30
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            rotate: -5
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.8
            }
        }
    };

    const badgeVariants = {
        hidden: {
            opacity: 0,
            scale: 0,
            rotate: -180
        },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 15,
                delay: 0.5
            }
        },
        float: {
            y: [-10, 10, -10],
            rotate: [0, 3, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const features = [
        {
            icon: <Leaf className="w-6 h-6" />,
            title: "Eco-Friendly Solutions",
            description: "Sustainable approaches to community cleanliness and environmental protection"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Community Driven",
            description: "Empowering local communities to take action and make a difference together"
        },
        {
            icon: <Target className="w-6 h-6" />,
            title: "Targeted Actions",
            description: "Focused initiatives that address specific environmental challenges effectively"
        }
    ];

    const stats = [
        { number: "500+", label: "Issues Resolved" },
        { number: "50+", label: "Communities" },
        { number: "95%", label: "Satisfaction Rate" },
        { number: "24/7", label: "Support" }
    ];

    return (
        <section className="min-h-screen py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 lg:mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full mb-6"
                    >
                        <Heart className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                            Community First Approach
                        </span>
                    </motion.div>
                    <h1 className="text-4xl lg:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            About Us
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        We're dedicated to creating cleaner, greener communities through technology,
                        collaboration, and sustainable environmental practices.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-center">

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex-1 relative"
                    >
                        <motion.div
                            variants={imageVariants}
                            className="relative"
                        >
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                                    src={img}
                                    alt="Our dedicated team working on community cleanliness"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                            </div>

        
                            <motion.div
                                variants={badgeVariants}
                                initial="hidden"
                                whileInView="visible"
                                animate="float"
                                viewport={{ once: true }}
                                className="hidden lg:block absolute -top-8 -right-8"
                            >
                                <div className="relative">
                                    <img
                                        className="w-48 h-48 object-contain drop-shadow-2xl"
                                        src={badge}
                                        alt="Certified Excellence Badge"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mix-blend-overlay opacity-20"></div>
                                </div>
                            </motion.div>

        
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                viewport={{ once: true }}
                                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-4/5"
                            >
                                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-2xl border border-gray-100 dark:border-gray-700">
                                    {stats.map((stat, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.5 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.5 + index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="text-center"
                                        >
                                            <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                                {stat.number}
                                            </div>
                                            <div className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                {stat.label}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>


                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="flex-1 max-w-2xl"
                    >
                        <motion.div variants={itemVariants} className="mb-8">
                            <h2 className="text-3xl lg:text-5xl font-bold mb-6 lg:mb-8">
                                <span className="bg-gradient-to-r from-gray-800 via-green-700 to-emerald-700 dark:from-white dark:via-green-300 dark:to-emerald-400 bg-clip-text text-transparent">
                                    Environmental Champions
                                </span>
                            </h2>


                        </motion.div>

    
                        <motion.div
                            variants={containerVariants}
                            className="grid gap-4 mt-8"
                        >
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{
                                        scale: 1.02,
                                        y: -5,
                                        transition: { type: "spring", stiffness: 300 }
                                    }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800/30"
                                >
                                    <div className="p-2 bg-green-500 rounded-lg text-white">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 dark:text-white">
                                            {feature.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

    
                        <motion.div
                            variants={itemVariants}
                            className="mt-8"
                        >
                            <motion.button
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 20px 40px rgba(5, 150, 105, 0.3)"
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full lg:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg flex items-center justify-center gap-3"
                            >
                                <Sprout className="w-5 h-5" />
                                <Link to='/register'> Join Our Mission</Link>
                                <Award className="w-5 h-5" />
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;