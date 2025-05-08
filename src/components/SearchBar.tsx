import React from "react";
import { useTheme } from "../context/ThemeContext";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Rechercher...",
}) => {
  const { darkMode } = useTheme();

  return (
    <div className={`${darkMode ? "bg-gray-900" : "bg-grey-200"}`}>
      <div className="container flex justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none ${
              darkMode
                ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                : "bg-white text-gray-800 border-gray-300"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
