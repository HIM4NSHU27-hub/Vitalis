import React, { useState } from 'react';
import { useI18n, type Language } from '../lib/i18n';
import { Trash2, Globe } from 'lucide-react';

export const Settings: React.FC<{ userEmail: string; onLogout: () => void }> = ({ onLogout }) => {
  const { lang, setLang } = useI18n();
  const [deleteInput, setDeleteInput] = useState('');

  const handleDeleteAll = () => {
    if (deleteInput === 'DELETE') {
      localStorage.removeItem('vitalis_readings');
      localStorage.removeItem('vitalis_demo_session');
      alert('All local health data wiped in accordance with DPDP Act 2023.');
      onLogout();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-10 space-y-8">
      <h1 className="text-3xl font-display font-extrabold text-ink-light dark:text-ink-dark">
        Account & Clinical Settings
      </h1>

      <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-card-border dark:border-card-borderDark space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-tulsi" />
          <h3 className="font-bold text-base text-ink-light dark:text-ink-dark">Language Preference</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {(['en', 'hi', 'mr'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                lang === l
                  ? 'border-tulsi bg-tulsi-light dark:bg-tulsi/20 text-tulsi font-bold'
                  : 'border-card-border dark:border-card-borderDark text-slate-600 dark:text-slate-300'
              }`}
            >
              {l === 'en' ? 'English' : l === 'hi' ? 'हिन्दी (Hindi)' : 'मराठी (Marathi)'}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-card-dark p-6 rounded-2xl border border-red-200 dark:border-red-950/60 space-y-4">
        <div className="flex items-center gap-2 text-red-600">
          <Trash2 className="w-5 h-5" />
          <h3 className="font-bold text-base">Data Erasure (DPDP Act 2023)</h3>
        </div>
        <p className="text-xs text-slate-500">
          To wipe all local measurements and reset your session, type <span className="font-bold text-red-600">DELETE</span> below.
        </p>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Type DELETE"
            value={deleteInput}
            onChange={(e) => setDeleteInput(e.target.value)}
            className="px-4 py-2 border border-card-border dark:border-card-borderDark rounded-lg text-sm bg-slate-50 dark:bg-slate-800 text-ink-light dark:text-ink-dark"
          />
          <button
            onClick={handleDeleteAll}
            disabled={deleteInput !== 'DELETE'}
            className="px-6 py-2 rounded-lg bg-red-600 disabled:opacity-40 text-white font-bold text-sm transition-all"
          >
            Erase Everything
          </button>
        </div>
      </div>
    </div>
  );
};