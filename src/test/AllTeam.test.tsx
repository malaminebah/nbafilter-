import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AllTeams from '../pages/AllTeam';
import { ThemeProvider } from '../context/ThemeContext';
import * as apiService from '../service/serviceApi';

// Mock the API service
jest.mock('../service/serviceApi', () => ({
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
    players: [
      {
        name: "Trae Young",
        points: 25.5,
        rebounds: 3.7,
        assists: 9.4,
        steals: 1.1
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
        name: "Jayson Tatum",
        points: 30.1,
        rebounds: 8.8,
        assists: 4.6,
        steals: 1.1
      }
    ]
  }
];

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider>
      <BrowserRouter>{ui}</BrowserRouter>
    </ThemeProvider>
  );
};



describe('AllTeams (TeamList) Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default successful API response
    (apiService.getAllTeams as jest.Mock).mockResolvedValue(mockTeams);
  });

  test('correctly displays loading state', async () => {
    // Set up API call to delay so we can see loading state
    (apiService.getAllTeams as jest.Mock).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(mockTeams), 100))
    );
    
    renderWithRouter(<AllTeams />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('displays error message if API call fails', async () => {
    // Set up API call to fail
    (apiService.getAllTeams as jest.Mock).mockRejectedValue(new Error('API error'));
    
    renderWithRouter(<AllTeams />);
    
    await waitFor(() => {
      const errorElement = screen.getByTestId('error-message');
      expect(errorElement).toBeInTheDocument();
      expect(errorElement.textContent).toContain('API error');
    });
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