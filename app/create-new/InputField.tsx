"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiZap } from 'react-icons/fi';
import { BsLightbulb } from 'react-icons/bs';
import Technologies from './Technologies';
import { ToastContainer, toast } from 'react-toastify';

interface InputFieldProps {
    setter: Function
}

const InputField = ({ setter }: InputFieldProps) => {
    const [projectName, setProjectName] = useState('');
    const [showTechnologies, setShowTechnologies] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const suggestions = [
        "Frontend Projects",
        "Backend Projects",
        "Fullstack Projects",
        "Mobile Projects",
        "AI Projects"
    ];

    async function nextSection() {
        if (projectName.replace(/\s/g, '').length < 2) {
            return toast.error('Creation name must be at least 2 characters long');
        }

        setIsLoading(true);
        setter(projectName);
        
        // Add a small delay for better UX
        setTimeout(() => {
            setShowTechnologies(true);
            setIsLoading(false);
        }, 500);
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            nextSection();
        }
    };

    const fillSuggestion = (suggestion: string) => {
        setProjectName(suggestion);
    };

    return (
        <div className="min-h-screen container-fluid flex items-center justify-center p-4">
            <div className="w-full mx-auto">
                <ToastContainer 
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />

                <AnimatePresence mode="wait">
                    {!showTechnologies ? (
                        <motion.div
                            key="name-input"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            <div className="mb-8 sm:mb-12">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg"
                                >
                                    <FiZap className="text-white text-2xl sm:text-3xl" />
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="text-3xl sm:text-4xl md:text-6xl font-bold text-secondary-900 dark:text-secondary-100 mb-3 sm:mb-4 px-4"
                                >
                                    What will you <span className="text-gradient-primary">build</span> today?
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                    className="text-lg sm:text-xl text-secondary-600 dark:text-secondary-400 mb-6 sm:mb-8 px-4"
                                >
                                    Give your creation a name and let AI suggest the perfect projects for you
                                </motion.p>
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="mb-8 sm:mb-12"
                            >
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-2xl mx-auto px-4">
                                    <div className="relative flex-1 w-full sm:w-auto">
                                        <input
                                            type="text"
                                            placeholder="Name your creation..."
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            className="form-input text-center sm:text-left text-base sm:text-lg py-3 sm:py-4 px-4 sm:px-6 w-full"
                                            autoFocus
                                        />
                                    </div>
                                    
                                    <button
                                        onClick={nextSection}
                                        disabled={isLoading || projectName.replace(/\s/g, '').length < 2}
                                        className="btn btn-gradient flex items-center justify-center group disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto px-6 py-3"
                                    >
                                        {isLoading ? (
                                            <div className="w-6 sm:w-8 h-5 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                <span className="text-sm sm:text-base">Continue</span>
                                                <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6, duration: 0.5 }}
                                className="max-w-4xl mx-auto px-4"
                            >
                                <p className="text-secondary-600 dark:text-secondary-400 mb-4 sm:mb-6 text-sm sm:text-base">
                                    Need inspiration? Try one of these:
                                </p>
                                
                                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                                    {suggestions.map((suggestion, index) => (
                                        <motion.button
                                            key={suggestion}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => fillSuggestion(suggestion)}
                                            className="px-3 sm:px-4 py-2 bg-secondary-100 dark:bg-secondary-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-secondary-700 dark:text-secondary-300 hover:text-primary-700 dark:hover:text-primary-300 rounded-xl transition-all duration-300 text-xs sm:text-sm font-medium"
                                        >
                                            {suggestion}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="technologies"
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Technologies projectName={projectName} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default InputField;