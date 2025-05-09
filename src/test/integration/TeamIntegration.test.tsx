import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockTeams = [
  { id: 1, full_name: 'Atlanta Hawks', abbreviation: 'ATL', players: [] },
  { id: 2, full_name: 'Boston Celtics', abbreviation: 'BOS', players: [] }
];

const TeamList = ({ onTeamClick }: { onTeamClick: (id: number) => void }) => (
  <div data-testid="team-list">
    {mockTeams.map(team => (
      <div 
        key={team.id} 
        data-testid={`team-${team.id}`}
        onClick={() => onTeamClick(team.id)}
      >
        {team.full_name}
      </div>
    ))}
  </div>
);

const TeamDetail = ({ teamId }: { teamId: number }) => (
  <div data-testid="team-detail">
    <h1>Team Details {teamId}</h1>
    <p data-testid="team-id-display">ID: {teamId}</p>
  </div>
);

const App = () => {
  const [selectedTeamId, setSelectedTeamId] = React.useState<number | null>(null);
  
  const handleTeamClick = (id: number) => {
    setSelectedTeamId(id);
  };
  
  return (
    <div>
      {!selectedTeamId ? (
        <TeamList onTeamClick={handleTeamClick} />
      ) : (
        <TeamDetail teamId={selectedTeamId} />
      )}
    </div>
  );
};

describe("TeamList and TeamDetail Integration Test", () => {
  test("Displays team details with correct ID after clicking on a team", () => {
    render(<App />);
    
    expect(screen.getByTestId('team-list')).toBeInTheDocument();
    expect(screen.getByTestId('team-1')).toBeInTheDocument();
    expect(screen.getByTestId('team-2')).toBeInTheDocument();
    expect(screen.queryByTestId('team-detail')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId('team-1'));
    
    expect(screen.queryByTestId('team-list')).not.toBeInTheDocument();
    expect(screen.getByTestId('team-detail')).toBeInTheDocument();
    
    expect(screen.getByTestId('team-id-display')).toHaveTextContent('ID: 1');
  });
  
  test("Displays details with correct ID for different teams", () => {
    render(<App />);
    
    fireEvent.click(screen.getByTestId('team-2'));
    
    expect(screen.getByTestId('team-id-display')).toHaveTextContent('ID: 2');
  });
});