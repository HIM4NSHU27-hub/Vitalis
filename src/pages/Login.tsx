import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldCheck } from 'lucide-react';

export const Login: React.FC<{ onLogin: (email: string) => void; isSignup?: boolean }> = ({ onLogin, isSignup }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('demo.patient@vitalis.in');
  const [password, setPassword] = useState('password123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onLogin(email);
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] grid grid-cols-12 bg-white dark:bg-[#0A1A20] transition-colors duration-200">
      
      {/* Left Column: Brand Showcase */}
      <div className="col-span-12 lg:col-span-6 bg-[#061014] text-white p-12 lg:p-16 flex flex-col justify-between border-r border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#0B7A6B] flex items-center justify-center">
            <Activity className="w-6 h-6 stroke-[2.2] text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white">Vitalis</span>
        </div>

        <div className="space-y-4 my-12">
          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight text-white">
            Metabolic tracking, <br />grounded in clinical guidelines.
          </h2>
          <p className="text-slate-300 text-base max-w-md font-normal leading-relaxed">
            Deterministic rule engines for blood glucose and hypertension. Aligned with ICMR-INDIAB clinical cutoffs.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
          <ShieldCheck className="w-4 h-4 text-[#14B8A6]" /> India DPDP Act 2023 Compliant · Zero Lab Retention
        </div>
      </div>

      {/* Right Column: High-Contrast Auth Form */}
      <div className="col-span-12 lg:col-span-6 bg-slate-50 dark:bg-[#0D1E25] p-12 lg:p-16 flex items-center justify-center transition-colors duration-200">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {isSignup ? 'Create Account' : 'Sign in to Vitalis'}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 font-medium">
              Click sign in below to enter with the pre-filled demo account.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-[#162C36] text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#0B7A6B]"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-[#162C36] text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[#0B7A6B]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-[#0B7A6B] hover:bg-[#086357] text-white font-bold text-base shadow-md transition-all cursor-pointer block text-center"
          >
            {isSignup ? 'Create Account & Continue' : 'Sign In'}
          </button>

        </form>
      </div>

    </div>
  );
};