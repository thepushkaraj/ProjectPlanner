"use client";

import React, { useState, useEffect, useContext } from 'react';
import ProjectGrid from './ProjectGrid';

interface GeneratedProjectsProps {
    projectName: string;
    appType: string;
    isJS: boolean;
    complexity: string;
    additionalTech: string;
}

const GeneratedProjects = ({ projectName, appType, isJS, complexity, additionalTech }: GeneratedProjectsProps) => {
    const projectIdeasOptions = {
        projectName, appType, isJS, complexity, additionalTech
    };

    console.log(projectIdeasOptions);

    const [receivedIdeas, setReceivedIdeas] = useState([]);
    const [loading, setLoading] = useState(false); // Initialize loading as false
    const [fetchTriggered, setFetchTriggered] = useState(false); // Track if fetch has been triggered


    async function runFetch() {
        setLoading(true); // Set loading to true when fetch is initiated
        try {
            const response = await fetch('/api/generate-ideas', {
                method: "post",
                body: JSON.stringify(projectIdeasOptions),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const res = await response.json();
            setReceivedIdeas(res.message); // Assuming 'ideas' is the key for your array of projects
            setLoading(false); // Set loading to false when data is fetched
            
            console.log(res);
        } catch (error) {
            console.error('Error:', error);
            setLoading(false); // Set loading to false even in case of an error
        }
    }

    useEffect(() => {
        if (fetchTriggered) {
            runFetch();
        }
    }, [fetchTriggered]); // Run the effect when fetchTriggered changes

    return (
        <div className={`container-fluid mt-8 min-h-screen ${loading ? 'flex flex-col justify-center' : ''}`}>
            <h1 className="text-2xl font-semibold mb-4 ml-3">Generated Project ideas</h1>
            <ProjectGrid projects={receivedIdeas} />
        </div>
    );
};

export default GeneratedProjects;
