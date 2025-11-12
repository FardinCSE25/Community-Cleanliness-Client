import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Facebook, Youtube, ArrowRight, BookOpen, Mail } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6"; 
import { Link } from 'react-router';
import logo from "../assets/28ea99ca-c20d-4bea-adfa-cd5f91d53bb2.jpeg"

// Framer Motion variants
const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
};

const Footer = () => {
    return (
        <motion.footer
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="font-inter bg-gray-50 pt-0"
        >
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-[#228B22] py-12 rounded-t-[3rem] md:rounded-t-3xl shadow-2xl"
            >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                    <h3 className="text-3xl font-bold text-white mb-4 md:mb-0 text-center md:text-left">
                        Join Hands to Keep Our Community Clean
                    </h3>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.8)" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 bg-white text-[#228B22] font-semibold py-3 px-8 rounded-full shadow-lg transition-colors duration-200"
                    >
                        <Link to="/addIssue">Report an Issue</Link>
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </motion.div>

            <motion.div variants={staggerContainer} className="bg-white pt-16 pb-12 shadow-inner">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
                    <motion.div variants={item} className="space-y-4 col-span-2 md:col-span-1">
                        <div className="flex items-center justify-between text-xl font-bold text-[#228B22]">

                            <img
                                src={logo}
                                alt="Logo"
                                className=" w-8 h-8 rounded-full pb-3 md:pb-0"
                            />

                            <div className='text-[#228B22] w-[235px] font-bold text-xl'>Community Cleanliness & Issue Reporting Portal</div>
                        </div>
                        <p className="text-gray-600 text-sm">
                            Empowering citizens to report, track, and resolve environmental and cleanliness issues.
                            Together we can make our cities greener, cleaner, and better for all. 🌿
                        </p>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Mail className="w-4 h-4 text-[#228B22] hover:text-green-800" />
                            <a href="mailto:fardinahmed3200@gmail.com" className="hover:text-[#228B22] transition">
                                fardinahmed3200@gmail.com
                            </a>
                        </div>
                    </motion.div>

                    <motion.nav variants={item} className="space-y-3">
                        <h6 className="text-lg font-bold text-gray-800 border-b-2 border-green-200 pb-1">
                            Our Services
                        </h6>
                        <a href='/addIssue' className="text-gray-600 hover:text-[#228B22] transition block text-sm">
                            Report Environmental Issues
                        </a>
                        <a className="text-gray-600 hover:text-[#228B22] transition block text-sm">
                            Track Cleanup Progress
                        </a>
                        <a className="text-gray-600 hover:text-[#228B22] transition block text-sm">
                            Request Community Drives
                        </a>
                        <a className="text-gray-600 hover:text-[#228B22] transition block text-sm">
                            Pay Cleanup Contributions
                        </a>
                    </motion.nav>

                    <motion.nav variants={item} className="space-y-3">
                        <h6 className="text-lg font-bold text-gray-800 border-b-2 border-green-200 pb-1">
                            About
                        </h6>
                        <a className="text-gray-600 hover:text-[#228B22] transition block text-sm">
                            About Our Mission
                        </a>
                        <a className="text-gray-600 hover:text-[#228B22] transition block text-sm">
                            Contact & Support
                        </a>
                        <a className="text-gray-600 hover:text-[#228B22] transition block text-sm">
                            Join as Volunteer
                        </a>
                        <a className="text-gray-600 hover:text-[#228B22] transition block text-sm">
                            Community Success Stories
                        </a>
                    </motion.nav>

                    <motion.nav variants={item} className="space-y-3">
                        <h6 className="text-lg font-bold text-gray-800 border-b-2 border-green-200 pb-1">
                            Legal
                        </h6>
                        <a className="text-gray-600 hover:text-[#228B22] transition block text-sm">
                            Terms of Service
                        </a>
                        <a className="text-gray-600 hover:text-[#228B22] transition block text-sm">
                            Privacy Policy
                        </a>
                        <a className="text-gray-600 hover:text-[#228B22] transition block text-sm">
                            Data Protection
                        </a>
                        <a className="text-gray-600 hover:text-[#228B22] transition block text-sm">
                            Environmental Guidelines
                        </a>
                    </motion.nav>
                </div>
            </motion.div>

            <div className="bg-white border-t border-gray-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p className="mb-3 md:mb-0">
                        &copy; {new Date().getFullYear()} Community Cleanliness & Issue Reporting Portal. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <motion.a
                            href="https://www.facebook.com/fardin.ahmed.493619/"
                            target="blank"
                            aria-label="Facebook"
                            whileHover={{ scale: 1.1, color: '#1877f2' }}
                            className="text-[#228B22] hover:text-blue-600 transition"
                        >
                            <Facebook className="w-5 h-5" />
                        </motion.a>

                        <motion.a
                            href="https://x.com/FardinAhmed203"
                            target="blank"
                            aria-label="Twitter"
                            whileHover={{ scale: 1.1, color: '#000000' }}
                            className="text-[#228B22] hover:text-black transition"
                        >
                            <FaXTwitter className='w-5 h-5'/>
                        </motion.a>

                        <motion.a
                            href="https://www.youtube.com/@Nafiz0809"
                            target="blank"
                            aria-label="YouTube"
                            whileHover={{ scale: 1.1, color: '#FF0000' }}
                            className="text-[#228B22] hover:text-red-600 transition"
                        >
                            <Youtube className="w-5 h-5" />
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;
