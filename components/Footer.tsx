"use client";

import { NextPage } from "next";
import Link from "next/link";
import { FiMail, FiTwitter, FiGithub, FiZap, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";

const Footer: NextPage = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        {
            name: "X",
            href: "https://x.com/thepushkaraj",
            icon: FiTwitter,
            label: "Follow us on X"
        },
        {
            name: "GitHub",
            href: "https://github.com/thepushkaraj/projectplanner",
            icon: FiGithub,
            label: "View source code on GitHub"
        },
        {
            name: "Email",
            href: "mailto:contactpushkaraj@gmail.com",
            icon: FiMail,
            label: "Send us an email"
        },
    ];

    return (
        <footer className="bg-white/80 dark:bg-secondary-900/80 backdrop-blur-sm border-t border-secondary-200/50 dark:border-secondary-700/50">
            <div className="container-fluid">
                <div className="flex flex-col md:flex-row items-center justify-between py-8 gap-6">
                    <motion.div 
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative">
                                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                                    <FiZap className="text-white w-5 h-5" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                            </div>
                            <span className="text-xl font-bold text-gradient-primary group-hover:scale-105 transition-transform duration-300">
                                ProjectPlanner
                            </span>
                        </Link>
                    </motion.div>

                    <motion.div 
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <span className="text-sm text-secondary-500 dark:text-secondary-400 hidden sm:block mr-2">
                            Connect with us
                        </span>
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="relative w-10 h-10 bg-secondary-100/80 dark:bg-secondary-800/80 rounded-xl flex items-center justify-center text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 group"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                            >
                                <social.icon size={16} />
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.a>
                        ))}
                    </motion.div>

                    <motion.div 
                        className="flex items-center space-x-2 text-secondary-600 dark:text-secondary-400 text-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <span>© {currentYear} ProjectPlanner.</span>
                        <span className="hidden sm:inline">Made with</span>
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                            className="text-red-500"
                        >
                            <FiHeart size={14} className="fill-current" />
                        </motion.div>
                        <span className="hidden sm:inline">for developers</span>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;