import React from 'react';
import { useParams } from 'react-router-dom';
import { allTeams } from '../../data/NbaTeams';
import TeamHeader from '../components/TeamHeader';
import TeamRoster from '../components/TeamRoster';
import TeamNotFound from '../components/TeamNotFound';

const TeamDetails: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();

  const team = allTeams.find(t => t.id === Number(teamId));

  if (!team) {
    return <TeamNotFound />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        <TeamHeader team={team} />
        <TeamRoster players={team.players} />
        
      </div>
    </div>
  );
};

export default TeamDetails;