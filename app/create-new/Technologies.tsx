"use client";

import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiZap, FiSettings } from 'react-icons/fi';
import { BsLightbulb } from 'react-icons/bs';
import ProjectGrid from './projects/ProjectGrid';
import TokenContext from '@/context/tokens/tokenContext';

interface InputFieldProps {
    projectName: string;
}

const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const Technologies = ({ projectName }: InputFieldProps) => {
    const [appType, setAppType] = useState('Frontend');
    const [isJS, setIsJS] = useState(false);
    const [complexity, setComplexity] = useState('Easy');
    const [additionalTech, setAdditionalTech] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [receivedIdeas, setReceivedIdeas] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = useContext(TokenContext);

    const projectIdeasOptions = {
        projectName, appType, isJS, complexity, additionalTech
    };

    async function runFetch() {
        setLoading(true);
        try {
            const response = await fetch('/api/generate-ideas', {
                method: "post",
                body: JSON.stringify(projectIdeasOptions),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const res = await response.json();
            setReceivedIdeas(res.message);
            setLoading(false);
            token.update();
        } catch (error) {
            console.error('Error:', error);
            setLoading(false);
        }
    }

    const generateIdeas = () => {
        setShowResults(true);
        runFetch();
    };

    if (showResults) {
        return (
            <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen"
            >
                {loading ? (
                    <div className="flex flex-col items-center justify-center min-h-screen">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-800 rounded-full"></div>
                            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
                        </div>
                        <h3 className="text-xl font-semibold text-secondary-800 dark:text-secondary-200 mt-6 mb-2">
                            Generating Ideas ✨
                        </h3>
                        <p className="text-secondary-600 dark:text-secondary-400 text-center max-w-md">
                            Creating personalized project ideas for "{projectName}"...
                        </p>
                    </div>
                ) : (
                    <div className="min-h-screen">
                        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
                            <button 
                                onClick={() => setShowResults(false)}
                                className="inline-flex items-center px-3 sm:px-4 py-2 mb-6 sm:mb-8 text-secondary-600 dark:text-secondary-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 group"
                            >
                                <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                                <span className="font-medium text-sm sm:text-base">Back to Setup</span>
                            </button>
                            <ProjectGrid projects={receivedIdeas} />
                        </div>
                    </div>
                )}
            </motion.div>
        );
    }

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="min-h-screen flex items-center justify-center p-4 sm:p-6"
        >
            <div className="w-full max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-6 sm:mb-8">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                        <FiSettings className="text-white text-xl sm:text-2xl" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-3 sm:mb-4 px-4">
                        Configure <span className="text-gradient-primary">{projectName}</span>
                    </h1>
                    <p className="text-base sm:text-lg text-secondary-600 dark:text-secondary-400 px-4">
                        Quick setup to generate personalized project ideas
                    </p>
                </div>

                    {/* Form */}
                <div className="card p-4 sm:p-6 lg:p-8 space-y-6">
                    {/* App Type */}
                    <div>
                        <label className="block text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                            Project Type
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { value: 'Frontend', label: 'Frontend', icon: '🎨' },
                                { value: 'Backend', label: 'Backend', icon: '⚙️' },
                                { value: 'FullStack', label: 'Full Stack', icon: '🚀' }
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setAppType(option.value)}
                                    className={`
                                        p-3 sm:p-4 rounded-xl border-2 text-center transition-all duration-300
                                        ${appType === option.value 
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
                                            : 'border-secondary-200 dark:border-secondary-700 hover:border-primary-300 dark:hover:border-primary-600 text-secondary-700 dark:text-secondary-300'
                                        }
                                    `}
                                >
                                    <div className="text-xl sm:text-2xl mb-2">{option.icon}</div>
                                    <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>                    {/* JavaScript Option (only for Frontend) */}
                    {appType === 'Frontend' && (
                        <div>
                            <label className="block text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                                Technology Stack
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { value: false, label: 'HTML & CSS', icon: '📄' },
                                    { value: true, label: 'Include JavaScript', icon: '⚡' }
                                ].map((option) => (
                                    <button
                                        key={option.value.toString()}
                                        onClick={() => setIsJS(option.value)}
                                        className={`
                                            p-3 sm:p-4 rounded-xl border-2 text-center transition-all duration-300
                                            ${isJS === option.value 
                                                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
                                                : 'border-secondary-200 dark:border-secondary-700 hover:border-primary-300 dark:hover:border-primary-600 text-secondary-700 dark:text-secondary-300'
                                            }
                                        `}
                                    >
                                        <div className="text-xl sm:text-2xl mb-2">{option.icon}</div>
                                        <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Complexity */}
                    <div>
                        <label className="block text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                            Skill Level
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { value: 'Easy', label: 'Beginner', icon: '🌱' },
                                { value: 'Medium', label: 'Intermediate', icon: '🚀' },
                                { value: 'Hard', label: 'Advanced', icon: '💎' }
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => setComplexity(option.value)}
                                    className={`
                                        p-3 sm:p-4 rounded-xl border-2 text-center transition-all duration-300
                                        ${complexity === option.value 
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' 
                                            : 'border-secondary-200 dark:border-secondary-700 hover:border-primary-300 dark:hover:border-primary-600 text-secondary-700 dark:text-secondary-300'
                                        }
                                    `}
                                >
                                    <div className="text-xl sm:text-2xl mb-2">{option.icon}</div>
                                    <div className="text-xs sm:text-sm font-medium">{option.label}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Additional Technologies */}
                    <div>
                        <label className="block text-sm font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                            Additional Technologies <span className="text-secondary-500 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="e.g., React, Node.js, MongoDB..."
                                value={additionalTech}
                                onChange={(e) => setAdditionalTech(e.target.value)}
                                className="form-input w-full py-3 px-4"
                            />
                            {additionalTech && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <BsLightbulb className="text-primary-500 text-lg" />
                                </div>
                            )}
                        </div>
                        <p className="text-xs text-secondary-500 dark:text-secondary-400 mt-2">
                            Leave blank for AI to suggest the best technologies
                        </p>
                    </div>

                    {/* Generate Button */}
                    <button
                        onClick={generateIdeas}
                        className="w-full btn btn-gradient py-3 sm:py-4 text-base sm:text-lg font-semibold group flex items-center justify-center"
                    >
                        <FiZap className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Generate Project Ideas
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Technologies;
