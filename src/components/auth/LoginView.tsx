import React, { useState } from 'react';
import { Leaf, LogIn, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginView: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const err = await signIn(email.trim(), password);
    if (err) setError(err);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-eco-dark flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-eco-surface border border-eco-border rounded-2xl p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-extrabold text-lg text-white">EcoConsult</div>
            <div className="text-xs text-slate-400">Acesso restrito</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1">E-mail</label>
            <input
              id="email" type="email" required autoComplete="email" value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-eco-dark border border-eco-border rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-brand-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-xs font-medium text-slate-300 mb-1">Senha</label>
            <input
              id="password" type="password" required autoComplete="current-password" value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-eco-dark border border-eco-border rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-brand-500"
            />
          </div>

          {error && (
            <div role="alert" className="flex items-start space-x-2 text-xs text-red-300 bg-red-950/50 border border-red-800 rounded-lg p-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit" disabled={submitting}
            className="w-full flex items-center justify-center space-x-2 bg-brand-600 hover:bg-brand-500 disabled:opacity-60 text-white rounded-lg py-2.5 text-sm font-semibold transition"
          >
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <LogIn className="w-4 h-4" />}
            <span>{submitting ? 'Entrando...' : 'Entrar'}</span>
          </button>
        </form>

        <p className="mt-6 text-[11px] text-slate-500 text-center">
          Não tem acesso? Solicite à administradora da consultoria.
        </p>
      </div>
    </div>
  );
};
