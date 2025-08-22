// components/ProjectGrid.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiExternalLink, FiStar, FiFolder, FiZap, FiBookmark, FiHeart } from 'react-icons/fi';

interface Project {
    name: string;
    description: string;
}

interface ProjectGridProps {
    projects: Project[];
}

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.1
        }
    }
};

const getRandomIcon = (index: number) => {
    const icons = [FiCode, FiZap, FiFolder, FiStar, FiBookmark, FiHeart];
    return icons[index % icons.length];
};

const getRandomGradient = (index: number) => {
    const gradients = [
        'from-blue-500 to-cyan-500',
        'from-purple-500 to-pink-500',
        'from-green-500 to-emerald-500',
        'from-orange-500 to-red-500',
        'from-indigo-500 to-purple-500',
        'from-teal-500 to-blue-500',
        'from-rose-500 to-pink-500',
        'from-amber-500 to-orange-500'
    ];
    return gradients[index % gradients.length];
};

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
    if (!projects || projects.length === 0) {
        return (
            <motion.div 
                className="flex flex-col items-center justify-center py-12 sm:py-16 px-4"
                initial="initial"
                animate="animate"
                variants={fadeInUp}
            >
                <FiFolder size={48} className="sm:w-16 sm:h-16 text-gray-400 dark:text-gray-500 mb-3 sm:mb-4" />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2 text-center">
                    No projects generated yet
                </h3>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-500 text-center max-w-md">
                    Complete the setup form to generate personalized project ideas tailored to your preferences.
                </p>
            </motion.div>
        );
    }
    
    return (
        <motion.div 
            className="py-4 sm:py-6"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
        >
            <motion.div 
                className="mb-6 sm:mb-8 px-4"
                variants={fadeInUp}
            >
                <h2 className="text-2xl sm:text-3xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                    Your Personalized Projects ✨
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400 text-sm sm:text-base">
                    {projects.length} project idea{projects.length !== 1 ? 's' : ''} crafted specifically for you
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 px-4">
                {projects.map((project, index) => {
                    const IconComponent = getRandomIcon(index);
                    const gradientClass = getRandomGradient(index);
                    
                    return (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 cursor-pointer min-h-[280px] sm:min-h-[320px] flex flex-col"
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            {/* Content */}
                            <div className="relative p-5 sm:p-6 flex flex-col h-full">
                                {/* Icon */}
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-r ${gradientClass} flex items-center justify-center mb-4 sm:mb-5 group-hover:scale-105 transition-transform duration-300 shadow-md flex-shrink-0`}>
                                    <IconComponent className="text-white" size={18} />
                                </div>

                                {/* Project Details */}
                                <div className="flex-grow">
                                    <h3 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors line-clamp-2 leading-tight">
                                        {project.name}
                                    </h3>
                                    
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-5 line-clamp-4">
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            {/* Subtle border glow on hover */}
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-primary-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default ProjectGrid;
