import React from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Facebook, Twitter, Youtube, ArrowRight, BookOpen, Mail } from 'lucide-react';

// Framer Motion variants for staggered animation of link columns
const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Framer Motion variants for individual column animation
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
            {/* Pre-footer CTA Section */}
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-primary py-12 rounded-t-[3rem] md:rounded-t-3xl shadow-2xl"
            >
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
                    <h3 className="text-3xl font-bold text-white mb-4 md:mb-0 text-center md:text-left">
                        Ready to Master a New Skill?
                    </h3>
                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.😎" }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-2 bg-white text-primary font-semibold py-3 px-8 rounded-full shadow-lg transition-colors duration-200"
                    >
                        <span>Start Learning Today</span>
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </motion.div>

            {/* Main Footer Links */}
            <motion.div
                variants={staggerContainer}
                className="bg-white pt-16 pb-12 shadow-inner"
            >
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10">
                    
                    {/* Column 1: Brand Info */}
                    <motion.div variants={item} className="space-y-4 col-span-2 md:col-span-1">
                        <div className="flex items-center space-x-2 text-xl font-bold text-primary">
                            <BookOpen className="w-6 h-6 text-primary" />
                            <span>Community Cleanliness & Issue Reporting Portal</span>
                        </div>
                        <p className="text-gray-600 text-sm">
                            The house of useful courses. Connecting learners with expert providers worldwide.
                        </p>
                        <div className="flex items-center space-x-2 text-gray-600">
                            <Mail className="w-4 h-4 text-blue-500" />
                            <a href="mailto:contact@skillswap.com" className="hover:text-primary transition">contact@CC&IRP.com</a>
                        </div>
                    </motion.div>

                    {/* Column 2: Services */}
                    <motion.nav variants={item} className="space-y-3">
                        <h6 className="text-lg font-bold text-gray-800 border-b-2 border-blue-200 pb-1">Services</h6>
                        <a className="text-gray-600 hover:text-primary transition block text-sm">Branding Sessions</a>
                        <a className="text-gray-600 hover:text-primary transition block text-sm">Skill Workshops</a>
                        <a className="text-gray-600 hover:text-primary transition block text-sm">Personalized Coaching</a>
                        <a className="text-gray-600 hover:text-primary transition block text-sm">Provider Onboarding</a>
                    </motion.nav>

                    {/* Column 3: Company */}
                    <motion.nav variants={item} className="space-y-3">
                        <h6 className="text-lg font-bold text-gray-800 border-b-2 border-blue-200 pb-1">Company</h6>
                        <a className="text-gray-600 hover:text-primary transition block text-sm">About Us</a>
                        <a className="text-gray-600 hover:text-primary transition block text-sm">Contact</a>
                        <a className="text-gray-600 hover:text-primary transition block text-sm">Careers</a>
                        <a className="text-gray-600 hover:text-primary transition block text-sm">Press Kit</a>
                    </motion.nav>

                    {/* Column 4: Legal */}
                    <motion.nav variants={item} className="space-y-3">
                        <h6 className="text-lg font-bold text-gray-800 border-b-2 border-blue-200 pb-1">Legal</h6>
                        <a className="text-gray-600 hover:text-primary transition block text-sm">Terms of Use</a>
                        <a className="text-gray-600 hover:text-primary transition block text-sm">Privacy Policy</a>
                        <a className="text-gray-600 hover:text-primary transition block text-sm">Cookie Policy</a>
                        <a className="text-gray-600 hover:text-primary transition block text-sm">Trust & Safety</a>
                    </motion.nav>

                </div>
            </motion.div>

            {/* Bottom Bar: Copyright & Social */}
            <div className="bg-white border-t border-gray-200 px-6 py-4">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p className="mb-3 md:mb-0">
                        &copy; {new Date().getFullYear()} Community Cleanliness & Issue Reporting Portal. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <motion.a 
                            href="https://www.facebook.com/fardin.ahmed.493619/" 
                            target='blank' 
                            aria-label="Facebook"
                            whileHover={{ scale: 1.1, color: '#1877f2' }}
                            className="text-gray-500 hover:text-blue-600 transition"
                        >
                            <Facebook className="w-5 h-5" />
                        </motion.a>
                        <motion.a 
                            href="https://x.com/FardinAhmed203"
                            target='blank' 
                            aria-label="Twitter"
                            whileHover={{ scale: 1.1, color: '#1DA1F2' }}
                            className="text-gray-500 hover:text-cyan-500 transition"
                        >
                            <Twitter className="w-5 h-5" />
                        </motion.a>
                        <motion.a 
                            href="https://www.youtube.com/@Nafiz0809" 
                            target='blank' 
                            aria-label="YouTube"
                            whileHover={{ scale: 1.1, color: '#FF0000' }}
                            className="text-gray-500 hover:text-red-600 transition"
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