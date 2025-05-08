import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AllTeams from '../pages/AllTeam';
import { ThemeProvider } from '../context/ThemeContext';

jest.mock('../../data/NbaTeams.ts', () => ({
  allTeams: [
    {
      id: 1,
      abbreviation: "ATL",
      city: "Atlanta",
      conference: "East",
      division: "Southeast",
      full_name: "Atlanta Hawks",
      name: "Hawks",
      players: [
        {
          nom: "Trae Young",
          points: 25.5,
          rebonds: 3.7,
          passes: 9.4,
          interceptions: 1.1
        }
      ]
    },
    {
      id: 2,
      abbreviation: "BOS",
      city: "Boston",
      conference: "East",
      division: "Atlantic",
      full_name: "Boston Celtics",
      name: "Celtics",
      players: [
        {
          nom: "Jayson Tatum",
          points: 30.1,
          rebonds: 8.8,
          passes: 4.6,
          interceptions: 1.1
        }
      ]
    }
  ]
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeProvider>
  );
};

const MockLoadingComponent = () => (
  <div className="flex justify-center items-center h-64">Chargement...</div>
);

const MockErrorComponent = () => (
  <div data-testid="error-message" className="text-red-500 text-center p-4">
    Erreur: Une erreur est survenue
  </div>
);

describe('AllTeams (TeamList) Component', () => {
  test('affiche correctement l\'état de chargement', () => {
    render(<MockLoadingComponent />);
    
    expect(screen.getByText(/chargement/i)).toBeInTheDocument();
  });

  test('affiche un message d\'erreur si l\'appel API échoue', () => {
    render(<MockErrorComponent />);
    
    const errorElement = screen.getByTestId('error-message');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement.textContent).toContain('Erreur:');
  });

  test('affiche correctement la liste d\'équipes lorsque l\'appel réussit', async () => {
    renderWithRouter(<AllTeams />);
    
    await waitFor(() => {
      expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    });

    expect(screen.getByText('Boston Celtics')).toBeInTheDocument();
  });

  test('filtre correctement les équipes selon le terme de recherche', async () => {
    renderWithRouter(<AllTeams />);
    
    await waitFor(() => {
      expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Rechercher une équipe...');
    
    fireEvent.change(searchInput, { target: { value: 'Atlanta' } });
    
    expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    expect(screen.queryByText('Boston Celtics')).not.toBeInTheDocument();
    
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    expect(screen.getByText('Boston Celtics')).toBeInTheDocument();
  });
  
  test('vérifie la fonctionnalité du useState avec le bouton "Effacer la recherche"', async () => {
    renderWithRouter(<AllTeams />);
    
    await waitFor(() => {
      expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Rechercher une équipe...');
    
    fireEvent.change(searchInput, { target: { value: 'XYZ' } });
    
    await waitFor(() => {
      expect(screen.queryByText('Atlanta Hawks')).not.toBeInTheDocument();
      expect(screen.queryByText('Boston Celtics')).not.toBeInTheDocument();
      expect(screen.getByTestId('no-results-message')).toBeInTheDocument();
    });
    
    const clearButton = screen.getByText('Effacer la recherche');
    fireEvent.click(clearButton);
    
    await waitFor(() => {
      expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
      expect(screen.getByText('Boston Celtics')).toBeInTheDocument();
      expect(screen.queryByTestId('no-results-message')).not.toBeInTheDocument();
    });
    
    expect(searchInput).toHaveValue('');
  });
});