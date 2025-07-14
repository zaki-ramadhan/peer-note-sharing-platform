import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import NotesPage from './pages/NotesPage';
import UploadPage from './pages/UploadPage';
import ForumPage from './pages/ForumPage';
import LeaderboardPage from './pages/LeaderboardPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes (for demo purposes, we'll show them directly) */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />

        {/* Redirect any unknown routes to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
