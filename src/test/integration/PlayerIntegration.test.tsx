import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";

const mockPlayers = [
  {
    id: 1,
    nom: "Trae Young",
    points: 25.5,
    rebonds: 3.7,
    passes: 9.4,
    interceptions: 1.1,
  },
  {
    id: 2,
    nom: "Jayson Tatum",
    points: 30.1,
    rebonds: 8.8,
    passes: 4.6,
    interceptions: 1.1,
  },
];

const TeamDetail = ({
  onPlayerClick,
}: {
  onPlayerClick: (playerName: string) => void;
}) => (
  <div data-testid="team-detail">
    <h1>Atlanta Hawks</h1>
    <div data-testid="players-list">
      {mockPlayers.map((player) => (
        <div
          key={player.id}
          data-testid={`player-${player.id}`}
          onClick={() => onPlayerClick(player.nom)}
        >
          {player.nom}
        </div>
      ))}
    </div>
  </div>
);

const PlayerStats = ({ playerName }: { playerName: string }) => (
  <div data-testid="player-stats">
    <h1>Player Statistics</h1>
    <p data-testid="player-name-display">Player: {playerName}</p>
  </div>
);

const App = () => {
  const [selectedPlayer, setSelectedPlayer] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handlePlayerClick = (playerName: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedPlayer(playerName);
      setIsLoading(false);
    }, 100);
  };

  return (
    <div>
      {isLoading && <div data-testid="loading">Loading...</div>}

      {!selectedPlayer && !isLoading ? (
        <TeamDetail onPlayerClick={handlePlayerClick} />
      ) : !isLoading && selectedPlayer ? (
        <PlayerStats playerName={selectedPlayer} />
      ) : null}
    </div>
  );
};

describe("TeamDetail and PlayerStats Integration Test", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("Navigates to player statistics after click", async () => {
    render(<App />);

    expect(screen.getByTestId("team-detail")).toBeInTheDocument();
    expect(screen.getByTestId("player-1")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("player-1"));

    expect(screen.getByTestId("loading")).toBeInTheDocument();

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    expect(screen.queryByTestId("team-detail")).not.toBeInTheDocument();
    expect(screen.getByTestId("player-stats")).toBeInTheDocument();

    expect(screen.getByTestId("player-name-display")).toHaveTextContent(
      "Player: Trae Young"
    );
  });

  test("Loads data for the correct player", async () => {
    render(<App />);

    fireEvent.click(screen.getByTestId("player-2"));

    await act(async () => {
      jest.advanceTimersByTime(200);
    });

    expect(screen.getByTestId("player-name-display")).toHaveTextContent(
      "Player: Jayson Tatum"
    );
  });
});
