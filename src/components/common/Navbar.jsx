import { NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, Layers, BarChart3, LogOut, Tv } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <NavLink to="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <Tv className="w-5 h-5 text-indigo-400" />
            <span>OriAnime</span>
          </NavLink>

          <nav className="flex items-center gap-2">
            <NavLink to="/" end className={navLinkClass}>
              <BookOpen className="w-4 h-4" />
              <span>Journal</span>
            </NavLink>
            <NavLink to="/tierlists" className={navLinkClass}>
              <Layers className="w-4 h-4" />
              <span>Tier Lists</span>
            </NavLink>
            <NavLink to="/stats" className={navLinkClass}>
              <BarChart3 className="w-4 h-4" />
              <span>Statistiques</span>
            </NavLink>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-xs text-slate-400">
            {user?.displayName || user?.email}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            title="Se déconnecter"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </div>
    </header>
  );
}