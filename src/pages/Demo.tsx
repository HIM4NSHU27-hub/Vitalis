import React, { useState } from 'react';
import { Gauge } from '../components/Gauge';
import { evaluateFastingGlucose, evaluateBloodPressure } from '../lib/ruleEngine';
import { useI18n } from '../lib/i18n';
import { CheckCircle2, AlertTriangle, AlertOctagon } from 'lucide-react';

export const Demo: React.FC = () => {
  const { lang } = useI18n();

  const scenarios = [
    {
      id: 'controlled',
      name: 'Scenario A: Controlled / Normal',
      badge: 'Healthy Baseline',
      color: 'bg-green-100 text-green-700 border-green-200',
      icon: CheckCircle2,
      fasting: 90,
      systolic: 116,
      diastolic: 75,
      desc: 'Typical healthy patient with well-regulated glucose and arterial pressure.'
    },
    {
      id: 'borderline',
      name: 'Scenario B: Borderline / Prediabetes',
      badge: 'Prediabetes + Pre-HTN',
      color: 'bg-amber-100 text-amber-700 border-amber-200',
      icon: AlertTriangle,
      fasting: 118,
      systolic: 138,
      diastolic: 88,
      desc: 'Impaired fasting glucose and pre-hypertensive pressure creeping up.'
    },
    {
      id: 'critical',
      name: 'Scenario C: Dual Escalation',
      badge: 'Urgent Diabetes & HTN',
      color: 'bg-red-100 text-red-700 border-red-200',
      icon: AlertOctagon,
      fasting: 158,
      systolic: 152,
      diastolic: 96,
      desc: 'Metabolic syndrome: persistent hyperglycemia and Stage 2 hypertension.'
    }
  ];

  const [selected, setSelected] = useState(scenarios[0]);
  const sugarEval = evaluateFastingGlucose(selected.fasting);
  const bpEval = evaluateBloodPressure(selected.systolic, selected.diastolic);

  return (
    <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-display font-extrabold text-ink-light dark:text-ink-dark">
          Evaluation Demo Sandbox
        </h1>
        <p className="text-sm text-slate-500 font-medium">
          Select synthetic patient profiles to test the deterministic rule engine in real-time.
        </p>
      </div>

      {/* 3-Column Scenario Card Selector */}
      <div className="grid grid-cols-3 gap-6">
        {scenarios.map((sc) => {
          const Icon = sc.icon;
          const isSelected = selected.id === sc.id;
          return (
            <div
              key={sc.id}
              onClick={() => setSelected(sc)}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? 'border-tulsi bg-white dark:bg-card-dark shadow-md'
                  : 'border-card-border dark:border-card-borderDark bg-slate-50 dark:bg-slate-800/40 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-6 h-6 ${isSelected ? 'text-tulsi' : 'text-slate-400'}`} />
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${sc.color}`}>
                  {sc.badge}
                </span>
              </div>
              <h3 className="font-display font-bold text-base text-ink-light dark:text-ink-dark mb-1">
                {sc.name}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-medium">
                {sc.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Side-by-Side Dual Gauges for the Active Scenario */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-white dark:bg-card-dark rounded-2xl border border-card-border dark:border-card-borderDark p-8 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display font-bold text-lg text-ink-light dark:text-ink-dark">
              Fasting Blood Sugar
            </h3>
            <span className="text-xs px-2.5 py-1 rounded font-bold uppercase bg-slate-100 dark:bg-slate-800 text-tulsi">
              {sugarEval.status}
            </span>
          </div>
          <Gauge
            value={selected.fasting}
            min={50}
            max={300}
            status={sugarEval.status}
            unit="mg/dL"
            label="Fasting Glucose"
          />
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-300 mt-4">
            <span className="font-bold">Evaluation: </span>
            {sugarEval.ruleText[lang]}
          </div>
        </div>

        <div className="bg-white dark:bg-card-dark rounded-2xl border border-card-border dark:border-card-borderDark p-8 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display font-bold text-lg text-ink-light dark:text-ink-dark">
              Blood Pressure
            </h3>
            <span className="text-xs px-2.5 py-1 rounded font-bold uppercase bg-slate-100 dark:bg-slate-800 text-tulsi">
              {bpEval.status}
            </span>
          </div>
          <Gauge
            value={selected.systolic}
            min={80}
            max={200}
            status={bpEval.status}
            unit={`/${selected.diastolic}`}
            label="Blood Pressure"
          />
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-600 dark:text-slate-300 mt-4">
            <span className="font-bold">Evaluation: </span>
            {bpEval.ruleText[lang]}
          </div>
        </div>
      </div>
    </div>
  );
};