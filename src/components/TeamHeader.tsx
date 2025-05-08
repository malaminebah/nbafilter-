import React from 'react';
import { Team } from '../types/types';

interface TeamHeaderProps {
  team: Team;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ team }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transform transition-all hover:shadow-2xl">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-36 flex items-center">
        <div className="px-8">
          <h1 className="text-4xl font-bold text-white">{team.full_name}</h1>
          <div className="flex space-x-3 mt-2">
            <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">{team.city}</span>
            <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Conference: {team.conference}</span>
            <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Division: {team.division}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamHeader; 