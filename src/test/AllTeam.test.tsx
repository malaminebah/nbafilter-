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
  <div className="flex justify-center items-center h-64">Loading...</div>
);

const MockErrorComponent = () => (
  <div data-testid="error-message" className="text-red-500 text-center p-4">
    Error: An error occurred
  </div>
);

describe('AllTeams (TeamList) Component', () => {
  test('correctly displays loading state', () => {
    render(<MockLoadingComponent />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('displays error message if API call fails', () => {
    render(<MockErrorComponent />);
    
    const errorElement = screen.getByTestId('error-message');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement.textContent).toContain('Error:');
  });

  test('correctly displays team list when API call succeeds', async () => {
    renderWithRouter(<AllTeams />);
    
    await waitFor(() => {
      expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    });

    expect(screen.getByText('Boston Celtics')).toBeInTheDocument();
  });

  test('correctly filters teams based on search term', async () => {
    renderWithRouter(<AllTeams />);
    
    await waitFor(() => {
      expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search for a team...');
    
    fireEvent.change(searchInput, { target: { value: 'Atlanta' } });
    
    expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    expect(screen.queryByText('Boston Celtics')).not.toBeInTheDocument();
    
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    expect(screen.getByText('Boston Celtics')).toBeInTheDocument();
  });
  
  test('verifies useState functionality with "Clear search" button', async () => {
    renderWithRouter(<AllTeams />);
    
    await waitFor(() => {
      expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search for a team...');
    
    fireEvent.change(searchInput, { target: { value: 'XYZ' } });
    
    await waitFor(() => {
      expect(screen.queryByText('Atlanta Hawks')).not.toBeInTheDocument();
      expect(screen.queryByText('Boston Celtics')).not.toBeInTheDocument();
      expect(screen.getByTestId('no-results-message')).toBeInTheDocument();
    });
    
    const clearButton = screen.getByText('Clear search');
    fireEvent.click(clearButton);
    
    await waitFor(() => {
      expect(screen.getByText('Atlanta Hawks')).toBeInTheDocument();
      expect(screen.getByText('Boston Celtics')).toBeInTheDocument();
      expect(screen.queryByTestId('no-results-message')).not.toBeInTheDocument();
    });
    
    expect(searchInput).toHaveValue('');
  });
});