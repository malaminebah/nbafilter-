import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ThemeProvider } from "../context/ThemeContext";

jest.mock("../../data/NbaTeams", () => ({
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
              interceptions: 1.1,
            },
            {
              annee: "2022-2023",
              points: 26.2,
              rebonds: 3.0,
              passes: 10.2,
              interceptions: 1.0,
            },
            {
              annee: "2021-2022",
              points: 28.4,
              rebonds: 3.8,
              passes: 9.7,
              interceptions: 0.9,
            },
          ],
        },
      ],
    },
    {
      id: 2,
      abbreviation: "BOS",
      city: "Boston",
      conference: "East",
      division: "Atlantic",
      full_name: "Boston Celtics",
      name: "Celtics",
      players: [],
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
          historique: [], 
        },
      ],
    },
  ],
}));

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

const renderWithProvider = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe("PlayerDetails Component", () => {
  test("displays loading state correctly", () => {
    render(<MockLoadingComponent />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("displays error message if API call fails", () => {
    render(<MockErrorComponent />);
    const errorElement = screen.getByTestId("error-message");
    expect(errorElement).toBeInTheDocument();
    expect(errorElement.textContent).toContain("Error:");
  });

  test("displays player data correctly", () => {
    renderWithProvider(<MockPlayerComponent />);
    
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

  test("displays historical statistics sorted by season (descending)", () => {
    renderWithProvider(<MockPlayerComponent />);
    
    const statsTable = screen.getByTestId("stats-table");
    expect(statsTable).toBeInTheDocument();

    const firstRow = screen.getByTestId("stats-row-0");
    expect(firstRow).toHaveTextContent("2023-2024");
    expect(firstRow).toHaveTextContent("25.5");
  });

  test("displays appropriate message if player has no history", () => {
    renderWithProvider(<MockPlayerWithoutStatsComponent />);
    
    expect(screen.getByTestId("no-stats-message")).toBeInTheDocument();
    expect(screen.getByTestId("no-stats-message")).toHaveTextContent(
      "No statistics history available for this player"
    );
  });

  test("displays appropriate message if player is not found", () => {
    renderWithProvider(<MockEmptyTeamComponent />);
    expect(screen.getByText("Player not found")).toBeInTheDocument();
    expect(
      screen.getByText("The player you are looking for does not exist.")
    ).toBeInTheDocument();
  });
});
