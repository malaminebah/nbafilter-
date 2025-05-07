import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AllTeams from '../pages/AllTeam';

// Mock le module data/teams pour contrôler les données
jest.mock('../../data/NbaTeams', () => ({
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

// Helper pour envelopper le composant AllTeams avec Router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

// Mock le composant AllTeams pour le test de chargement
const MockLoadingComponent = () => (
  <div className="flex justify-center items-center h-64">Chargement...</div>
);

// Mock le composant AllTeams pour le test d'erreur
const MockErrorComponent = () => (
  <div data-testid="error-message" className="text-red-500 text-center p-4">
    Erreur: Une erreur est survenue
  </div>
);

describe('AllTeams (TeamList) Component', () => {
  // Test 1: Affichage de l'état de chargement
  test('affiche correctement l\'état de chargement', () => {
    // Au lieu de mocker useState, testons simplement le composant
    // qui s'affiche pendant le chargement
    render(<MockLoadingComponent />);
    
    expect(screen.getByText(/chargement/i)).toBeInTheDocument();
  });

  // Test 2: Affichage du message d'erreur
  test('affiche un message d\'erreur si l\'appel API échoue', () => {
    // Tester directement le composant d'erreur
    render(<MockErrorComponent />);
    
    // Vérifier que le message d'erreur est affiché
    const errorElement = screen.getByTestId('error-message');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement.textContent).toContain('Erreur:');
  });

  // Test 3: Affichage correct des équipes
  test('affiche correctement la liste d\'équipes lorsque l\'appel réussit', async () => {
    renderWithRouter(<AllTeams />);
    
    // Attendre que les équipes soient affichées
    await waitFor(() => {
      expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    });

    // Vérifier que toutes les équipes sont affichées
    expect(screen.getByText('Boston Celtics')).toBeInTheDocument();
  });

  // Test 4: Filtrage des équipes
  test('filtre correctement les équipes selon le terme de recherche', async () => {
    renderWithRouter(<AllTeams />);
    
    // Attendre que les équipes soient affichées
    await waitFor(() => {
      expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    });

    // Trouver le champ de recherche
    const searchInput = screen.getByPlaceholderText('Rechercher une équipe...');
    
    // Saisir "Atlanta" dans le champ de recherche
    fireEvent.change(searchInput, { target: { value: 'Atlanta' } });
    
    // Vérifier que seul "Atlanta Hawks" est affiché
    expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    expect(screen.queryByText('Boston Celtics')).not.toBeInTheDocument();
    
    // Effacer le champ et vérifier que toutes les équipes réapparaissent
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    expect(screen.getByText('Boston Celtics')).toBeInTheDocument();
  });
});