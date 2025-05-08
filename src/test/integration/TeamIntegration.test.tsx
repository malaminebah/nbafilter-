import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const mockTeams = [
  { id: 1, full_name: 'Atlanta Hawks', abbreviation: 'ATL', players: [] },
  { id: 2, full_name: 'Boston Celtics', abbreviation: 'BOS', players: [] }
];

const TeamList = ({ onTeamClick }) => (
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

const TeamDetail = ({ teamId }) => (
  <div data-testid="team-detail">
    <h1>Détails de l'équipe {teamId}</h1>
    <p data-testid="team-id-display">ID: {teamId}</p>
  </div>
);

const App = () => {
  const [selectedTeamId, setSelectedTeamId] = React.useState(null);
  
  const handleTeamClick = (id) => {
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

describe("Test d'intégration TeamList et TeamDetail", () => {
  test("Affiche le détail d'équipe avec l'ID correct après clic sur une équipe", () => {
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
  
  test("Affiche le détail avec l'ID correct pour différentes équipes", () => {
    render(<App />);
    
    fireEvent.click(screen.getByTestId('team-2'));
    
    expect(screen.getByTestId('team-id-display')).toHaveTextContent('ID: 2');
  });
});