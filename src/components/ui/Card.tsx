import React from "react";
import { Link } from "react-router-dom";

interface Player {
  nom: string;
  points: number;
  rebonds: number;
  passes: number;
  interceptions: number;
}

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
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 w-64">
           <Link
             to={`/team/${id}`}
             className="block p-4 no-underline text-inherit"
              >
      <img className="w-32 h-32 object-contain mx-auto mb-4" src="https://iili.io/33etOiX.png" />
      <div className=" justify-center">
        <h3 className="text-[#0A2025] dark:text-white text-lg font-bold font-['Roboto']">
          {`${full_name} - ${abbreviation}`}
        </h3>
        <p className="mt-2 text-[#0A2025] dark:text-white text-sm font-normal font-['Roboto']">
          {`${city} - ${conference}`}
        </p>
        <p className="mt-1 mb-3 text-[#0A2025] dark:text-white text-sm font-normal font-['Roboto']">
          {`Division ${division}`}
        </p>
    
      </div>
      </Link>
    </div>
  );
};

export default Card;
