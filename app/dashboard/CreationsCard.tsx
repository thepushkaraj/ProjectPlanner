"use client";

import { Key, useEffect, useRef, useState } from 'react';
import User from '@/database/users'; // Import your Mongoose User model here
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { BsPlusCircle } from 'react-icons/bs';
import { FiFolder, FiArrowRight, FiCode } from 'react-icons/fi';
import '@/app/create-new/createNew.css'
import ProjectGrid from './ProjectGrid';
import TokenContext from '@/context/tokens/tokenContext';
import { IoChevronBackOutline } from 'react-icons/io5';
import { redirect } from 'next/navigation';
import ReactLoading from 'react-loading';

interface Creation {
    _id: Key | null | undefined;
    creations: any;
    name: string;
    projectsIdeas: any;
    // Add other properties if needed
}

const UserCard: React.FC = () => {
    const [creations, setCreations] = useState<Array<Creation>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [projectsIdeasArray, setProjectsIdeasArray] = useState([]);
    const [isTechnologiesVisible, setIsTechnologiesVisible] = useState(false);
    const technologiesSectionRef = useRef<HTMLInputElement>(null);
    const GeneratedProjectsRef = useRef<HTMLInputElement>(null);
    const { data: session, status } = useSession()

    if (status === 'unauthenticated') {
        redirect('/')
    }

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch('/api/creations', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Below is the whole response")
            console.log(response)

            const res = await response.json();
            console.log("Below is the json")
            console.log(res)

            setCreations(res.creations)
            setIsLoading(false)
        };

        fetchUsers();
    }, []);

    const generateIdeas = (projectsIdeas: any) => {
        const technologiesSection = technologiesSectionRef.current;

        technologiesSection?.classList.add('hidden');
        setIsTechnologiesVisible(true);
        setProjectsIdeasArray(projectsIdeas);
    };

    const goBack = () => {
        const technologiesSection = technologiesSectionRef.current;
        const projectsSection = GeneratedProjectsRef.current;

        if (technologiesSection && projectsSection) {
            technologiesSection.classList.add('slide-in-back');
            projectsSection.classList.remove('hidden');
            technologiesSection?.classList.remove('hidden');
            setIsTechnologiesVisible(false);
        }
    };

    return (
        <>
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your projects...</p>
                </div>
            ) : (
                <>
                    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full transform duration-500 ${isTechnologiesVisible ? 'slide-out hidden' : ''}`} ref={technologiesSectionRef}>
                        <Link href="/create-new" className="group relative overflow-hidden rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 transition-all duration-300 bg-gray-50 dark:bg-gray-800/50 hover:bg-primary-50 dark:hover:bg-primary-900/20 min-h-[200px]">
                            <div className="flex flex-col items-center justify-center p-8 h-full">
                                <div className="rounded-full bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-400 dark:to-gray-500 text-white p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <BsPlusCircle size={28} />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                                    Create New Project
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
                                    Generate fresh project ideas
                                </p>
                            </div>
                        </Link>
                        {creations && creations.length > 0 ? (
                            creations.map((creation, index) => (
                                <div
                                    key={creation.name}
                                    className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 cursor-pointer min-h-[200px]"
                                    onClick={() => generateIdeas(creation.projectsIdeas)}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="relative flex flex-col items-center justify-center p-8 h-full">
                                        <div className="rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white p-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <FiCode size={28} />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2 text-center group-hover:text-primary-700 dark:group-hover:text-primary-400 transition-colors">
                                            {creation.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
                                            Click to explore projects
                                        </p>
                                        <div className="flex items-center text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <span className="text-sm font-medium mr-2">View Projects</span>
                                            <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
                                <FiFolder size={48} className="text-gray-400 dark:text-gray-500 mb-4" />
                                <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                    No projects yet
                                </h3>
                                <p className="text-gray-500 dark:text-gray-500">
                                    Create your first project to get started
                                </p>
                            </div>
                        )}

                    </div>
                    {isTechnologiesVisible && (
                        <div className="container min-h-screen" id='technologies-section' ref={GeneratedProjectsRef}>
                            <div className="flex flex-col slide-out" onAnimationEnd={goBack}>
                                <button className="inline-flex items-center py-2 mb-6 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 group" onClick={goBack}>
                                    <IoChevronBackOutline size={20} className='mr-2 group-hover:-translate-x-1 transition-transform duration-300' />
                                    <span className='font-medium'>Back to Projects</span>
                                </button>
                                <ProjectGrid projects={projectsIdeasArray} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default UserCard;
