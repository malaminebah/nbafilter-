import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { allTeams } from '../../data/NbaTeams';

const TeamDetails: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();


  const team = allTeams.find(t => t.id === Number(teamId));

  if (!team) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center bg-white shadow-xl rounded-xl p-10 max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h1 className="text-3xl font-bold text-red-600 mb-2">Équipe non trouvée</h1>
          <p className="text-gray-600 mt-2">L'équipe que vous recherchez n'existe pas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
       
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
        
       
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Effectif de l'équipe</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.players.map((player, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden transform transition-all hover:shadow-lg hover:scale-105">
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 border-b">
                  <Link
                    to={`/player/${encodeURIComponent(player.nom)}`}
                    className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {player.nom}
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
                      <p className="text-xl font-bold text-red-800">{player.rebonds}</p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3 text-center">
                      <p className="text-xs font-medium text-green-500 uppercase">Passes</p>
                      <p className="text-xl font-bold text-green-800">{player.passes}</p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-3 text-center">
                      <p className="text-xs font-medium text-purple-500 uppercase">Interceptions</p>
                      <p className="text-xl font-bold text-purple-800">{player.interceptions}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center">
                    <Link
                      to={`/player/${encodeURIComponent(player.nom)}`}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      Voir les détails
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {team.players.length === 0 && (
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
      </div>
    </div>
  );
};

export default TeamDetails;