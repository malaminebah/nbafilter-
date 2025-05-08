import React from 'react';
import AllTeams from './pages/AllTeam';
import { Routes, Route } from 'react-router-dom';
import TeamDetails from './pages/TeamDetails';
import PlayerDetails from './pages/PlayerDetails';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto py-6 px-4">
        <Routes>
          <Route path="/" element={<AllTeams />} />
          <Route path="/player/:playerName" element={<PlayerDetails />} />
          <Route path="/team/:teamId" element={<TeamDetails />} />
        </Routes>
      </main>
    </div>
  )
}

export default App 