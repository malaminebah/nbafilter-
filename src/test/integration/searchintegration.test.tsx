import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import AllTeams from "../../pages/AllTeam";
import { ThemeProvider } from "../../context/ThemeContext";
import * as apiService from "../../service/serviceApi";

// Mock the API service
jest.mock("../../service/serviceApi", () => ({
  getAllTeams: jest.fn(),
  searchTeams: jest.fn()
}));

// Mock data for tests
const mockTeams = [
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
];

describe("Search Integration", () => {
  const renderWithRouter = () => {
    return render(
      <ThemeProvider>
        <BrowserRouter>
          <AllTeams />
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Default successful API response
    (apiService.getAllTeams as jest.Mock).mockResolvedValue(mockTeams);
  });

  test("filters teams based on search input", async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText("Atlanta Hawks")).toBeInTheDocument();
    });

    expect(screen.getByText("Boston Celtics")).toBeInTheDocument();

    const searchInput = screen.getByPlaceholderText("Search for a team...");
    fireEvent.change(searchInput, { target: { value: "Hawks" } });

    await waitFor(() => {
      expect(screen.getByText("Atlanta Hawks")).toBeInTheDocument();
      expect(screen.queryByText("Boston Celtics")).not.toBeInTheDocument();
    });
  });

  test("displays a message when no teams match the search", async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText("Atlanta Hawks")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search for a team...");
    fireEvent.change(searchInput, { target: { value: "XYZ" } });

    await waitFor(
      () => {
        const message = screen.getByTestId("no-results-message");
        expect(message).toHaveTextContent('No teams found for "XYZ"');
      },
      { timeout: 3000 }
    );
  });

  test("search is case insensitive", async () => {
    renderWithRouter();

    await waitFor(() => {
      expect(screen.getByText("Atlanta Hawks")).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText("Search for a team...");
    fireEvent.change(searchInput, { target: { value: "hawks" } });

    await waitFor(() => {
      expect(screen.getByText("Atlanta Hawks")).toBeInTheDocument();
    });
  });
});
