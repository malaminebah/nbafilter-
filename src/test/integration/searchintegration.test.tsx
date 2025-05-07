import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AllTeams from '../../pages/AllTeam';

// Mock des données des équipes
jest.mock('../../data/NbaTeams.ts', () => ({
  allTeams: [
    {
      id: 1,
      abbreviation: "ATL",
      city: "Atlanta",
      conference: "East",
      division: "Southeast",
      full_name: "Atlanta Hawks",
      name: "Hawks"
    },
    {
      id: 2,
      abbreviation: "BOS",
      city: "Boston",
      conference: "East",
      division: "Atlantic",
      full_name: "Boston Celtics",
      name: "Celtics"
    }
  ]
}));

describe('Intégration de la recherche', () => {
  const renderWithRouter = () => {
    return render(
      <BrowserRouter>
        <AllTeams />
      </BrowserRouter>
    );
  };

  test('filtre les équipes en fonction de la recherche', async () => {
    renderWithRouter();
    
    // Vérifier que toutes les équipes sont affichées initialement
    expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    expect(screen.getByText('Boston Celtics')).toBeInTheDocument();
    
    // Rechercher "Hawks"
    const searchInput = screen.getByPlaceholderText('Rechercher une équipe...');
    fireEvent.change(searchInput, { target: { value: 'Hawks' } });
    
    // Vérifier que seule l'équipe Hawks est affichée
    await waitFor(() => {
      expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
      expect(screen.queryByText('Boston Celtics')).not.toBeInTheDocument();
    });
  });

  test('affiche un message quand aucune équipe ne correspond à la recherche', async () => {
    renderWithRouter();
    
    // Rechercher une équipe inexistante
    const searchInput = screen.getByPlaceholderText('Rechercher une équipe...');
    fireEvent.change(searchInput, { target: { value: 'XYZ' } });
    
    // Vérifier le message "Aucune équipe trouvée"
    await waitFor(() => {
      const message = screen.getByText((content, element) => {
        return element?.textContent?.includes('Aucune équipe trouvée pour "XYZ"') ?? false;
      });
      expect(message).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  test('la recherche est insensible à la casse', async () => {
    renderWithRouter();
    
    // Rechercher "hawks" en minuscules
    const searchInput = screen.getByPlaceholderText('Rechercher une équipe...');
    fireEvent.change(searchInput, { target: { value: 'hawks' } });
    
    // Vérifier que l'équipe Hawks est toujours trouvée
    await waitFor(() => {
      expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    });
  });
}); 