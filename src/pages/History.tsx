import React, { useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Trash2 } from 'lucide-react';
import { evaluateFastingGlucose } from '../lib/ruleEngine';
import { useI18n } from '../lib/i18n';

export const History: React.FC = () => {
  const { lang } = useI18n();
  const [metric, setMetric] = useState<'glucose' | 'bp'>('glucose');

  const [records, setRecords] = useState(() => {
    return [
      { id: '1', date: '12 Sep', fastingGlucose: 104, systolic: 124, diastolic: 82 },
      { id: '2', date: '19 Sep', fastingGlucose: 112, systolic: 128, diastolic: 84 },
      { id: '3', date: '26 Sep', fastingGlucose: 122, systolic: 136, diastolic: 88 },
      { id: '4', date: '03 Oct', fastingGlucose: 130, systolic: 142, diastolic: 92 },
      { id: '5', date: '09 Oct', fastingGlucose: 136, systolic: 148, diastolic: 94 },
    ];
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this historical entry?')) {
      setRecords(records.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">
      {/* Header and Toggle Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-ink-light dark:text-ink-dark">
            Longitudinal Health Records
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Historical trend analysis and clinical audit ledger
          </p>
        </div>

        <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 border border-card-border dark:border-card-borderDark text-xs font-semibold">
          <button
            onClick={() => setMetric('glucose')}
            className={`px-4 py-2 rounded-md transition-all ${
              metric === 'glucose'
                ? 'bg-white dark:bg-slate-700 text-tulsi shadow-sm font-bold'
                : 'text-slate-500'
            }`}
          >
            Fasting Blood Sugar
          </button>
          <button
            onClick={() => setMetric('bp')}
            className={`px-4 py-2 rounded-md transition-all ${
              metric === 'bp'
                ? 'bg-white dark:bg-slate-700 text-tulsi shadow-sm font-bold'
                : 'text-slate-500'
            }`}
          >
            Blood Pressure
          </button>
        </div>
      </div>

      {/* Recharts Analytics Panel */}
      <div className="bg-white dark:bg-card-dark rounded-2xl border border-card-border dark:border-card-borderDark p-8 shadow-sm">
        <h3 className="font-display font-bold text-lg text-ink-light dark:text-ink-dark mb-6">
          {metric === 'glucose'
            ? 'Fasting Blood Sugar Trajectory (mg/dL)'
            : 'Systolic & Diastolic BP Trajectory (mmHg)'}
        </h3>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={records}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={metric === 'glucose' ? [60, 200] : [60, 180]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  borderColor: '#D6DDE0',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                }}
              />
              {metric === 'glucose' ? (
                <Line
                  type="monotone"
                  dataKey="fastingGlucose"
                  name="Fasting Glucose"
                  stroke="#0B7A6B"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#0B7A6B' }}
                />
              ) : (
                <>
                  <Line
                    type="monotone"
                    dataKey="systolic"
                    name="Systolic"
                    stroke="#DC2626"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#DC2626' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="diastolic"
                    name="Diastolic"
                    stroke="#2563EB"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#2563EB' }}
                  />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Historical Ledger Table */}
      <div className="bg-white dark:bg-card-dark rounded-2xl border border-card-border dark:border-card-borderDark overflow-hidden shadow-sm">
        <div className="p-6 border-b border-card-border dark:border-card-borderDark flex items-center justify-between">
          <h3 className="font-display font-bold text-lg text-ink-light dark:text-ink-dark">
            Clinical History Ledger
          </h3>
          <span className="text-xs text-slate-500 font-medium">Sorted: Newest to Oldest</span>
        </div>

        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-xs uppercase font-bold border-b border-card-border dark:border-card-borderDark">
            <tr>
              <th className="py-4 px-6">Date</th>
              <th className="py-4 px-6">Fasting Glucose</th>
              <th className="py-4 px-6">Blood Pressure</th>
              <th className="py-4 px-6">Rationale</th>
              <th className="py-4 px-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-card-border dark:divide-card-borderDark text-ink-light dark:text-ink-dark">
            {records.map((r) => {
              const sugarEval = evaluateFastingGlucose(r.fastingGlucose);
              return (
                <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="py-4 px-6 font-semibold">{r.date}</td>
                  <td className="py-4 px-6 font-bold">{r.fastingGlucose} mg/dL</td>
                  <td className="py-4 px-6 font-bold">{r.systolic}/{r.diastolic} mmHg</td>
                  <td className="py-4 px-6 text-xs text-slate-500 max-w-xs">{sugarEval.ruleText[lang]}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};