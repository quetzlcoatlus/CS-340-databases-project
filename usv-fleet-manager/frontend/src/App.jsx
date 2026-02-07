import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import USVsPage from './pages/USVsPage';
import CrewMembersPage from './pages/CrewMembersPage';
import MissionsPage from './pages/MissionsPage';
import PayloadsPage from './pages/PayloadsPage';
import QualificationsPage  from './pages/QualificationsPage';
import CrewMemberQualificationsPage from './pages/CrewMemberQualificationsPage';
import PrioritiesPage from './pages/PrioritiesPage';

function App() {
  return (
    <div className="app">
      <Router>
        <header>
          <h1>USV Fleet Manager</h1>
          <p>CS340 Database Project</p>
        </header>

        {/* Global Navigation Bar */}
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="/usvs">USVs</Link>
            <Link to="/crew">Crew Members</Link>
            <Link to="/missions">Missions</Link>
            <Link to="/payloads">Payloads</Link>
            <Link to="/qualifications">Qualifications</Link>
            <Link to="/crew-qualifications">Crew Qualifications</Link>
            <Link to="/priorities">Priorities</Link>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/usvs" element={<USVsPage />} />
            <Route path="/crew" element={<CrewMembersPage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/payloads" element={<PayloadsPage />} />
            <Route path="/qualifications" element={<QualificationsPage />} />
            <Route path="/crew-qualifications" element={<CrewMemberQualificationsPage />} />
            <Route path="/priorities" element={<PrioritiesPage />} />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2026 Alexander Jones and Alexander Lane</p>
        </footer>
      </Router>
    </div>
  );
}

export default App;