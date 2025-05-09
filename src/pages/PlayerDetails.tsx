import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PerformanceEvolution from '../components/PerformanceEvolution';
import SeasonStatsTable from '../components/SeasonStatsTable';
import PlayerSummary from '../components/PlayerSummary';
import PlayerNotFound from '../components/PlayerNotFound';
import { useTheme } from '../context/ThemeContext';
import { getPlayerByName } from '../service/serviceApi';
import { Player } from '../types/types';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const PlayerDetails: React.FC = () => {
  const { playerName } = useParams<{ playerName: string }>();
  const { darkMode } = useTheme();
  const [player, setPlayer] = useState<Player | null>(null);
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const decodedPlayerName = decodeURIComponent(playerName || '');
  
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        setLoading(true);
        if (!decodedPlayerName) {
          throw new Error("Player name is required");
        }
        
        const result = await getPlayerByName(decodedPlayerName);
        
        if (result) {
          setPlayer(result.player);
          setTeamName(result.team.full_name);
        } else {
          setPlayer(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerData();
  }, [decodedPlayerName]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <PlayerNotFound errorMessage={error} />;
  }

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
        <PlayerSummary player={player} teamName={teamName} />
        
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