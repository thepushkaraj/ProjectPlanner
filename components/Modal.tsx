"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    title?: string;
}

const Modal: React.FC<ModalProps> = ({ 
    isOpen, 
    onClose, 
    children, 
    size = 'md',
    title 
}) => {
    const modalRef = useRef<HTMLDivElement>(null);

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ 
                            type: "spring", 
                            duration: 0.5,
                            bounce: 0.3
                        }}
                        className={`
                            relative w-full ${sizeClasses[size]} mx-auto
                            bg-white dark:bg-secondary-800 
                            rounded-2xl shadow-hard 
                            border border-secondary-200 dark:border-secondary-700
                            max-h-[90vh] overflow-hidden
                        `}
                    >
                        {/* Header */}
                        {title && (
                            <div className="flex items-center justify-between p-6 border-b border-secondary-200 dark:border-secondary-700">
                                <h2 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100">
                                    {title}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-xl text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-all duration-200"
                                >
                                    <FiX size={20} />
                                </button>
                            </div>
                        )}

                        {/* Close button (when no title) */}
                        {!title && (
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-10 p-2 rounded-xl text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200 hover:bg-secondary-100 dark:hover:bg-secondary-700 transition-all duration-200"
                            >
                                <FiX size={20} />
                            </button>
                        )}

                        {/* Content */}
                        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
