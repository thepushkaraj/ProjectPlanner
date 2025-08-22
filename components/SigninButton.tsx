"use client";

import React, { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useContext } from 'react';
import TokenContext from "@/context/tokens/tokenContext";
import Image from "next/image";
import Modal from "./Modal";
import Dropdown from "./Dropdown";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactLoading from "react-loading";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiUser, FiSettings, FiLogOut, FiZap, FiCreditCard } from "react-icons/fi";

const SigninButton = () => {
    const tokens = useContext(TokenContext)
    const { data: session, status } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tokenCoupon, setTokenCoupon] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const pathname = usePathname()

    function keyDown(e: any) {
        let key = e.keyCode;
        //space pressed
        if (key == 32) { //space
            e.preventDefault();
        }
    }

    const openModal = () => {
        setIsModalOpen(true);
        setIsDropdownOpen(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const applyCoupon = async () => {
        if (tokenCoupon.length === 0) {
            return toast.error("Please enter a coupon code")
        }
        setIsLoading(true)
        const response = await fetch('/api/apply-coupon', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                tokenCoupon
            })
        });

        const res = await response.json();

        if (res.error) {
            setIsLoading(false)
            return toast.error(res.error)
        }

        toast.success(res.success)
        tokens.updateTokenCountWithCoupon(res.tokenCount)
        setIsLoading(false)
        closeModal()
    };

    if (status === 'loading') {
        return (
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-secondary-200 dark:bg-secondary-700 rounded-full animate-pulse"></div>
                <div className="w-20 h-8 bg-secondary-200 dark:bg-secondary-700 rounded-lg animate-pulse"></div>
            </div>
        )
    }

    if (status === 'authenticated') {
        return (
            <div className="flex items-center space-x-2">
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

                {/* Token Counter - Compact on mobile */}
                <button 
                    className="flex items-center space-x-1.5 px-2.5 py-1.5 lg:px-3 lg:py-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-lg lg:rounded-xl font-medium shadow-soft hover:shadow-medium transition-all duration-300 hover:scale-105"
                    onClick={openModal}
                    title="Manage Tokens"
                >
                    <FiZap size={14} className="lg:hidden" />
                    <FiZap size={16} className="hidden lg:block" />
                    <span className="text-sm lg:text-base">{tokens.tokenCount}</span>
                </button>

                {/* User Menu - Compact on mobile */}
                <div className="relative">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-1.5 p-1.5 lg:p-2 rounded-lg lg:rounded-xl bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-all duration-300"
                    >
                        {session.user?.image ? (
                            <Image
                                src={session.user.image}
                                alt="Profile"
                                width={28}
                                height={28}
                                className="rounded-full lg:w-8 lg:h-8"
                            />
                        ) : (
                            <div className="w-7 h-7 lg:w-8 lg:h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                                <FiUser className="text-white" size={14} />
                            </div>
                        )}
                    </button>

                    {/* Dropdown Menu - Optimized positioning for mobile */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 lg:w-56 bg-white dark:bg-secondary-800 rounded-xl lg:rounded-2xl shadow-hard border border-secondary-200 dark:border-secondary-700 z-50">
                            <div className="p-3 lg:p-4 border-b border-secondary-200 dark:border-secondary-700">
                                <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
                                    {session.user?.name || 'User'}
                                </div>
                                <div className="text-xs text-secondary-600 dark:text-secondary-400 truncate">
                                    {session.user?.email}
                                </div>
                            </div>

                            <div className="py-1 lg:py-2">
                                <Link href="/dashboard">
                                    <button 
                                        className="flex items-center space-x-2.5 lg:space-x-3 w-full px-3 lg:px-4 py-2.5 lg:py-3 text-left text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors duration-200"
                                        onClick={() => setIsDropdownOpen(false)}
                                    >
                                        <FiSettings size={14} className="lg:hidden" />
                                        <FiSettings size={16} className="hidden lg:block" />
                                        <span className="text-sm lg:text-base">Dashboard</span>
                                    </button>
                                </Link>
                                
                                <button 
                                    className="flex items-center space-x-2.5 lg:space-x-3 w-full px-3 lg:px-4 py-2.5 lg:py-3 text-left text-secondary-700 dark:text-secondary-300 hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors duration-200"
                                    onClick={openModal}
                                >
                                    <FiCreditCard size={14} className="lg:hidden" />
                                    <FiCreditCard size={16} className="hidden lg:block" />
                                    <span className="text-sm lg:text-base">Manage Tokens</span>
                                </button>
                                
                                <button 
                                    className="flex items-center space-x-2.5 lg:space-x-3 w-full px-3 lg:px-4 py-2.5 lg:py-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200"
                                    onClick={() => {
                                        signOut();
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    <FiLogOut size={14} className="lg:hidden" />
                                    <FiLogOut size={16} className="hidden lg:block" />
                                    <span className="text-sm lg:text-base">Sign Out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Enhanced Modal */}
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <div className="p-6">
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center">
                                <FiZap className="text-white text-xl" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-secondary-900 dark:text-secondary-100">
                                    Token Management
                                </h1>
                                <p className="text-secondary-600 dark:text-secondary-400">
                                    Current balance: <span className="font-semibold text-primary-600 dark:text-primary-400">{tokens.tokenCount} tokens</span>
                                </p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                                    Coupon Code
                                </label>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Enter your coupon code..."
                                        className="form-input"
                                        value={tokenCoupon}
                                        onChange={(event) => setTokenCoupon(event.target.value)}
                                        onKeyDown={(event) => {
                                            keyDown(event);
                                            if (event.key === 'Enter') applyCoupon();
                                        }}
                                    />
                                    <button 
                                        className="btn btn-primary w-full" 
                                        onClick={applyCoupon} 
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <div className="flex items-center justify-center space-x-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                <span>Applying...</span>
                                            </div>
                                        ) : (
                                            'Apply Coupon'
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4">
                                <h3 className="font-semibold text-primary-700 dark:text-primary-300 mb-2">
                                    💡 Pro Tip
                                </h3>
                                <p className="text-sm text-primary-600 dark:text-primary-400 mb-3">
                                    Use coupon code <code className="bg-primary-100 dark:bg-primary-800 px-2 py-1 rounded font-mono">welcomeBonus</code> to get 5 additional tokens!
                                </p>
                            </div>

                            <div className="border-t border-secondary-200 dark:border-secondary-700 pt-6">
                                <h3 className="font-semibold text-secondary-900 dark:text-secondary-100 mb-3">
                                    Need more tokens?
                                </h3>
                                <div className="space-y-2 text-sm text-secondary-600 dark:text-secondary-400">
                                    <p>Contact us for additional tokens:</p>
                                    <div className="flex flex-col space-y-1">
                                        <a 
                                            href="https://x.com/thepushkaraj" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                                        >
                                            📱 Follow us on X (Twitter)
                                        </a>
                                        <a 
                                            href="mailto:contactpushkaraj@gmail.com"
                                            className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                                        >
                                            ✉️ Email: contactpushkaraj@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>

                {/* Click outside to close dropdown */}
                {isDropdownOpen && (
                    <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsDropdownOpen(false)}
                    />
                )}
            </div>
        );
    }

    return (
        <button
            onClick={() => signIn('google', {
                callbackUrl: `https://projectplanner.vercel.app/api/user-signin`
            })}
            className="btn btn-primary text-sm lg:text-base px-4 lg:px-6 py-2 lg:py-3"
        >
            Sign In
        </button>
    );
};

export default SigninButton;
