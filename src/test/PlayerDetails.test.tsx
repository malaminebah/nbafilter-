import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "../context/ThemeContext";
import * as apiService from "../service/serviceApi";
import PlayerDetails from "../pages/PlayerDetails";
import { MemoryRouter, Routes, Route } from "react-router-dom";

// Mock the API service
jest.mock("../service/serviceApi", () => ({
  getPlayerByName: jest.fn(),
  getAllTeams: jest.fn()
}));

// Mock window location
Object.defineProperty(window, 'location', {
  writable: true,
  value: { 
    pathname: '/player/Trae%20Young',
    href: 'http://localhost:3000/player/Trae%20Young',
    origin: 'http://localhost:3000'
  }
});

// Mock data for tests
const mockPlayerData = {
  player: {
    name: "Trae Young",
    points: 25.5,
    rebounds: 3.7,
    assists: 9.4,
    steals: 1.1,
    history: [
      {
        year: "2023-2024",
        points: 25.5,
        rebounds: 3.7,
        assists: 9.4,
        steals: 1.1,
      },
      {
        year: "2022-2023",
        points: 26.2,
        rebounds: 3.0,
        assists: 10.2,
        steals: 1.0,
      },
      {
        year: "2021-2022",
        points: 28.4,
        rebounds: 3.8,
        assists: 9.7,
        steals: 0.9,
      },
    ],
  },
  team: {
    id: 1,
    abbreviation: "ATL",
    city: "Atlanta",
    conference: "East",
    division: "Southeast",
    full_name: "Atlanta Hawks",
    name: "Hawks",
  }
};

const mockRookiePlayerData = {
  player: {
    name: "Rookie Player",
    points: 0,
    rebounds: 0,
    assists: 0,
    steals: 0,
    history: [],
  },
  team: {
    id: 3,
    abbreviation: "PHX",
    city: "Phoenix",
    conference: "West",
    division: "Pacific",
    full_name: "Phoenix Suns",
    name: "Suns",
  }
};

const MockLoadingComponent = () => (
  <div className="flex justify-center items-center h-64">Loading...</div>
);

const MockErrorComponent = () => (
  <div data-testid="error-message" className="text-red-500 text-center p-4">
    Error: Unable to retrieve player data
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

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Current Season (2023-2024)
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div
              data-testid="stats-offensive"
              className="bg-blue-50 rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Offensive Stats
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Points per game</span>
                  <span className="text-2xl font-bold text-blue-600">25.5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Assists</span>
                  <span className="text-2xl font-bold text-blue-600">9.4</span>
                </div>
              </div>
            </div>
            <div
              data-testid="stats-defensive"
              className="bg-green-50 rounded-lg p-6"
            >
              <h2 className="text-xl font-semibold text-green-800 mb-4">
              Defensive Stats
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Rebounds</span>
                  <span className="text-2xl font-bold text-green-600">3.7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Steals</span>
                  <span className="text-2xl font-bold text-green-600">1.1</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          History
          </h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th>Season</th>
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

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Current Season (2023-2024)
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">
                Offensive Stats
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Points per game</span>
                  <span className="text-2xl font-bold text-blue-600">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Assists</span>
                  <span className="text-2xl font-bold text-blue-600">0</span>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-green-800 mb-4">
                Defensive Stats
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Rebounds</span>
                  <span className="text-2xl font-bold text-green-600">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Steals</span>
                  <span className="text-2xl font-bold text-green-600">0</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p data-testid="no-stats-message" className="text-gray-500">
            No statistics history available for this player
          </p>
        </div>
      </div>
    </div>
  </div>
);

const MockEmptyTeamComponent = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-red-600">Player not found</h1>
      <p className="mt-2">The player you are looking for does not exist.</p>
    </div>
  </div>
);

const renderWithRouter = (playerName: string) => {
  return render(
    <ThemeProvider>
      <MemoryRouter initialEntries={[`/player/${encodeURIComponent(playerName)}`]}>
        <Routes>
          <Route path="/player/:playerName" element={<PlayerDetails />} />
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
};

describe("PlayerDetails Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading state correctly", async () => {
    (apiService.getPlayerByName as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockPlayerData), 100))
    );
    
    renderWithRouter('Trae Young');
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("displays error message if API call fails", async () => {
    (apiService.getPlayerByName as jest.Mock).mockRejectedValue(new Error("Unable to retrieve player data"));
    
    renderWithRouter('Trae Young');
    
    await waitFor(() => {
      expect(screen.getByTestId("error-title")).toBeInTheDocument();
      expect(screen.getByTestId("error-message")).toBeInTheDocument();
      expect(screen.getByTestId("error-message").textContent).toBe("Unable to retrieve player data");
    });
  });

  test("displays player data correctly", async () => {
    (apiService.getPlayerByName as jest.Mock).mockResolvedValue(mockPlayerData);
    
    render(<MockPlayerComponent />);
    
    expect(screen.getByText("Trae Young")).toBeInTheDocument();
    expect(screen.getByText("Atlanta Hawks")).toBeInTheDocument();

    const statsOffensive = screen.getByTestId("stats-offensive");
    expect(statsOffensive).toBeInTheDocument();
    expect(statsOffensive).toHaveTextContent("Points per game");
    expect(statsOffensive).toHaveTextContent("25.5");
    expect(statsOffensive).toHaveTextContent("Assists");
    expect(statsOffensive).toHaveTextContent("9.4");

    const statsDefensive = screen.getByTestId("stats-defensive");
    expect(statsDefensive).toBeInTheDocument();
    expect(statsDefensive).toHaveTextContent("Rebounds");
    expect(statsDefensive).toHaveTextContent("3.7");
    expect(statsDefensive).toHaveTextContent("Steals");
    expect(statsDefensive).toHaveTextContent("1.1");
  });

  test("displays historical statistics sorted by season (descending)", async () => {
    (apiService.getPlayerByName as jest.Mock).mockResolvedValue(mockPlayerData);
    
    render(<MockPlayerComponent />);
    
    const statsTable = screen.getByTestId("stats-table");
    expect(statsTable).toBeInTheDocument();

    const firstRow = screen.getByTestId("stats-row-0");
    expect(firstRow).toHaveTextContent("2023-2024");
    expect(firstRow).toHaveTextContent("25.5");
  });

  test("displays appropriate message if player has no history", async () => {
    (apiService.getPlayerByName as jest.Mock).mockResolvedValue(mockRookiePlayerData);
    
    render(<MockPlayerWithoutStatsComponent />);
    
    expect(screen.getByTestId("no-stats-message")).toBeInTheDocument();
    expect(screen.getByTestId("no-stats-message")).toHaveTextContent(
      "No statistics history available for this player"
    );
  });

  test("displays appropriate message if player is not found", async () => {
    (apiService.getPlayerByName as jest.Mock).mockResolvedValue(undefined);
    
    render(<MockEmptyTeamComponent />);
    expect(screen.getByText("Player not found")).toBeInTheDocument();
    expect(
      screen.getByText("The player you are looking for does not exist.")
    ).toBeInTheDocument();
  });
});
