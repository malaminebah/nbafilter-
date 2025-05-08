import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import AllTeams from "../../pages/AllTeam";
import { ThemeProvider } from "../../context/ThemeContext";

jest.mock("../../../data/NbaTeams.ts", () => ({
  allTeams: [
    {
      id: 1,
      abbreviation: "ATL",
      city: "Atlanta",
      conference: "East",
      division: "Southeast",
      full_name: "Atlanta Hawks",
      name: "Hawks",
    },
    {
      id: 2,
      abbreviation: "BOS",
      city: "Boston",
      conference: "East",
      division: "Atlantic",
      full_name: "Boston Celtics",
      name: "Celtics",
    },
  ],
}));

describe("Intégration de la recherche", () => {
  const renderWithRouter = () => {
    return render(
      <ThemeProvider>
        <BrowserRouter>
          <AllTeams />
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  test("filtre les équipes en fonction de la recherche", async () => {
    renderWithRouter();

    expect(screen.getByText("Atlanta Hawks")).toBeInTheDocument();
    expect(screen.getByText("Boston Celtics")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Rechercher une équipe...");
    fireEvent.change(searchInput, { target: { value: "Hawks" } });

    await waitFor(() => {
      expect(screen.getByText("Atlanta Hawks")).toBeInTheDocument();
      expect(screen.queryByText("Boston Celtics")).not.toBeInTheDocument();
    });
  });

  test("affiche un message quand aucune équipe ne correspond à la recherche", async () => {
    renderWithRouter();

    const searchInput = screen.getByPlaceholderText("Rechercher une équipe...");
    fireEvent.change(searchInput, { target: { value: "XYZ" } });

    await waitFor(
      () => {
        const message = screen.getByTestId("no-results-message");
        expect(message).toHaveTextContent('Aucune équipe trouvée pour "XYZ"');
      },
      { timeout: 3000 }
    );
  });

  test("la recherche est insensible à la casse", async () => {
    renderWithRouter();

    const searchInput = screen.getByPlaceholderText("Rechercher une équipe...");
    fireEvent.change(searchInput, { target: { value: "hawks" } });

    await waitFor(() => {
      expect(screen.getByText("Atlanta Hawks")).toBeInTheDocument();
    });
  });
});
