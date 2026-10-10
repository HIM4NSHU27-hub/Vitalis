import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, UploadCloud, CheckCircle2 } from 'lucide-react';

export const AddReading: React.FC = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [fasting, setFasting] = useState<string>('');
  const [systolic, setSystolic] = useState<string>('');
  const [diastolic, setDiastolic] = useState<string>('');
  const [isSimulatingUpload, setIsSimulatingUpload] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem('vitalis_readings') || '[]');
    const newEntry = {
      id: Math.random().toString(36).substring(2, 9),
      date,
      fastingGlucose: fasting ? Number(fasting) : undefined,
      systolic: systolic ? Number(systolic) : undefined,
      diastolic: diastolic ? Number(diastolic) : undefined,
    };
    localStorage.setItem('vitalis_readings', JSON.stringify([newEntry, ...existing]));
    navigate('/dashboard');
  };

  const simulateLabExtract = () => {
    setIsSimulatingUpload(true);
    setTimeout(() => {
      setFasting('138');
      setSystolic('142');
      setDiastolic('92');
      setIsSimulatingUpload(false);
      setUploadSuccess(true);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-10">
      <button 
        onClick={() => navigate('/dashboard')} 
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-tulsi mb-4 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
      </button>
      <h1 className="text-3xl font-display font-extrabold text-ink-light dark:text-ink-dark mb-8">
        Log Metabolic Readings
      </h1>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column: Manual Entry Form */}
        <div className="col-span-12 lg:col-span-7 bg-white dark:bg-card-dark p-8 rounded-2xl border border-card-border dark:border-card-borderDark shadow-sm">
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Reading Date
              </label>
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                className="w-full px-4 py-2.5 rounded-lg border border-card-border dark:border-card-borderDark bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-ink-light dark:text-ink-dark" 
                required 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Fasting Glucose (mg/dL)
              </label>
              <input 
                type="number" 
                placeholder="e.g. 95" 
                value={fasting} 
                onChange={(e) => setFasting(e.target.value)} 
                className="w-full px-4 py-3 rounded-lg border border-card-border dark:border-card-borderDark bg-slate-50 dark:bg-slate-800 text-base font-bold text-ink-light dark:text-ink-dark" 
                required 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Systolic BP (mmHg)
                </label>
                <input 
                  type="number" 
                  placeholder="e.g. 120" 
                  value={systolic} 
                  onChange={(e) => setSystolic(e.target.value)} 
                  className="w-full px-4 py-3 rounded-lg border border-card-border dark:border-card-borderDark bg-slate-50 dark:bg-slate-800 text-base font-bold text-ink-light dark:text-ink-dark" 
                  required 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                  Diastolic BP (mmHg)
                </label>
                <input 
                  type="number" 
                  placeholder="e.g. 80" 
                  value={diastolic} 
                  onChange={(e) => setDiastolic(e.target.value)} 
                  className="w-full px-4 py-3 rounded-lg border border-card-border dark:border-card-borderDark bg-slate-50 dark:bg-slate-800 text-base font-bold text-ink-light dark:text-ink-dark" 
                  required 
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="w-full py-4 rounded-xl bg-tulsi hover:bg-tulsi-hover text-white font-bold text-base shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <Save className="w-5 h-5" /> Save Reading to Profile
            </button>
          </form>
        </div>

        {/* Right Column: In-Memory Document Scanner */}
        <div className="col-span-12 lg:col-span-5 bg-white dark:bg-card-dark p-8 rounded-2xl border border-card-border dark:border-card-borderDark shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-display font-bold text-ink-light dark:text-ink-dark mb-1">
              AI Lab Report Extraction
            </h3>
            <p className="text-xs text-slate-500 mb-6 font-medium">
              Upload PDF or image reports. Files are analyzed in RAM and never stored.
            </p>
            <div 
              onClick={simulateLabExtract} 
              className="border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-tulsi rounded-xl p-8 text-center cursor-pointer bg-slate-50/50 dark:bg-slate-800/30 transition-all"
            >
              <UploadCloud className="w-12 h-12 text-tulsi mx-auto mb-3" />
              <p className="text-sm font-bold text-ink-light dark:text-ink-dark">
                {isSimulatingUpload ? "Analyzing with Gemini Flash..." : "Click to simulate report scan"}
              </p>
              <p className="text-xs text-slate-400 mt-1">PDF, PNG, JPG (up to 3MB)</p>
            </div>
            {uploadSuccess && (
              <div className="mt-4 p-4 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-green-800 dark:text-green-300 font-bold">
                  Values extracted! Review the form on the left and click Save.
                </p>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-6">
            Aligned with India DPDP Act 2023 zero-retention standards.
          </p>
        </div>
      </div>
    </div>
  );
};