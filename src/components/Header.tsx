import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Activity, Sun, Moon, Globe, LogOut } from 'lucide-react';
import { useI18n } from '../lib/i18n';

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isAuthenticated = false, onLogout }) => {
  const { lang, setLang, t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(() => localStorage.getItem('vitalis_theme') === 'dark');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('vitalis_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('vitalis_theme', 'light');
    }
  }, [isDark]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-700 dark:bg-teal-600 flex items-center justify-center text-white shadow-sm">
            <Activity className="w-6 h-6 stroke-[2.2]" />
          </div>
          <div>
            <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-slate-50">
              {t('appName')}
            </span>
            <span className="hidden lg:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
              Clinical Rules Engine
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm font-semibold transition-colors hover:text-teal-600 dark:hover:text-teal-400 ${
              location.pathname === '/' ? 'text-teal-700 dark:text-teal-400' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {t('navHome')}
          </Link>
          <Link 
            to="/demo" 
            className={`text-sm font-semibold transition-colors hover:text-teal-600 dark:hover:text-teal-400 ${
              location.pathname === '/demo' ? 'text-teal-700 dark:text-teal-400' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            {t('navDemo')}
          </Link>
          {isAuthenticated && (
            <>
              <Link 
                to="/dashboard" 
                className={`text-sm font-semibold transition-colors hover:text-teal-600 dark:hover:text-teal-400 ${
                  location.pathname === '/dashboard' ? 'text-teal-700 dark:text-teal-400' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {t('navDashboard')}
              </Link>
              <Link 
                to="/history" 
                className={`text-sm font-semibold transition-colors hover:text-teal-600 dark:hover:text-teal-400 ${
                  location.pathname === '/history' ? 'text-teal-700 dark:text-teal-400' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {t('navHistory')}
              </Link>
              <Link 
                to="/settings" 
                className={`text-sm font-semibold transition-colors hover:text-teal-600 dark:hover:text-teal-400 ${
                  location.pathname === '/settings' ? 'text-teal-700 dark:text-teal-400' : 'text-slate-600 dark:text-slate-300'
                }`}
              >
                {t('navSettings')}
              </Link>
            </>
          )}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700 text-xs font-medium">
            <Globe className="w-3.5 h-3.5 mx-1.5 text-slate-500 dark:text-slate-400" />
            <button 
              onClick={() => setLang('en')} 
              className={`px-2 py-1 rounded transition-colors ${lang === 'en' ? 'bg-white dark:bg-slate-700 font-bold text-teal-700 dark:text-teal-300 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('hi')} 
              className={`px-2 py-1 rounded transition-colors ${lang === 'hi' ? 'bg-white dark:bg-slate-700 font-bold text-teal-700 dark:text-teal-300 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            >
              हिन्दी
            </button>
            <button 
              onClick={() => setLang('mr')} 
              className={`px-2 py-1 rounded transition-colors ${lang === 'mr' ? 'bg-white dark:bg-slate-700 font-bold text-teal-700 dark:text-teal-300 shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}
            >
              मराठी
            </button>
          </div>

          {/* Theme Toggle */}
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Auth Button */}
          {isAuthenticated ? (
            <button 
              onClick={onLogout} 
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 text-sm font-semibold hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('logout')}</span>
            </button>
          ) : (
            <button 
              onClick={() => navigate('/login')} 
              className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white shadow-sm transition-all"
            >
              {t('login')}
            </button>
          )}
        </div>

      </div>
    </header>
  );
};