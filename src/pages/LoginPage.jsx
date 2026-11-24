import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tv, LogIn, UserPlus, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleGoogleLogin = async () => {
    setError('');
    setSubmitting(true);
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      setError('Échec de la connexion avec Google : ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (isRegister) {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
      navigate('/');
    } catch (err) {
      setError('Erreur d’authentification : ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
            <Tv className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white">OriAnime</h1>
          <p className="text-sm text-slate-400 mt-1">
            Journal de visionnage et créateur de Tier Lists
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={submitting}
          className="w-full py-2.5 px-4 bg-white hover:bg-slate-100 text-slate-900 font-medium rounded-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span>Continuer avec Google</span>
        </button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-900 px-2 text-slate-500">ou par email</span>
          </div>
        </div>

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Adresse email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
              placeholder="toi@exemple.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Mot de passe
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-100 focus:outline-none focus:border-indigo-500"
              placeholder="6 caractères minimum"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isRegister ? (
              <>
                <UserPlus className="w-4 h-4" />
                <span>Créer un compte</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Se connecter</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          {isRegister ? 'Déjà un compte ?' : 'Pas encore de compte ?'}{' '}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
            }}
            className="text-indigo-400 hover:text-indigo-300 font-medium cursor-pointer"
          >
            {isRegister ? 'Se connecter' : 'S’inscrire'}
          </button>
        </p>
      </div>
    </div>
  );
}