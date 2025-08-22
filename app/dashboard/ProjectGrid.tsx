// components/ProjectGrid.tsx
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { FiCode, FiExternalLink, FiStar, FiFolder, FiZap } from 'react-icons/fi';
import { motion } from 'framer-motion';
import '@/app/create-new/createNew.css'

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
    const icons = [FiCode, FiZap, FiFolder, FiStar];
    return icons[index % icons.length];
};

const getRandomGradient = (index: number) => {
    const gradients = [
        'from-blue-500 to-cyan-500',
        'from-purple-500 to-pink-500',
        'from-green-500 to-emerald-500',
        'from-orange-500 to-red-500',
        'from-indigo-500 to-purple-500',
        'from-teal-500 to-blue-500'
    ];
    return gradients[index % gradients.length];
};

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
    if (!projects || projects.length === 0) {
        return (
            <motion.div 
                className="flex flex-col items-center justify-center py-16"
                initial="initial"
                animate="animate"
                variants={fadeInUp}
            >
                <FiFolder size={64} className="text-gray-400 dark:text-gray-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                    No projects available
                </h3>
                <p className="text-gray-500 dark:text-gray-500 text-center max-w-md">
                    It looks like there are no project ideas in this category yet. Try generating some new projects!
                </p>
            </motion.div>
        );
    }
    
    return (
        <motion.div 
            className="py-6"
            initial="initial"
            animate="animate"
            variants={staggerContainer}
        >
            <motion.div 
                className="mb-8"
                variants={fadeInUp}
            >
                <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                    Project Ideas ✨
                </h2>
                <p className="text-secondary-600 dark:text-secondary-400">
                    {projects.length} project idea{projects.length !== 1 ? 's' : ''} ready to build
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project, index) => {
                    const IconComponent = getRandomIcon(index);
                    const gradientClass = getRandomGradient(index);
                    
                    return (
                        <motion.div
                            key={index}
                            variants={fadeInUp}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 cursor-pointer"
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            
                            <div className="relative p-6">
                                {/* Icon */}
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                    <IconComponent className="text-white" size={24} />
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-3 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                                    {project.name}
                                </h3>
                                
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 line-clamp-3">
                                    {project.description}
                                </p>

                                {/* Action indicator */}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        Click to explore
                                    </span>
                                    <FiExternalLink 
                                        size={16} 
                                        className="text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" 
                                    />
                                </div>
                            </div>

                            {/* Subtle border glow on hover */}
                            <div className="absolute inset-0 rounded-xl ring-1 ring-primary-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </motion.div>
                    );
                })}
            </div>

        </motion.div>
    );
};

export default ProjectGrid;
