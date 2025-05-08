import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface NotFoundProps {
  title: string;
  message: string;
}

const NotFound: React.FC<NotFoundProps> = ({ title, message }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className={`text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl rounded-xl p-10 max-w-md`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h1 className="text-3xl font-bold text-red-600 mb-2">{title}</h1>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-2`}>{message}</p>
      </div>
    </div>
  );
};

export default NotFound; 