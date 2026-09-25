import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, UserPlus, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const { register, loading } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      addToast('Passwords do not match.', 'error');
      return;
    }

    if (formData.password.length < 6) {
      addToast('Password must be at least 6 characters long.', 'warning');
      return;
    }

    const res = await register(
      formData.name,
      formData.email,
      formData.phone,
      formData.password,
      formData.confirmPassword
    );

    if (res.success) {
      navigate('/account');
    }
  };

  return (
    <div className="bg-[#000000] min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-md w-full space-y-8 bg-[#111111] border border-studio-border p-8 sm:p-10 rounded-3xl shadow-2xl">
        <div className="text-center">
          <div className="text-xs font-mono text-studio-gold uppercase tracking-widest mb-1">
            Join Rockstar
          </div>
          <h2 className="text-3xl font-black font-display text-white">
            CREATE ACCOUNT
          </h2>
          <p className="mt-2 text-xs text-gray-400">
            Register to save addresses, track orders, and submit verified reviews.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="text-xs text-gray-300 block mb-1 font-medium">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Muhammad Ali"
                className="w-full pl-10 pr-3 py-2.5 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-300 block mb-1 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="ali@example.com"
                className="w-full pl-10 pr-3 py-2.5 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-300 block mb-1 font-medium">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 300 1234567"
                className="w-full pl-10 pr-3 py-2.5 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-300 block mb-1 font-medium">Password (min 6 chars)</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-300 block mb-1 font-medium">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2.5 bg-black border border-studio-border rounded-xl text-xs text-white focus:outline-none focus:border-studio-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-studio-gold hover:bg-studio-goldHover text-black text-xs font-black tracking-wider uppercase rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-studio-gold/15 mt-2 disabled:opacity-50"
          >
            <UserPlus className="w-4 h-4" />
            <span>{loading ? 'Registering...' : 'Complete Registration'}</span>
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-studio-gold hover:underline font-bold">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
