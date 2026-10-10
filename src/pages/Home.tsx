import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Gauge } from '../components/Gauge';
import { evaluateFastingGlucose, evaluateBloodPressure, type HealthStatus } from '../lib/ruleEngine';
import { useI18n } from '../lib/i18n';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useI18n();

  const [activeTab, setActiveTab] = useState<'sugar' | 'bp'>('sugar');
  const [glucoseVal, setGlucoseVal] = useState<number>(112);
  const [systolicVal, setSystolicVal] = useState<number>(134);
  const [diastolicVal, setDiastolicVal] = useState<number>(86);

  const glucoseEval = evaluateFastingGlucose(glucoseVal);
  const bpEval = evaluateBloodPressure(systolicVal, diastolicVal);

  const statusBadgeColors: Record<HealthStatus, string> = {
    low: 'bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 border-blue-200',
    normal: 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-400 border-green-200',
    borderline: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200',
    high: 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 border-red-200',
    urgent: 'bg-red-900 text-white dark:bg-red-950 border-red-900',
  };

  return (
    <div className="w-full">
      {/* 2-Column Desktop Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid grid-cols-12 gap-12 items-center">
          
          {/* Left Column (58% desktop width) */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-tulsi-light dark:bg-tulsi/20 border border-tulsi/30 text-tulsi text-xs font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4" />
              ICMR & RSSDI Guidelines Aligned
            </div>

            <h1 className="text-5xl xl:text-6xl font-display font-extrabold text-ink-light dark:text-ink-dark leading-[1.12] tracking-tight">
              Track. Understand. <br />
              <span className="text-tulsi">Talk to your doctor.</span>
            </h1>

            <p className="text-lg xl:text-xl text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed">
              Your blood sugar and blood pressure readings evaluated by a deterministic clinical rule engine, with plain-language explanations in English, हिन्दी, or मराठी.
            </p>

            {/* Desktop Action Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => navigate('/signup')}
                className="px-8 py-4 rounded-xl bg-tulsi hover:bg-tulsi-hover text-white font-bold text-base shadow-lg shadow-tulsi/20 transition-all flex items-center gap-2"
              >
                Create Free Account
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => navigate('/demo')}
                className="px-7 py-4 rounded-xl border border-card-border dark:border-card-borderDark hover:bg-white dark:hover:bg-slate-800 text-ink-light dark:text-ink-dark font-semibold text-base transition-all"
              >
                Try Live Interactive Demo
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-card-border dark:border-card-borderDark text-sm text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-tulsi flex-shrink-0" />
                <span>Zero Report Retention</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-tulsi flex-shrink-0" />
                <span>Deterministic Rules</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-tulsi flex-shrink-0" />
                <span>DPDP Act 2023 Aligned</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Clinical Sandbox Card (42% desktop width) */}
          <div className="col-span-12 lg:col-span-5">
            <div className="bg-white dark:bg-card-dark rounded-2xl border border-card-border dark:border-card-borderDark shadow-xl p-8 space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-lg text-ink-light dark:text-ink-dark">
                    Live Clinical Checker
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Instant calculation · Nothing is saved</p>
                </div>
                {/* Mode Selector */}
                <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1 border border-card-border dark:border-card-borderDark text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('sugar')}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      activeTab === 'sugar' ? 'bg-white dark:bg-slate-700 text-tulsi shadow-sm font-bold' : 'text-slate-500'
                    }`}
                  >
                    Fasting Sugar
                  </button>
                  <button
                    onClick={() => setActiveTab('bp')}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      activeTab === 'bp' ? 'bg-white dark:bg-slate-700 text-tulsi shadow-sm font-bold' : 'text-slate-500'
                    }`}
                  >
                    Blood Pressure
                  </button>
                </div>
              </div>

              {/* Interactive Sandbox Form */}
              {activeTab === 'sugar' ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Fasting Glucose Level
                    </label>
                    <span className="text-xl font-bold font-display text-tulsi">
                      {glucoseVal} <span className="text-xs text-slate-500 font-sans">mg/dL</span>
                    </span>
                  </div>

                  <input
                    type="range"
                    min="50"
                    max="320"
                    value={glucoseVal}
                    onChange={(e) => setGlucoseVal(Number(e.target.value))}
                    className="w-full accent-tulsi cursor-pointer"
                  />

                  {/* SVG Gauge Display */}
                  <Gauge
                    value={glucoseVal}
                    min={50}
                    max={320}
                    status={glucoseEval.status}
                    unit="mg/dL"
                    label="Fasting Glucose"
                  />

                  {/* Status Banner & Guideline Text */}
                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2.5 py-1 rounded-md font-bold uppercase border ${statusBadgeColors[glucoseEval.status]}`}>
                        {glucoseEval.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {glucoseEval.ruleText[lang]}
                    </p>
                  </div>

                  {/* Quick-Fill Preset Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-xs text-slate-400 font-medium">Presets:</span>
                    <button
                      onClick={() => setGlucoseVal(85)}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
                    >
                      Healthy (85)
                    </button>
                    <button
                      onClick={() => setGlucoseVal(115)}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
                    >
                      Prediabetes (115)
                    </button>
                    <button
                      onClick={() => setGlucoseVal(165)}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
                    >
                      High (165)
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        <span>Systolic</span>
                        <span className="text-tulsi font-bold">{systolicVal} mmHg</span>
                      </div>
                      <input
                        type="range"
                        min="80"
                        max="200"
                        value={systolicVal}
                        onChange={(e) => setSystolicVal(Number(e.target.value))}
                        className="w-full accent-tulsi cursor-pointer"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                        <span>Diastolic</span>
                        <span className="text-tulsi font-bold">{diastolicVal} mmHg</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="130"
                        value={diastolicVal}
                        onChange={(e) => setDiastolicVal(Number(e.target.value))}
                        className="w-full accent-tulsi cursor-pointer"
                      />
                    </div>
                  </div>

                  <Gauge
                    value={systolicVal}
                    min={80}
                    max={200}
                    status={bpEval.status}
                    unit={`/${diastolicVal}`}
                    label="Blood Pressure"
                  />

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs px-2.5 py-1 rounded-md font-bold uppercase border ${statusBadgeColors[bpEval.status]}`}>
                        {bpEval.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                      {bpEval.ruleText[lang]}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <span className="text-xs text-slate-400 font-medium">Presets:</span>
                    <button
                      onClick={() => { setSystolicVal(115); setDiastolicVal(75); }}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
                    >
                      Optimal (115/75)
                    </button>
                    <button
                      onClick={() => { setSystolicVal(132); setDiastolicVal(84); }}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
                    >
                      Pre-HTN (132/84)
                    </button>
                    <button
                      onClick={() => { setSystolicVal(155); setDiastolicVal(95); }}
                      className="px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-semibold transition-colors"
                    >
                      Stage 2 (155/95)
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* Full-Width Key Clinical Stats Banner */}
      <section className="w-full bg-slate-100 dark:bg-slate-900/60 border-y border-card-border dark:border-card-borderDark py-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-4 gap-8">
            <div className="space-y-1">
              <div className="text-4xl font-extrabold font-display text-tulsi">101 Million</div>
              <p className="text-sm font-semibold text-ink-light dark:text-ink-dark">Diagnosed Diabetes in India</p>
              <p className="text-xs text-slate-500">ICMR-INDIAB study, Lancet</p>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-extrabold font-display text-tulsi">315 Million</div>
              <p className="text-sm font-semibold text-ink-light dark:text-ink-dark">Living with Hypertension</p>
              <p className="text-xs text-slate-500">National clinical surveillance</p>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-extrabold font-display text-tulsi">&lt; 7.0%</div>
              <p className="text-sm font-semibold text-ink-light dark:text-ink-dark">Combined Target Control</p>
              <p className="text-xs text-slate-500">Achieving Sugar + BP targets</p>
            </div>
            <div className="space-y-1">
              <div className="text-4xl font-extrabold font-display text-tulsi">100% Deterministic</div>
              <p className="text-sm font-semibold text-ink-light dark:text-ink-dark">Rule-Based Cutoff Logic</p>
              <p className="text-xs text-slate-500">Zero AI hallucination in flagging</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Column How It Works Section */}
      <section className="max-w-7xl mx-auto px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-display font-bold text-ink-light dark:text-ink-dark">
            How Vitalis Works
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2 font-medium">
            Designed for patients and families managing diabetes and hypertension care.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white dark:bg-card-dark p-8 rounded-2xl border border-card-border dark:border-card-borderDark space-y-4">
            <div className="w-12 h-12 rounded-xl bg-tulsi-light dark:bg-tulsi/20 text-tulsi flex items-center justify-center font-display font-extrabold text-xl">
              1
            </div>
            <h3 className="font-display font-bold text-lg text-ink-light dark:text-ink-dark">
              Record or Upload Reports
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Enter numbers manually or upload PDF/photo lab reports. Files are parsed in-memory and deleted immediately.
            </p>
          </div>

          <div className="bg-white dark:bg-card-dark p-8 rounded-2xl border border-card-border dark:border-card-borderDark space-y-4">
            <div className="w-12 h-12 rounded-xl bg-tulsi-light dark:bg-tulsi/20 text-tulsi flex items-center justify-center font-display font-extrabold text-xl">
              2
            </div>
            <h3 className="font-display font-bold text-lg text-ink-light dark:text-ink-dark">
              Deterministic Classification
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Every value is evaluated against standardized clinical rules (ADA & ICMR) without unpredictable AI guesswork.
            </p>
          </div>

          <div className="bg-white dark:bg-card-dark p-8 rounded-2xl border border-card-border dark:border-card-borderDark space-y-4">
            <div className="w-12 h-12 rounded-xl bg-tulsi-light dark:bg-tulsi/20 text-tulsi flex items-center justify-center font-display font-extrabold text-xl">
              3
            </div>
            <h3 className="font-display font-bold text-lg text-ink-light dark:text-ink-dark">
              Doctor Consultation Prep
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Receive structured questions to ask your doctor, translated into English, हिन्दी, or मराठी.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};