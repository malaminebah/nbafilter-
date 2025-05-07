import React from 'react';
import AllTeams from './pages/AllTeam';
import { Routes, Route, Link } from 'react-router-dom';
import TeamDetails from './pages/TeamDetails';
import PlayerDetails from './pages/PlayerDetails';


function App() {
  return (
    <>
    <Link to="/">
    <h1 className='text-3xl font-bold underline mb-6'>App test basket 1</h1>
    </Link>
      <Routes>
        <Route path="/" element={<AllTeams />} />
        <Route path="/player/:playerName" element={<PlayerDetails />} />
        <Route path="/team/:teamId" element={<TeamDetails />} />
      </Routes>
    </>
  )
}

export default App 