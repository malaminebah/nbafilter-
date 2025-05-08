import React from 'react';
import { useParams } from 'react-router-dom';
import { allTeams } from '../../data/NbaTeams';
import PerformanceEvolution from '../components/PerformanceEvolution';
import SeasonStatsTable from '../components/SeasonStatsTable';
import PlayerSummary from '../components/PlayerSummary';
import PlayerNotFound from '../components/PlayerNotFound';
import { useTheme } from '../context/ThemeContext';

const PlayerDetails: React.FC = () => {
  const { playerName } = useParams<{ playerName: string }>();
  const { darkMode } = useTheme();
  
  const decodedPlayerName = decodeURIComponent(playerName || '');
  
  const teamWithPlayer = allTeams.find(team => 
    team.players.some(player => player.name === decodedPlayerName)
  );
  
  const player = teamWithPlayer?.players.find(p => p.name === decodedPlayerName);

  if (!player) {
    return <PlayerNotFound />;
  }

  return (
    <div className={`min-h-screen ${
      darkMode 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800' 
        : 'bg-gradient-to-b from-gray-100 to-gray-200'
    } py-12 px-4 sm:px-6 lg:px-8`}>
      <div className="max-w-4xl mx-auto">
        <PlayerSummary player={player} teamName={teamWithPlayer?.full_name || ''} />
        
        {player.history && player.history.length > 0 && (
          <>
            <SeasonStatsTable statistics={player.history} />
            <PerformanceEvolution history={player.history} />
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerDetails;