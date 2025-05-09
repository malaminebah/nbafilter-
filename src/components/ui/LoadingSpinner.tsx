import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface LoadingSpinnerProps {
  fullHeight?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ fullHeight = true }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`flex justify-center items-center ${fullHeight ? 'h-64' : ''}`}>
      <div className="animate-pulse flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          } mb-3`}
        ></div>
        <div
          className={`${
            darkMode ? 'text-gray-300' : 'text-gray-500'
          } text-lg font-medium`}
        >
          Loading...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 