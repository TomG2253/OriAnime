import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import LoginPage from './pages/LoginPage';
import JournalPage from './pages/JournalPage';
import TierListHubPage from './pages/TierListHubPage';
import TierListEditorPage from './pages/TierListEditorPage';
import StatsPage from './pages/StatsPage';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {user && <Navbar />}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <LoginPage />}
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <JournalPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tierlists"
            element={
              <PrivateRoute>
                <TierListHubPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tierlists/:ownerId/:tierlistId"
            element={<TierListEditorPage />}
          />
          <Route
            path="/stats"
            element={
              <PrivateRoute>
                <StatsPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
}