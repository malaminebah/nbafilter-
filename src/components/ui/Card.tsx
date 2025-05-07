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
 
    <Link className="p-8 max-w-lg border border-grey-300 rounded-2xl hover:shadow-xl hover:shadow-indigo-50 flex flex-col items-center justify-center"
    to={`/team/${id}`}>
    <img src="https://loremflickr.com/800/600/girl" className="shadow rounded-lg overflow-hidden border" /> 
    <div className="mt-8 text-center">
        <h3 className="font-bold text-xl">{full_name}</h3>
        <p className="mt-2 text-gray-600">
        {`${city} - ${abbreviation}`}
        </p>
        <p className="mt-2 text-gray-600">
        {`${division} - ${conference}`}
        </p>
    </div>
    </Link>
  );
};

export default Card;
