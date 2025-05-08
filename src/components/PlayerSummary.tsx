import React from 'react';
import { Player } from '../types/types';

interface PlayerSummaryProps {
  player: Player;
  teamName: string;
}

const PlayerSummary: React.FC<PlayerSummaryProps> = ({ player, teamName }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transform transition-all hover:shadow-2xl">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-32 flex items-center">
        <div className="px-8">
          <h1 className="text-4xl font-bold text-white">{player.name}</h1>
          <p className="text-blue-100 mt-1">{teamName}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        <div className="bg-blue-50 rounded-xl p-4 shadow-sm transform transition-all hover:scale-105">
          <p className="text-sm font-medium text-blue-500 uppercase">Points</p>
          <p className="text-3xl font-bold text-blue-900">{player.points}</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 shadow-sm transform transition-all hover:scale-105">
          <p className="text-sm font-medium text-red-500 uppercase">Rebonds</p>
          <p className="text-3xl font-bold text-red-900">{player.rebounds}</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 shadow-sm transform transition-all hover:scale-105">
          <p className="text-sm font-medium text-green-500 uppercase">Passes</p>
          <p className="text-3xl font-bold text-green-900">{player.assists}</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 shadow-sm transform transition-all hover:scale-105">
          <p className="text-sm font-medium text-purple-500 uppercase">Interceptions</p>
          <p className="text-3xl font-bold text-purple-900">{player.steals}</p>
        </div>
      </div>
    </div>
  );
};

export default PlayerSummary; 