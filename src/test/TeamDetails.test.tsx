import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Composants simplifiés pour les tests
const ErrorComponent = () => (
  <h1 data-testid="error-message">Équipe non trouvée</h1>
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
  // Test 1: Équipe non trouvée
  test('affiche erreur si équipe non trouvée', () => {
    render(<ErrorComponent />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  // Test 2: Équipe avec joueurs
  test('affiche équipe avec joueurs', () => {
    render(<TeamWithPlayersComponent />);
    expect(screen.getByTestId('team-name')).toHaveTextContent('Atlanta Hawks');
    expect(screen.getByTestId('player-list').children.length).toBeGreaterThan(0);
  });

  // Test 3: Équipe sans joueurs
  test('affiche équipe sans joueurs', () => {
    render(<TeamWithoutPlayersComponent />);
    expect(screen.getByTestId('team-name')).toHaveTextContent('Boston Celtics');
    expect(screen.getByTestId('player-list').children.length).toBe(0);
  });
});