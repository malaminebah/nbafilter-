import React from 'react';
import { useTheme } from '../../context/ThemeContext';

interface ErrorMessageProps {
  message: string;
  title?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  title = "Error" 
}) => {
  const { darkMode } = useTheme();
  
  return (
    <div className="flex justify-center items-center h-64">
      <div
        className={`${
          darkMode ? "bg-red-900 border-red-700" : "bg-red-50 border-red-200"
        } border rounded-2xl p-6 max-w-md`}
      >
        <div className="flex items-center mb-3">
          <svg
            className="w-8 h-8 text-red-500 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3
            className={`text-lg font-medium ${
              darkMode ? "text-red-300" : "text-red-800"
            }`}
          >
            {title}
          </h3>
        </div>
        <p
          data-testid="error-message"
          className={darkMode ? "text-red-300" : "text-red-700"}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default ErrorMessage; 