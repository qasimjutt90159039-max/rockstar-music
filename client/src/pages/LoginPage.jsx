import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/account';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) {
      if (email.toLowerCase() === 'admin@rockstar.pk') {
        navigate('/admin');
      } else {
        navigate(from, { replace: true });
      }
    }
  };

  const handleAdminAutofill = () => {
    setEmail('admin@rockstar.pk');
    setPassword('AdminPassword123!');
  };

  return (
    <div className="bg-[#000000] min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-md w-full space-y-8 bg-[#111111] border border-studio-border p-8 sm:p-10 rounded-3xl shadow-2xl">
        <div className="text-center">
          <div className="text-xs font-mono text-studio-gold uppercase tracking-widest mb-1">
            Rockstar Account
          </div>
          <h2 className="text-3xl font-black font-display text-white">
            CUSTOMER LOGIN
          </h2>
          <p className="mt-2 text-xs text-gray-400">
            Sign in to track your musical instrument orders and manage your saved addresses.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="text-xs text-gray-300 block mb-1.5 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-3 py-3 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-300 block mb-1.5 font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-3 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-black tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-studio-gold/15 disabled:opacity-50"
          >
            <LogIn className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Demo Admin Quick Credentials Box */}
        <div className="p-4 bg-[#151515] border border-studio-border/70 rounded-2xl text-xs text-gray-400 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-studio-gold" />
              <span>Admin Credentials</span>
            </span>
            <button
              type="button"
              onClick={handleAdminAutofill}
              className="text-[11px] font-mono text-studio-gold hover:underline font-bold"
            >
              Autofill
            </button>
          </div>
          <div className="font-mono text-[11px] text-gray-400 space-y-0.5">
            <div>Email: <span className="text-gray-200">admin@rockstar.pk</span></div>
            <div>Password: <span className="text-gray-200">AdminPassword123!</span></div>
          </div>
        </div>

        <div className="text-center pt-2 text-xs text-gray-400">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-studio-gold hover:underline font-bold">
            Create Customer Account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
