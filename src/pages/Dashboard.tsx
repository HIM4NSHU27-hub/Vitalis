import React, { useState } from 'react';
import { 
  Activity, Pill, ShieldCheck, 
  UploadCloud, Sparkles, TrendingUp, Stethoscope, 
  Clock, Info, X, FileCheck
} from 'lucide-react';
import { Gauge } from '../components/Gauge';
import { 
  evaluateFastingGlucose, 
  evaluateBloodPressure, 
  evaluateHbA1c,
  type HealthStatus 
} from '../lib/ruleEngine';
import { useI18n } from '../lib/i18n';

interface PrescriptionItem {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  timing: string;
  indication: string;
}

export const Dashboard: React.FC = () => {
  const { lang } = useI18n();

  // Clinical metrics state
  const [fastingVal, setFastingVal] = useState<number>(142);
  const [ppbsVal, setPpbsVal] = useState<number>(210);
  const [hba1cVal, setHba1cVal] = useState<number>(7.4);
  const [systolicVal, setSystolicVal] = useState<number>(146);
  const [diastolicVal, setDiastolicVal] = useState<number>(92);
  
  // Modal & Scan state
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'rx' | 'lab'>('lab');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [scanStep, setScanStep] = useState<string>('');
  const [extractedPreview, setExtractedPreview] = useState<Record<string, string> | null>(null);

  // Active Prescriptions list
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>([
    {
      id: 'rx-1',
      name: 'Metformin Hydrochloride (SR)',
      dosage: '500 mg',
      frequency: 'Twice daily (BD)',
      timing: 'With morning & night meals',
      indication: 'Glycemic Regulation (Type 2 Diabetes)'
    },
    {
      id: 'rx-2',
      name: 'Telmisartan Tablets IP',
      dosage: '40 mg',
      frequency: 'Once daily (OD)',
      timing: 'Morning after breakfast',
      indication: 'Essential Hypertension (Stage 1/2)'
    }
  ]);

  // Evaluations via Rule Engine
  const fastingEval = evaluateFastingGlucose(fastingVal);
  const bpEval = evaluateBloodPressure(systolicVal, diastolicVal);
  const hba1cEval = evaluateHbA1c(hba1cVal);

  const triggerScanSimulation = (type: 'rx' | 'lab') => {
    setIsProcessing(true);
    setExtractedPreview(null);
    setScanStep('Loading image into ephemeral memory buffer (DPDP Act 2023)...');

    setTimeout(() => {
      setScanStep(type === 'lab' ? 'Identifying lab layout & biological markers...' : 'Cross-referencing handwriting against NLEM drug database...');
    }, 800);

    setTimeout(() => {
      setScanStep('Running optical character recognition & value normalization...');
      if (type === 'lab') {
        setExtractedPreview({
          'Fasting Blood Sugar': '164 mg/dL (High)',
          'Postprandial (PPBS)': '235 mg/dL (High)',
          'Glycated Hemoglobin (HbA1c)': '7.9 % (Action Required)',
          'Blood Pressure (Sys/Dia)': '154 / 96 mmHg (Stage 2 HTN)'
        });
      } else {
        setExtractedPreview({
          'Extracted Drug': 'Amlodipine Besylate',
          'Strength': '5 mg',
          'Regimen': 'Once Daily (OD) - Bedtime',
          'Clinical Indication': 'Essential Hypertension Arterial Control'
        });
      }
    }, 1800);

    setTimeout(() => {
      setIsProcessing(false);
      setScanStep('');
    }, 2400);
  };

  const applyExtractedData = () => {
    if (activeTab === 'lab') {
      setFastingVal(164);
      setPpbsVal(235);
      setHba1cVal(7.9);
      setSystolicVal(154);
      setDiastolicVal(96);
    } else {
      setPrescriptions(prev => [
        ...prev,
        {
          id: `rx-${Date.now()}`,
          name: 'Amlodipine Besylate',
          dosage: '5 mg',
          frequency: 'Once daily (OD)',
          timing: 'Night before bedtime',
          indication: 'Arterial Vasodilation (Blood Pressure Control)'
        }
      ]);
    }
    setModalOpen(false);
    setExtractedPreview(null);
  };

  const statusBadge = (status: HealthStatus) => {
    const colors: Record<HealthStatus, string> = {
      low: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-300',
      normal: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300',
      borderline: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300',
      high: 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-300',
      urgent: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 animate-pulse'
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border ${colors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-10 space-y-10">
      
      {/* Top Clinical Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1 text-teal-700 dark:text-teal-400 font-bold text-xs uppercase tracking-wider">
            <Activity className="w-4 h-4" /> Comprehensive Chronic Disease Management
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Clinical Health Workspace
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Deterministic evaluations aligned with ICMR-INDIAB and RSSDI guidelines.
          </p>
        </div>

        {/* Prescription & Lab Scan Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setActiveTab('rx'); setModalOpen(true); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Pill className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Scan Prescription</span>
          </button>
          
          <button
            onClick={() => { setActiveTab('lab'); setModalOpen(true); }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-sm font-bold shadow-md transition-all cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Scan Lab Report (OCR)</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: 4 Key Clinical Vitals Matrix */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            Active Cardiometabolic Metrics
          </h2>
          <span className="text-xs text-slate-500 font-medium">Auto-calibrated against clinical ranges</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fasting Glucose</span>
              {statusBadge(fastingEval.status)}
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {fastingVal} <span className="text-sm font-medium text-slate-400">mg/dL</span>
            </div>
            <p className="text-xs text-slate-500">Target Range: 70 – 99 mg/dL</p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
              {fastingEval.ruleText[lang]}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Postprandial (PPBS)</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-300">
                High
              </span>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {ppbsVal} <span className="text-sm font-medium text-slate-400">mg/dL</span>
            </div>
            <p className="text-xs text-slate-500">Target Range: &lt; 140 mg/dL</p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
              Post-prandial glycemic surge detected. Indicates delayed insulin sensitivity response.
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Glycated Hb (HbA1c)</span>
              {statusBadge(hba1cEval.status)}
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {hba1cVal} <span className="text-sm font-medium text-slate-400">%</span>
            </div>
            <p className="text-xs text-slate-500">Clinical Target: &lt; 6.5% - 7.0%</p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
              {hba1cEval.ruleText[lang]}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Arterial Pressure</span>
              {statusBadge(bpEval.status)}
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white">
              {systolicVal}/{diastolicVal} <span className="text-sm font-medium text-slate-400">mmHg</span>
            </div>
            <p className="text-xs text-slate-500">Target Range: &lt; 120/80 mmHg</p>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300">
              {bpEval.ruleText[lang]}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Real-Time Needle Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Fasting Sugar needle dial</h3>
              <p className="text-xs text-slate-500">Dynamic arc trajectory</p>
            </div>
            {statusBadge(fastingEval.status)}
          </div>
          <Gauge 
            value={fastingVal} 
            min={50} 
            max={300} 
            status={fastingEval.status} 
            unit="mg/dL" 
            label="Fasting Blood Glucose" 
          />
        </div>

        <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Systolic/Diastolic Dial</h3>
              <p className="text-xs text-slate-500">Vascular resistance arc</p>
            </div>
            {statusBadge(bpEval.status)}
          </div>
          <Gauge 
            value={systolicVal} 
            min={80} 
            max={200} 
            status={bpEval.status} 
            unit={`/${diastolicVal}`} 
            label="Blood Pressure" 
          />
        </div>
      </div>

      {/* SECTION 3: Active Prescriptions & Drug Schedules */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-950 flex items-center justify-center text-teal-700 dark:text-teal-400">
              <Pill className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Active Medication Schedules
              </h3>
              <p className="text-xs text-slate-500">Extracted from prescriptions & clinical records</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
            {prescriptions.length} Active Prescriptions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {prescriptions.map((rx) => (
            <div 
              key={rx.id} 
              className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">{rx.name}</h4>
                  <span className="text-xs font-semibold text-teal-700 dark:text-teal-400">{rx.indication}</span>
                </div>
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300">
                  {rx.dosage}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{rx.frequency}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  <span>{rx.timing}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 4: Doctor Visit Consultation Brief */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 shadow-md space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Doctor Visit Consultation Brief</h3>
              <p className="text-xs text-slate-400">Structured talking points generated for your next clinical visit</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" /> Aligned with DPDP Act 2023 (No Raw Data Retained)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="text-sm font-bold text-teal-300">1. Clinical Overview</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fasting sugar is elevated at {fastingVal} mg/dL and HbA1c is {hba1cVal}%. Systolic BP shows Stage 1/2 elevation at {systolicVal} mmHg despite active Telmisartan therapy.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="text-sm font-bold text-teal-300">2. Specific Questions to Ask Doctor</h4>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
              <li>Should Metformin dosage be uptitrated to 1000 mg?</li>
              <li>Is adding a calcium channel blocker (Amlodipine) warranted for systolic control?</li>
              <li>Should we schedule a serum creatinine / microalbuminuria test?</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
            <h4 className="text-sm font-bold text-teal-300">3. Non-Pharmacological Advisory</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Maintain dietary sodium restriction under 2 grams/day. Continue post-prandial 15-minute walks to mitigate post-lunch glucose excursions.
            </p>
          </div>
        </div>
      </div>

      {/* OCR SCANNER MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {activeTab === 'lab' ? 'Laboratory Report OCR Ingestion' : 'Prescription Handwritten Scanner'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Ephemeral in-memory optical character recognition pipeline
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Tab selector */}
              <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-sm font-bold">
                <button
                  onClick={() => { setActiveTab('lab'); setExtractedPreview(null); }}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${activeTab === 'lab' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm' : 'text-slate-500'}`}
                >
                  Lab Report Panel
                </button>
                <button
                  onClick={() => { setActiveTab('rx'); setExtractedPreview(null); }}
                  className={`py-2 rounded-lg transition-all cursor-pointer ${activeTab === 'rx' ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm' : 'text-slate-500'}`}
                >
                  Doctor Prescription (Rx)
                </button>
              </div>

              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-8 text-center space-y-3 bg-slate-50/50 dark:bg-slate-800/20">
                <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 mx-auto flex items-center justify-center">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    Drop document file or click to load clinical sample
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Supports PNG, JPG, PDF scans up to 10MB
                  </p>
                </div>

                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => triggerScanSimulation(activeTab)}
                    disabled={isProcessing}
                    className="px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Run Simulated Optical Scan</span>
                  </button>
                </div>
              </div>

              {/* Progress State */}
              {isProcessing && (
                <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-teal-600 animate-spin" />
                  <p className="text-xs font-semibold text-teal-900 dark:text-teal-200">
                    {scanStep}
                  </p>
                </div>
              )}

              {/* Extracted Preview Panel */}
              {extractedPreview && (
                <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4" /> Extracted Parsed Key-Values
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">Confidence Score: 98.4%</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(extractedPreview).map(([key, val]) => (
                      <div key={key} className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                        <span className="text-slate-500 block text-[11px] font-medium">{key}</span>
                        <span className="text-slate-900 dark:text-white font-bold">{val}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={applyExtractedData}
                    className="w-full mt-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
                  >
                    Apply & Update Clinical Engine Metrics
                  </button>
                </div>
              )}

              {/* Compliance Assurance */}
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium justify-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Zero File Retention: Processed in browser memory. Discarded upon completion.</span>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};