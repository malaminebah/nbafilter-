import React from 'react';
import { useParams } from 'react-router-dom';
import { allTeams } from '../../data/NbaTeams';

interface Statistique {
  annee: string;
  points: number;
  rebonds: number;
  passes: number;
  interceptions: number;
}

interface Player {
  nom: string;
  points: number;
  rebonds: number;
  passes: number;
  interceptions: number;
  historique?: Statistique[];
}

const PlayerDetails: React.FC = () => {
  const { playerName } = useParams<{ playerName: string }>();

  // Recherche du joueur dans toutes les équipes
  let player: Player | null = null;
  let teamName = '';

  for (const team of allTeams) {
    const found = team.players.find(p => p.nom === decodeURIComponent(playerName || ''));
    if (found) {
      player = found;
      teamName = team.full_name;
      break;
    }
  }

  if (!player) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center bg-white shadow-xl rounded-xl p-10 max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-3xl font-bold text-red-600 mb-2">Joueur non trouvé</h1>
          <p className="text-gray-600 mt-2">Le joueur que vous recherchez n'existe pas dans notre base de données.</p>
        </div>
      </div>
    );
  }

  // Trier l'historique par saison (si disponible)
  const historiqueTriee = player.historique 
    ? [...player.historique].sort((a, b) => a.annee > b.annee ? -1 : 1)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8 transform transition-all hover:shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 h-32 flex items-center">
            <div className="px-8">
              <h1 className="text-4xl font-bold text-white">{player.nom}</h1>
              <p className="text-blue-100 mt-1">{teamName}</p>
            </div>
          </div>
          
          {/* Stats Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
            <div className="bg-blue-50 rounded-xl p-4 shadow-sm transform transition-all hover:scale-105">
              <p className="text-sm font-medium text-blue-500 uppercase">Points</p>
              <p className="text-3xl font-bold text-blue-900">{player.points}</p>
            </div>
            <div className="bg-red-50 rounded-xl p-4 shadow-sm transform transition-all hover:scale-105">
              <p className="text-sm font-medium text-red-500 uppercase">Rebonds</p>
              <p className="text-3xl font-bold text-red-900">{player.rebonds}</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 shadow-sm transform transition-all hover:scale-105">
              <p className="text-sm font-medium text-green-500 uppercase">Passes</p>
              <p className="text-3xl font-bold text-green-900">{player.passes}</p>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 shadow-sm transform transition-all hover:scale-105">
              <p className="text-sm font-medium text-purple-500 uppercase">Interceptions</p>
              <p className="text-3xl font-bold text-purple-900">{player.interceptions}</p>
            </div>
          </div>
        </div>
        
        {/* Historique des statistiques */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Statistiques par saison</h2>
          
          {historiqueTriee.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saison</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                        Points
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                        Rebonds
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                        Passes
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <span className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                        Interceptions
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200" data-testid="stats-table">
                  {historiqueTriee.map((saison, index) => (
                    <tr 
                      key={saison.annee} 
                      className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}
                      data-testid={`stats-row-${index}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{saison.annee}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-semibold">{saison.points}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-red-600 font-semibold">{saison.rebonds}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">{saison.passes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-purple-600 font-semibold">{saison.interceptions}</td>
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
        
        {/* Performance Graph Section - Mockup for visual enhancement */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Évolution des performances</h2>
          
          {historiqueTriee.length > 0 ? (
            <div className="h-48 w-full bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl flex items-end justify-around px-6 pt-4">
              {historiqueTriee.map((saison, index) => (
                <div key={`bar-${index}`} className="flex flex-col items-center space-y-2">
                  <div className="flex space-x-1">
                    <div 
                      className="w-10 bg-blue-500 rounded-t-lg" 
                      style={{ height: `${saison.points * 1.5}px` }}
                      title={`Points: ${saison.points}`}
                    ></div>
                    <div 
                      className="w-10 bg-red-500 rounded-t-lg" 
                      style={{ height: `${saison.rebonds * 4}px` }}
                      title={`Rebonds: ${saison.rebonds}`}
                    ></div>
                    <div 
                      className="w-10 bg-green-500 rounded-t-lg" 
                      style={{ height: `${saison.passes * 4}px` }}
                      title={`Passes: ${saison.passes}`}
                    ></div>
                    <div 
                      className="w-10 bg-purple-500 rounded-t-lg" 
                      style={{ height: `${saison.interceptions * 20}px` }}
                      title={`Interceptions: ${saison.interceptions}`}
                    ></div>
                  </div>
                  <div className="text-xs font-medium text-gray-600">{saison.annee.split('-')[0]}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <p className="text-gray-500">Données insuffisantes pour afficher l'évolution</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;