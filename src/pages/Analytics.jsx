import React, { useState } from 'react';
import Footer from '../components/Footer';

const EXAM_METRICS = [
  { exam: 'AP Calculus BC', score: '4.8 / 5.0', percentile: '95th', completedDrills: 14, accuracy: 89, color: 'bg-indigo-600' },
  { exam: 'NY Regents Chemistry', score: '88 / 100', percentile: '90th', completedDrills: 12, accuracy: 85, color: 'bg-emerald-600' },
  { exam: 'IELTS Academic', score: 'Band 8.0', percentile: '93rd', completedDrills: 18, accuracy: 88, color: 'bg-blue-600' },
  { exam: 'Digital SAT', score: '1510 / 1600', percentile: '98th', completedDrills: 22, accuracy: 92, color: 'bg-amber-600' },
  { exam: 'ACT Science & Math', score: '33 / 36', percentile: '97th', completedDrills: 11, accuracy: 86, color: 'bg-teal-600' },
  { exam: 'TOEFL iBT', score: '108 / 120', percentile: '94th', completedDrills: 9, accuracy: 87, color: 'bg-purple-600' },
  { exam: 'GRE General', score: '326 / 340', percentile: '92nd', completedDrills: 8, accuracy: 84, color: 'bg-cyan-600' },
  { exam: 'LSAT Reasoning', score: '168 / 180', percentile: '96th', completedDrills: 7, accuracy: 85, color: 'bg-rose-600' }
];

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('Last 30 Days');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 pt-16">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Title Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Performance & Diagnostics
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Real-time analytics across all standardized exam sections, accuracy rates, and time pacing.
            </p>
          </div>

          {/* Time Filter */}
          <div className="flex items-center gap-2">
            {['Last 7 Days', 'Last 30 Days', 'All Time'].map((range) => (
              <button
                key={range}
                type="button"
                onClick={() => setTimeRange(range)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  timeRange === range
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Stat Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Practice Hours', value: '46.5 hrs', change: '+12% vs last month', positive: true },
            { label: 'Questions Attempted', value: '1,420 Qs', change: '87.4% overall accuracy', positive: true },
            { label: 'Full Diagnostic Mocks', value: '14 Tests', change: 'Avg score increase +14%', positive: true },
            { label: 'Pacing Efficiency', value: '54 sec / Q', change: '-4s pacing improvement', positive: true }
          ].map((item, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                {item.label}
              </span>
              <div className="text-2xl font-black text-slate-900 mt-1">{item.value}</div>
              <span className="inline-block mt-2 text-[11px] font-bold text-emerald-600">
                ✓ {item.change}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bars Per Exam */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 mb-8 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-1">Exam Section Accuracy & Scores</h2>
          <p className="text-xs text-slate-500 mb-6">Percentage of correct answers recorded during timed sessions.</p>

          <div className="space-y-5">
            {EXAM_METRICS.map((item, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800">{item.exam}</span>
                  <div className="flex items-center gap-4 text-slate-500">
                    <span className="text-slate-900 font-extrabold">{item.score}</span>
                    <span>Percentile: <strong className="text-blue-600">{item.percentile}</strong></span>
                    <span className="text-emerald-600 font-bold">{item.accuracy}% Correct</span>
                  </div>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.color} transition-all duration-500`}
                    style={{ width: `${item.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Spots & Pacing Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1">Recommended Focus Areas</h3>
            <p className="text-xs text-slate-500 mb-4">Topics with accuracy below 82% requiring extra drills:</p>
            
            <div className="space-y-3">
              {[
                { topic: 'Infinite Series & Taylor Polynomials', subject: 'AP Calculus BC', acc: '72%' },
                { topic: 'Electrochemistry & Nernst Equation', subject: 'NY Regents Chemistry', acc: '76%' },
                { topic: 'Reading Task 2 Multi-Blank Inference', subject: 'Digital SAT', acc: '78%' }
              ].map((w, idx) => (
                <div key={idx} className="p-3.5 bg-rose-50/50 border border-rose-200 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{w.topic}</p>
                    <p className="text-[10px] text-slate-500">{w.subject}</p>
                  </div>
                  <span className="text-xs font-bold text-rose-600">{w.acc} Acc</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-1">Strongest Mastered Areas</h3>
            <p className="text-xs text-slate-500 mb-4">High proficiency modules exceeding 90% accuracy:</p>
            
            <div className="space-y-3">
              {[
                { topic: 'Linear Equations & Desmos Hacks', subject: 'Digital SAT Math', acc: '98%' },
                { topic: 'Academic Discussion Writing Model', subject: 'TOEFL iBT', acc: '94%' },
                { topic: 'Quantitative Comparison Shortcuts', subject: 'GRE General', acc: '92%' }
              ].map((s, idx) => (
                <div key={idx} className="p-3.5 bg-emerald-50/50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-slate-900">{s.topic}</p>
                    <p className="text-[10px] text-slate-500">{s.subject}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-600">{s.acc} Acc</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}