# NBA Filter

A modern React application that allows users to browse, search, and filter NBA teams and players, displaying detailed statistics and performance metrics.

## Overview

NBA Filter provides a user-friendly interface for basketball fans to explore NBA teams and players. The application features:

- List of all NBA teams with search functionality
- Detailed team information including roster and player stats
- Individual player profiles with comprehensive statistics
- Historical performance data visualization
- Responsive design for all devices

## Demo

![NBA Filter Demo](https://via.placeholder.com/800x400?text=NBA+Filter+Demo)

## Technologies Used

- **React**: Frontend library for building the user interface
- **TypeScript**: For type-safe development
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Vite**: Frontend build tool for fast development
- **React Router**: For client-side routing
- **Jest & React Testing Library**: For unit and integration testing

## Dependencies

Here's a breakdown of the key dependencies used in this project:

### Core Dependencies
- `react`: UI library for building component-based interfaces
- `react-dom`: React package for working with the DOM
- `react-router-dom`: Declarative routing for React applications

### Styling
- `tailwindcss`: Utility-first CSS framework
- `postcss`: Tool for transforming CSS with JavaScript plugins
- `autoprefixer`: PostCSS plugin to parse CSS and add vendor prefixes

### Development & Build Tools
- `vite`: Modern frontend build tool that significantly improves the development experience
- `typescript`: JavaScript superset for adding static types
- `eslint`: For code linting and enforcing consistent code style
- `prettier`: Code formatter to ensure consistent code formatting

### Testing
- `jest`: JavaScript testing framework
- `@testing-library/react`: Testing utilities for React
- `@testing-library/jest-dom`: Custom Jest matchers for DOM testing
- `@testing-library/user-event`: Library for simulating user events

## Data Source

This project uses static JSON data instead of a real-time NBA API for several reasons:

1. **API Limitations**: Most sports APIs have strict rate limits and/or require paid subscriptions for extensive usage
2. **Development Efficiency**: Using static data allows for faster development and testing without worrying about API downtime or rate limits
3. **Demonstration Purposes**: The primary goal of this project is to demonstrate frontend development skills rather than real-time data integration
4. **Consistent Testing Environment**: Static data provides a consistent dataset for testing

The data structure closely mimics what would be returned by a real NBA API, making it straightforward to replace with a live API integration in a production environment.

## Project Structure

```
nba-filter/
├── data/                  # Static data files
│   └── NbaTeams.ts        # Teams and players data
├── public/                # Public assets
├── src/
│   ├── components/        # Reusable components
│   ├── pages/             # Page components
│   ├── types/             # TypeScript type definitions
│   ├── test/              # Test files
│   └── ...
├── package.json           # Dependencies and scripts
└── ...
```

## Component Architecture

The application follows a modular component architecture:

- **Page Components**: High-level components representing entire pages (AllTeam, TeamDetails, PlayerDetails)
- **UI Components**: Reusable interface elements (TeamHeader, TeamRoster, PlayerSummary)
- **Data Display Components**: Components for visualizing data (SeasonStatsTable, PerformanceEvolution)
- **Utility Components**: Reusable utility components (SearchBar, NoResults, NotFound)

This separation of concerns ensures maintainability and allows for easy testing of individual components.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/malaminebah/nbafilter-.git
cd nba-filter
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Testing

The project includes comprehensive tests for components and functionality:

```bash
# Run all tests
npm test

# Run tests in watch mode (useful during development)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```
future Enhancements

- Integration with a live NBA API for real-time data
- Advanced filtering options by various player statistics
- Team comparison feature
- Player performance predictions
- User authentication to save favorite teams and players

## License

This project is licensed under the MIT License - see the LICENSE file for details.
