"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FiArrowRight, FiZap, FiPlay } from "react-icons/fi";

const GetStarted = () => {
    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <div className="btn btn-primary opacity-50 cursor-not-allowed">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Loading...
            </div>
        )
    }

    if (status === 'authenticated') {
        return (
            <Link href="/dashboard">
                <button className="btn btn-gradient group relative overflow-hidden">
                    <div className="flex items-center space-x-2 relative z-10">
                        <FiPlay className="transition-transform group-hover:scale-110" />
                        <span>Go to Dashboard</span>
                        <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
            </Link>
        )
    }

    return (
        <button 
            className="btn btn-gradient group relative overflow-hidden"
            onClick={() => signIn('google', {
                callbackUrl: `https://projectplanner.vercel.app/api/user-signin`
            })}
        >
            <div className="flex items-center space-x-2 relative z-10">
                <FiZap className="transition-transform group-hover:scale-110" />
                <span>Get Started Free</span>
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
    )
}

export default GetStarted