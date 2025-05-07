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
    <div>
           <Link
             to={`/team/${id}`}
              >
      <img className="mb-7 rounded-xl" src="https://iili.io/33etOiX.png" />
      <div>
        <h3 className="text-[#0A2025] dark:text-white text-2xl font-bold font-['Roboto']">
        
        {`${full_name} - ${abbreviation}`}
      
        </h3>
        <p className="mt-5 mb-8 text-[#0A2025] dark:text-white text-sm font-normal font-['Roboto']">
          {`${city} - ${conference}`}
        </p>
        <p className="mt-5 mb-8 text-[#0A2025] dark:text-white text-sm font-normal font-['Roboto']">
          {`Division ${division}`}
        </p>
          
              <h2 className="text-3xl font-bold">Voir les joueurs</h2>
         
      </div>
      </Link>
    </div>
  );
};

export default Card;
