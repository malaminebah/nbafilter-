import React from 'react';
import { Statistics } from '../types/types';

interface SeasonStatsTableProps {
  statistics: Statistics[];
}

const SeasonStatsTable: React.FC<SeasonStatsTableProps> = ({ statistics }) => {
  // Tri des statistiques par année (décroissant)
  const sortedStats = [...statistics].sort((a, b) => a.year > b.year ? -1 : 1);
  
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Statistiques par saison</h2>
      
      {sortedStats.length > 0 ? (
        <div className="shadow-lg rounded-xl overflow-hidden border border-gray-100">
          <table className="min-w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Saison</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-blue-300 mr-2"></span>
                    Points
                  </span>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-red-300 mr-2"></span>
                    Rebonds
                  </span>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-green-300 mr-2"></span>
                    Passes
                  </span>
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  <span className="flex items-center">
                    <span className="w-3 h-3 rounded-full bg-purple-300 mr-2"></span>
                    Interceptions
                  </span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white" data-testid="stats-table">
              {sortedStats.map((season, index) => (
                <tr 
                  key={season.year} 
                  className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                  data-testid={`stats-row-${index}`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900 bg-blue-100 rounded-full px-3 py-1 text-center w-28">{season.year}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-blue-600 font-semibold bg-blue-50 rounded-lg px-3 py-1 text-center w-16">{season.points}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-red-600 font-semibold bg-red-50 rounded-lg px-3 py-1 text-center w-16">{season.rebounds}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-green-600 font-semibold bg-green-50 rounded-lg px-3 py-1 text-center w-16">{season.assists}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-purple-600 font-semibold bg-purple-50 rounded-lg px-3 py-1 text-center w-16">{season.steals}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center" data-testid="no-stats-message">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 font-medium">
            Aucun historique de statistiques disponible pour ce joueur
          </p>
        </div>
      )}
    </div>
  );
};

export default SeasonStatsTable; 