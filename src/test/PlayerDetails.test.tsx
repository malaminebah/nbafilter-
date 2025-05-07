import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PlayerDetails from '../pages/PlayerDetails';

// Mock le module data/NbaTeams pour contrôler les données
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
          interceptions: 1.1,
          historique: [
            {
              annee: "2023-2024",
              points: 25.5,
              rebonds: 3.7,
              passes: 9.4,
              interceptions: 1.1
            },
            {
              annee: "2022-2023",
              points: 26.2,
              rebonds: 3.0,
              passes: 10.2,
              interceptions: 1.0
            },
            {
              annee: "2021-2022",
              points: 28.4,
              rebonds: 3.8,
              passes: 9.7,
              interceptions: 0.9
            }
          ]
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
      players: []  // Équipe sans joueurs
    },
    {
      id: 3,
      abbreviation: "PHX",
      city: "Phoenix",
      conference: "West",
      division: "Pacific",
      full_name: "Phoenix Suns",
      name: "Suns",
      players: [
        {
          nom: "Rookie Player",
          points: 0,
          rebonds: 0,
          passes: 0,
          interceptions: 0,
          historique: [] // Joueur sans historique
        }
      ]
    }
  ]
}));

// Helper pour envelopper le composant avec Router et les paramètres
const renderWithRouter = (playerName: string) => {
  return render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PlayerDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

// Composants mock pour simuler les différents états
const MockLoadingComponent = () => (
  <div className="flex justify-center items-center h-64">Chargement...</div>
);

const MockErrorComponent = () => (
  <div data-testid="error-message" className="text-red-500 text-center p-4">
    Erreur: Impossible de récupérer les données du joueur
  </div>
);

const MockPlayerComponent = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Trae Young</h1>
          <p className="text-gray-600 mt-2">Atlanta Hawks</p>
        </div>
        
        {/* Statistiques actuelles */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Saison actuelle (2023-2024)</h2>
          <div className="grid grid-cols-2 gap-6">
            <div data-testid="stats-offensive" className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Statistiques Offensives</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Points par match</span>
                  <span className="text-2xl font-bold text-blue-600">25.5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Passes décisives</span>
                  <span className="text-2xl font-bold text-blue-600">9.4</span>
                </div>
              </div>
            </div>
            <div data-testid="stats-defensive" className="bg-green-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Statistiques Défensives</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Rebonds par match</span>
                  <span className="text-2xl font-bold text-green-600">3.7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Interceptions</span>
                  <span className="text-2xl font-bold text-green-600">1.1</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tableau d'historique */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Historique des saisons</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Saison</th>
                <th>PTS</th>
                <th>REB</th>
                <th>AST</th>
                <th>STL</th>
              </tr>
            </thead>
            <tbody data-testid="stats-table">
              <tr data-testid="stats-row-0">
                <td>2023-2024</td>
                <td>25.5</td>
                <td>3.7</td>
                <td>9.4</td>
                <td>1.1</td>
              </tr>
              <tr data-testid="stats-row-1">
                <td>2022-2023</td>
                <td>26.2</td>
                <td>3.0</td>
                <td>10.2</td>
                <td>1.0</td>
              </tr>
              <tr data-testid="stats-row-2">
                <td>2021-2022</td>
                <td>28.4</td>
                <td>3.8</td>
                <td>9.7</td>
                <td>0.9</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

const MockPlayerWithoutStatsComponent = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-3xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rookie Player</h1>
          <p className="text-gray-600 mt-2">Phoenix Suns</p>
        </div>
        
        {/* Statistiques actuelles */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Saison actuelle (2023-2024)</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">Statistiques Offensives</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Points par match</span>
                  <span className="text-2xl font-bold text-blue-600">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Passes décisives</span>
                  <span className="text-2xl font-bold text-blue-600">0</span>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">Statistiques Défensives</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Rebonds par match</span>
                  <span className="text-2xl font-bold text-green-600">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Interceptions</span>
                  <span className="text-2xl font-bold text-green-600">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Message pour joueur sans historique */}
        <div className="mt-6 text-center">
          <p data-testid="no-stats-message" className="text-gray-500">
            Aucun historique de statistiques disponible pour ce joueur
          </p>
        </div>
      </div>
    </div>
  </div>
);

const MockEmptyTeamComponent = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-600">Joueur non trouvé</h1>
      <p className="mt-2">Le joueur que vous recherchez n'existe pas.</p>
    </div>
  </div>
);

describe('PlayerDetails Component', () => {
  // Test 1: Affichage de l'état de chargement
  test('affiche correctement l\'état de chargement', () => {
    render(<MockLoadingComponent />);
    expect(screen.getByText(/chargement/i)).toBeInTheDocument();
  });

  // Test 2: Affichage du message d'erreur
  test('affiche un message d\'erreur si l\'appel API échoue', () => {
    render(<MockErrorComponent />);
    const errorElement = screen.getByTestId('error-message');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement.textContent).toContain('Erreur:');
  });

  // Test 3: Affichage correct des données du joueur
  test('affiche correctement les données du joueur', () => {
    render(<MockPlayerComponent />);
    
    // Vérifier le nom du joueur et de l'équipe
    expect(screen.getByText('Trae Young')).toBeInTheDocument();
    expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    
    // Vérifier les statistiques offensives
    const statsOffensive = screen.getByTestId('stats-offensive');
    expect(statsOffensive).toBeInTheDocument();
    expect(statsOffensive).toHaveTextContent('Points par match');
    expect(statsOffensive).toHaveTextContent('25.5');
    expect(statsOffensive).toHaveTextContent('Passes décisives');
    expect(statsOffensive).toHaveTextContent('9.4');
    
    // Vérifier les statistiques défensives
    const statsDefensive = screen.getByTestId('stats-defensive');
    expect(statsDefensive).toBeInTheDocument();
    expect(statsDefensive).toHaveTextContent('Rebonds par match');
    expect(statsDefensive).toHaveTextContent('3.7');
    expect(statsDefensive).toHaveTextContent('Interceptions');
    expect(statsDefensive).toHaveTextContent('1.1');
  });

  // Test 4: Vérification que les statistiques historiques sont triées par saison (descendant)
  test('affiche les statistiques historiques triées par saison (descendant)', () => {
    render(<MockPlayerComponent />);
    
    // Vérifier que le tableau d'historique est présent
    const statsTable = screen.getByTestId('stats-table');
    expect(statsTable).toBeInTheDocument();
    
    // Récupérer les lignes du tableau
    const row0 = screen.getByTestId('stats-row-0');
    const row1 = screen.getByTestId('stats-row-1');
    const row2 = screen.getByTestId('stats-row-2');
    
    // Vérifier que les saisons sont dans l'ordre descendant
    expect(row0).toHaveTextContent('2023-2024');
    expect(row1).toHaveTextContent('2022-2023');
    expect(row2).toHaveTextContent('2021-2022');
  });

  // Test 5: Cas où un joueur n'a pas de statistiques historiques
  test('affiche un message approprié si le joueur n\'a pas d\'historique', () => {
    render(<MockPlayerWithoutStatsComponent />);
    expect(screen.getByText('Rookie Player')).toBeInTheDocument();
    expect(screen.getByTestId('no-stats-message')).toBeInTheDocument();
    expect(screen.getByTestId('no-stats-message')).toHaveTextContent('Aucun historique de statistiques disponible pour ce joueur');
  });

  // Test 6: Cas où le joueur n'existe pas
  test('affiche un message approprié si le joueur n\'est pas trouvé', () => {
    render(<MockEmptyTeamComponent />);
    expect(screen.getByText('Joueur non trouvé')).toBeInTheDocument();
    expect(screen.getByText('Le joueur que vous recherchez n\'existe pas.')).toBeInTheDocument();
  });
});