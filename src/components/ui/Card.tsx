import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

interface CardProps {
  id: number;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

const Card: React.FC<CardProps> = ({
  id,
  abbreviation,
  city,
  conference,
  division,
  full_name,
}) => {
  const { darkMode } = useTheme();
  
  const gradientClass = conference === "West" 
    ? "bg-gradient-to-br from-red-500 to-red-700" 
    : "bg-gradient-to-br from-blue-500 to-indigo-600";

  return (
    <Link 
      className={`p-8 max-w-lg border ${
        darkMode ? 'border-gray-700 bg-gray-800 hover:shadow-indigo-900' : 'border-grey-300 bg-white hover:shadow-indigo-50'
      } rounded-2xl hover:shadow-xl flex flex-col items-center justify-center transition-all duration-200`}
      to={`/team/${id}`}
    >
      <div className={`w-32 h-32 ${gradientClass} rounded-full flex items-center justify-center shadow-lg`}>
        <span className="text-4xl font-bold text-white">{abbreviation}</span>
      </div>
      <div className="mt-8 text-center">
        <h3 className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>{full_name}</h3>
        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {`${city} - ${abbreviation}`}
        </p>
        <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {`${division} - ${conference}`}
        </p>
      </div>
    </Link>
  );
};

export default Card;
