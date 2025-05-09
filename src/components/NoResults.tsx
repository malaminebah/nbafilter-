import React from "react";
import { useTheme } from "../context/ThemeContext";

interface NoResultsProps {
  message: string;
  searchTerm?: string;
  onClearSearch?: () => void;
  showClearButton?: boolean;
}

const NoResults: React.FC<NoResultsProps> = ({
  message,
  searchTerm,
  onClearSearch,
  showClearButton = false,
}) => {
  const { darkMode } = useTheme();

  return (
    <div className="mt-12 text-center">
      <div
        className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
          darkMode ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-400"
        } mb-4`}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <p
        data-testid="no-results-message"
        className={`text-lg ${darkMode ? "text-gray-300" : "text-gray-500"}`}
      >
        {searchTerm ? `${message} "${searchTerm}"` : message}
      </p>
      {showClearButton && onClearSearch && (
        <button
          onClick={onClearSearch}
          className="mt-4 px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-colors duration-200 ease-in-out shadow-md border-2 border-red-600 cursor-pointer"
        >
          Clear search
        </button>
      )}
    </div>
  );
};

export default NoResults;
