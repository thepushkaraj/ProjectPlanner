"use client";

import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState, useContext } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { FiMenu, FiX, FiZap, FiUser, FiSettings, FiLogOut } from 'react-icons/fi'
import SigninButton from './SigninButton'
import ThemeToggle from './ThemeToggle'
import TokenContext from '@/context/tokens/tokenContext'

const Header: NextPage = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [imageError, setImageError] = useState(false)
    const { data: session, status } = useSession()
    const tokens = useContext(TokenContext)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Reset image error when session changes
    useEffect(() => {
        setImageError(false)
    }, [session?.user?.image])

    const navigation = [
        { name: 'Features', href: '#features' },
        { name: 'How it Works', href: '#how-it-works' },
        { name: 'FAQ', href: '#faq' },
        ...(session ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
    ]

    return (
        <>
            <header 
                className={`
                    fixed top-0 left-0 right-0 z-50 transition-all duration-300
                    ${isScrolled 
                        ? 'bg-white/80 dark:bg-secondary-900/80 backdrop-blur-md shadow-soft border-b border-secondary-200/50 dark:border-secondary-700/50' 
                        : 'bg-transparent'
                    }
                `}
            >
                <nav className="container-fluid">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="group flex items-center space-x-2">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                                        <FiZap className="text-white w-5 h-5" />
                                    </div>
                                    <div className="absolute -inset-1 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                                </div>
                                <span className="text-xl lg:text-2xl font-bold text-gradient-primary">
                                    ProjectPlanner
                                </span>
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 font-medium transition-colors duration-300 relative group"
                                >
                                    {item.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-full"></span>
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <ThemeToggle />
                            <SigninButton />
                        </div>

                        {/* Mobile menu button */}
                        <div className="lg:hidden flex items-center">
                            {status === 'loading' ? (
                                // Loading state
                                <div className="w-8 h-8 bg-secondary-200 dark:bg-secondary-700 rounded-full animate-pulse"></div>
                            ) : session ? (
                                // Show profile image when logged in
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="flex items-center p-1.5 rounded-lg bg-secondary-100 dark:bg-secondary-800 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-all duration-300"
                                >
                                    {session.user?.image && !imageError ? (
                                        <Image
                                            src={session.user.image}
                                            alt="Profile"
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 rounded-full object-cover"
                                            onError={() => setImageError(true)}
                                        />
                                    ) : (
                                        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                                            <FiUser className="text-white" size={16} />
                                        </div>
                                    )}
                                </button>
                            ) : (
                                // Show hamburger menu when logged out
                                <button
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="p-2 rounded-lg text-secondary-600 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 hover:bg-secondary-100 dark:hover:bg-secondary-800 transition-all duration-300"
                                >
                                    {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                                </button>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Navigation Menu */}
            <div 
                className={`
                    fixed inset-0 z-40 lg:hidden transition-all duration-200
                    ${isMobileMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}
                `}
            >
                {/* Backdrop */}
                <div 
                    className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
                
                {/* Menu Panel */}
                <div 
                    className={`
                        absolute top-14 right-4 w-56 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-xl rounded-xl shadow-hard border border-secondary-200/50 dark:border-secondary-700/50
                        transform transition-all duration-200 origin-top-right
                        ${isMobileMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
                    `}
                >
                    {session ? (
                        /* Logged in menu */
                        <div className="py-1">
                            {/* User Info */}
                            <div className="px-4 py-3 border-b border-secondary-200 dark:border-secondary-700">
                                <div className="flex items-center space-x-3">
                                    {session.user?.image ? (
                                        <Image
                                            src={session.user.image}
                                            alt="Profile"
                                            width={40}
                                            height={40}
                                            className="w-10 h-10 rounded-full"
                                        />
                                    ) : (
                                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                                            <FiUser className="text-white" size={18} />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
                                            {session.user?.name || 'User'}
                                        </div>
                                        <div className="text-xs text-secondary-600 dark:text-secondary-400 truncate">
                                            {session.user?.email}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Dashboard Link */}
                            <Link
                                href="/dashboard"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center space-x-3 px-4 py-3 text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-all duration-200"
                            >
                                <FiSettings size={16} />
                                <span className="text-sm font-medium">Dashboard</span>
                            </Link>

                            {/* Token Management */}
                            <Link
                                href="/dashboard"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center justify-between w-full px-4 py-3 text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800/50 transition-all duration-200"
                            >
                                <div className="flex items-center space-x-3">
                                    <FiZap size={16} />
                                    <span className="text-sm font-medium">Token Management</span>
                                </div>
                                <div className="flex items-center space-x-1.5 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg text-xs font-medium">
                                    <FiZap size={12} />
                                    <span>{tokens.tokenCount}</span>
                                </div>
                            </Link>

                            {/* Theme Toggle */}
                            <div className="px-4 py-3 border-t border-secondary-200 dark:border-secondary-700">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Theme</span>
                                    <ThemeToggle />
                                </div>
                            </div>

                            {/* Sign Out */}
                            <button
                                onClick={() => {
                                    signOut();
                                    setIsMobileMenuOpen(false);
                                }}
                                className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 rounded-b-xl"
                            >
                                <FiLogOut size={16} />
                                <span className="text-sm font-medium">Sign Out</span>
                            </button>
                        </div>
                    ) : (
                        /* Logged out menu */
                        <div className="py-1">
                            {/* Navigation Links */}
                            {navigation.map((item, index) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`
                                        block px-4 py-2.5 text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 
                                        hover:bg-secondary-50 dark:hover:bg-secondary-800/50 font-medium transition-all duration-200 text-sm
                                        ${index === 0 ? 'rounded-t-xl' : ''}
                                    `}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            
                            {/* Theme Toggle */}
                            <div className="px-4 py-3 border-t border-secondary-200 dark:border-secondary-700">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-secondary-700 dark:text-secondary-300">Theme</span>
                                    <ThemeToggle />
                                </div>
                            </div>
                            
                            {/* Mobile Sign In */}
                            <div className="px-4 py-2.5 border-t border-secondary-200 dark:border-secondary-700 rounded-b-xl">
                                <SigninButton />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Spacer for fixed header */}
            <div className="h-16 lg:h-20" />
        </>
    )
}

export default Header
