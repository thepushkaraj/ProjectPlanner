"use client";

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { 
  FiPlus, 
  FiArrowRight
} from 'react-icons/fi';
import CreationsCard from './CreationsCard';
import TokenContext from '@/context/tokens/tokenContext';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Dashboard: React.FC = () => {
  const { data: session } = useSession();
  const tokens = useContext(TokenContext);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container-fluid">
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
                  {getGreeting()}, {session?.user?.name?.split(' ')[0] || 'Developer'}! 👋
                </h1>
                <p className="text-xl text-secondary-600 dark:text-secondary-400">
                  Ready to build something amazing today?
                </p>
              </div>
              
              <div className="mt-6 lg:mt-0">
                <Link href="/create-new">
                  <button className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 shadow-sm hover:shadow-md group font-medium">
                    <FiPlus className="mr-2 transition-transform group-hover:rotate-90" />
                    Generate New Project
                    <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <motion.div 
            variants={fadeInUp}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100 mb-2">
              Your Creations ✨
            </h2>
            <p className="text-secondary-600 dark:text-secondary-400">
              Browse through your generated project ideas and continue building.
            </p>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <CreationsCard />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
