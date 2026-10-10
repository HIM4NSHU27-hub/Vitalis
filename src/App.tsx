import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { I18nProvider, useI18n } from './lib/i18n';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { Demo } from './pages/Demo';
import { Dashboard } from './pages/Dashboard';
import { AddReading } from './pages/AddReading';
import { History } from './pages/History';
import { Login } from './pages/Login';
import { Settings } from './pages/Settings';

export const AppContent: React.FC = () => {
  const { t } = useI18n();

  // Persistent user session for client-side demo
  const [user, setUser] = useState<{ email: string } | null>(() => {
    const saved = localStorage.getItem('vitalis_demo_session');
    return saved ? JSON.parse(saved) : { email: 'demo.patient@vitalis.in' };
  });

  const handleLogout = () => {
    localStorage.removeItem('vitalis_demo_session');
    setUser(null);
  };

  const handleLogin = (email: string) => {
    const session = { email };
    localStorage.setItem('vitalis_demo_session', JSON.stringify(session));
    setUser(session);
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper-light dark:bg-paper-dark text-ink-light dark:text-ink-dark transition-colors duration-200">
      <Header isAuthenticated={!!user} onLogout={handleLogout} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/signup" 
            element={<Login onLogin={handleLogin} isSignup />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/add" 
            element={user ? <AddReading /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/history" 
            element={user ? <History /> : <Navigate to="/login" replace />} 
          />
          <Route 
            path="/settings" 
            element={user ? <Settings userEmail={user.email} onLogout={handleLogout} /> : <Navigate to="/login" replace />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Mandatory Medical Disclaimer Footer */}
      <footer className="w-full border-t border-card-border dark:border-card-borderDark py-6 bg-white dark:bg-[#0A1A20] text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-medium text-slate-600 dark:text-slate-400">
            {t('disclaimer')}[cite: 1]
          </p>
          <p className="text-slate-400">
            Aligned with ICMR-INDIAB Clinical Cutoffs & India DPDP Act 2023[cite: 1].
          </p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <I18nProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </I18nProvider>
  );
}