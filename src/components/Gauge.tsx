import React from 'react';
import type { HealthStatus } from '../lib/ruleEngine';

interface GaugeProps {
  value: number;
  min: number;
  max: number;
  status: HealthStatus;
  unit: string;
  label: string;
}

const statusColors: Record<HealthStatus, string> = {
  low: '#2563EB',
  normal: '#16A34A',
  borderline: '#F59E0B',
  high: '#DC2626',
  urgent: '#7F1D1D',
};

export const Gauge: React.FC<GaugeProps> = ({ value, min, max, status, unit, label }) => {
  const clampedVal = Math.min(Math.max(value, min), max);
  const percentage = (clampedVal - min) / (max - min);
  const angle = -90 + percentage * 180;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="relative w-64 h-36 flex items-center justify-center">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 200 110">
          <defs>
            <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="25%" stopColor="#16A34A" />
              <stop offset="55%" stopColor="#F59E0B" />
              <stop offset="85%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </linearGradient>
          </defs>
          <path 
            d="M 20 100 A 80 80 0 0 1 180 100" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="14" 
            strokeLinecap="round" 
            className="text-slate-200 dark:text-slate-800" 
          />
          <path 
            d="M 20 100 A 80 80 0 0 1 180 100" 
            fill="none" 
            stroke="url(#gaugeGrad)" 
            strokeWidth="14" 
            strokeLinecap="round" 
            opacity="0.85" 
          />
          <circle cx="100" cy="100" r="7" className="fill-slate-800 dark:fill-slate-100" />
          <g style={{ transform: `rotate(${angle}deg)`, transformOrigin: '100px 100px', transition: 'transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1)' }}>
            <line 
              x1="100" 
              y1="100" 
              x2="100" 
              y2="28" 
              stroke={statusColors[status]} 
              strokeWidth="4" 
              strokeLinecap="round" 
            />
            <circle cx="100" cy="100" r="3" fill="#FFFFFF" />
          </g>
        </svg>
        <div className="absolute bottom-0 text-center flex flex-col items-center">
          <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            {value} <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 font-sans">{unit}</span>
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
};