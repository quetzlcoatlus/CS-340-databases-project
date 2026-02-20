import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import USVsPage from './pages/USVsPage';
import AddUSVPage from './pages/AddUSVPage';
import EditUSVPage from './pages/EditUSVPage';
import CrewMembersPage from './pages/CrewMembersPage';
import AddCrewMemberPage from './pages/AddCrewMemberPage';
import MissionsPage from './pages/MissionsPage';
import AddMissionPage from './pages/AddMissionPage';
import PayloadsPage from './pages/PayloadsPage';
import AddPayloadPage from './pages/AddPayloadPage';
import EditPayloadPage from './pages/EditPayloadPage';
import QualificationsPage  from './pages/QualificationsPage';
import AddQualificationPage from './pages/AddQualificationPage';
import CrewMemberQualificationsPage from './pages/CrewMemberQualificationsPage';
import AddCrewMemberQualificationPage from './pages/AddCrewMemberQualificationPage';
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
            <Route path="/usvs/add" element={<AddUSVPage />} />
            <Route path="/usvs/edit/:id" element={<EditUSVPage />} />
            <Route path="/crew" element={<CrewMembersPage />} />
            <Route path="/crew/add" element={<AddCrewMemberPage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/missions/add" element={<AddMissionPage />} />
            <Route path="/payloads" element={<PayloadsPage />} />
            <Route path="/payloads/add" element={<AddPayloadPage />} />
            <Route path="/payloads/edit/:id" element={<EditPayloadPage />} />
            <Route path="/qualifications" element={<QualificationsPage />} />
            <Route path="/qualifications/add" element={<AddQualificationPage />} />
            <Route path="/crew-qualifications" element={<CrewMemberQualificationsPage />} />
            <Route path="/crew-qualifications/add" element={<AddCrewMemberQualificationPage />} />
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