"use client";

import React from 'react';
import { useTheme } from '@/context/theme/ThemeContext';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme, isDark } = useTheme();

  const themes = [
    { value: 'light', icon: FiSun, label: 'Light' },
    { value: 'dark', icon: FiMoon, label: 'Dark' },
    { value: 'system', icon: FiMonitor, label: 'System' },
  ] as const;

  return (
    <div className="relative">
      <div className="flex items-center space-x-1 bg-secondary-100 dark:bg-secondary-800 p-1 rounded-xl border border-secondary-200 dark:border-secondary-700">
        {themes.map(({ value, icon: Icon, label }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            className={`
              relative flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300
              ${theme === value 
                ? 'bg-white dark:bg-secondary-700 shadow-soft text-primary-600 dark:text-primary-400' 
                : 'text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200 hover:bg-white/50 dark:hover:bg-secondary-700/50'
              }
            `}
            title={label}
          >
            <Icon size={16} className="transition-transform duration-300 hover:scale-110" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeToggle;
