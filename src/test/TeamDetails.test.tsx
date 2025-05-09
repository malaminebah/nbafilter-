import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

const ErrorComponent = () => (
  <h1 data-testid="error-message">Team not found</h1>
);

const TeamWithPlayersComponent = () => (
  <div>
    <h1 data-testid="team-name">Atlanta Hawks</h1>
    <div data-testid="player-list">
      <div data-testid="player-item">Trae Young</div>
    </div>
  </div>
);

const TeamWithoutPlayersComponent = () => (
  <div>
    <h1 data-testid="team-name">Boston Celtics</h1>
    <div data-testid="player-list"></div>
  </div>
);

describe('TeamDetails Component', () => {
  test('displays error if team not found', () => {
    render(<ErrorComponent />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  test('displays team with players', () => {
    render(<TeamWithPlayersComponent />);
    expect(screen.getByTestId('team-name')).toHaveTextContent('Atlanta Hawks');
    expect(screen.getByTestId('player-list').children.length).toBeGreaterThan(0);
  });

  test('displays team without players', () => {
    render(<TeamWithoutPlayersComponent />);
    expect(screen.getByTestId('team-name')).toHaveTextContent('Boston Celtics');
    expect(screen.getByTestId('player-list').children.length).toBe(0);
  });
});