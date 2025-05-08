import React from 'react';
import { Link } from 'react-router-dom';
import { Player } from '../types/types';

interface TeamRosterProps {
  players: Player[];
}

const TeamRoster: React.FC<TeamRosterProps> = ({ players }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Effectif de l'équipe</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player, index) => (
          <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transform transition-all hover:shadow-lg hover:scale-105">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 border-b">
              <Link
                to={`/player/${encodeURIComponent(player.name)}`}
                className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                {player.name}
              </Link>
            </div>
            
            <div className="p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-3 text-center">
                  <p className="text-xs font-medium text-blue-500 uppercase">Points</p>
                  <p className="text-xl font-bold text-blue-800">{player.points}</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3 text-center">
                  <p className="text-xs font-medium text-red-500 uppercase">Rebonds</p>
                  <p className="text-xl font-bold text-red-800">{player.rebounds}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 text-center">
                  <p className="text-xs font-medium text-green-500 uppercase">Passes</p>
                  <p className="text-xl font-bold text-green-800">{player.assists}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 text-center">
                  <p className="text-xs font-medium text-purple-500 uppercase">Interceptions</p>
                  <p className="text-xl font-bold text-purple-800">{player.steals}</p>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Link
                  to={`/player/${encodeURIComponent(player.name)}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                >
                  Voir les détails
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {players.length === 0 && (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 font-medium">
            Aucun joueur disponible pour cette équipe
          </p>
        </div>
      )}
    </div>
  );
};

export default TeamRoster; 