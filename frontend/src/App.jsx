import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './contexts/AuthContext';
import { FavoritesProvider } from './contexts/FavoritesContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import NotesPage from './pages/NotesPage';
import UploadPage from './pages/UploadPage';
import ForumPage from './pages/ForumPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <FavoritesProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />{/* Protected Routes (for demo purposes, we'll show them directly) */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/forum" element={<ForumPage />} />          <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />{/* Redirect any unknown routes to 404 page */}            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </FavoritesProvider>
      </AuthProvider>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="toast-container"
      />
    </Router>
  );
}

export default App;


