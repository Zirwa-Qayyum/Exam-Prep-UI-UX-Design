import React, { useState } from 'react';
import Footer from '../components/Footer';

const INITIAL_SCHEDULE = [
  { day: 'Mon', date: 'Oct 21', exam: 'AP Calculus', task: 'Taylor Series & Derivatives FRQ', time: '05:00 PM - 06:30 PM', completed: true },
  { day: 'Tue', date: 'Oct 22', exam: 'NY Regents Chemistry', task: 'Table S & Stoichiometry Drill', time: '06:00 PM - 07:30 PM', completed: true },
  { day: 'Wed', date: 'Oct 23', exam: 'IELTS Academic', task: 'Listening Multi-Accent + Task 1 Essay', time: '04:30 PM - 06:00 PM', completed: false },
  { day: 'Thu', date: 'Oct 24', exam: 'Digital SAT', task: 'Desmos Regression & Hard Module 2', time: '05:00 PM - 07:00 PM', completed: false },
  { day: 'Fri', date: 'Oct 25', exam: 'ACT Science', task: '35-Minute Speed Passage Blitz', time: '06:00 PM - 07:00 PM', completed: false },
  { day: 'Sat', date: 'Oct 26', exam: 'Full Diagnostic Mock', task: 'GRE Short Format Full Simulation', time: '10:00 AM - 12:00 PM', completed: false },
  { day: 'Sun', date: 'Oct 27', exam: 'Weekly Review', task: 'Flashcards & Weak Spot Error Log', time: '03:00 PM - 04:30 PM', completed: false }
];

export default function Schedule() {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [selectedDay, setSelectedDay] = useState('Wed');

  const toggleTask = (index) => {
    setSchedule((prev) =>
      prev.map((item, i) => (i === index ? { ...item, completed: !item.completed } : item))
    );
  };

  const completedCount = schedule.filter((s) => s.completed).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 pt-16">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Top Header Banner */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 mb-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200">
                Weekly Study Planner
              </span>
              <span className="text-xs font-semibold text-slate-500">Week 42 • Fall Sprint</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Study Schedule & Exam Deadlines
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Maintain your daily study consistency and prepare for targeted test dates.
            </p>
          </div>

          {/* Quick Streak Card */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl p-4 w-full md:w-auto">
            <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl font-black shrink-0">
              🔥
            </div>
            <div>
              <div className="text-xl font-black text-slate-900">5 Days Streak!</div>
              <div className="text-xs text-slate-500 font-medium">
                {completedCount} of {schedule.length} sessions completed this week
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Day Selector Pills */}
        <div className="grid grid-cols-7 gap-2 sm:gap-3 mb-8">
          {schedule.map((item) => (
            <button
              key={item.day}
              type="button"
              onClick={() => setSelectedDay(item.day)}
              className={`p-3 sm:p-4 rounded-2xl border text-center transition-all ${
                selectedDay === item.day
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                  : 'bg-white border-slate-200 hover:border-blue-400 text-slate-700'
              }`}
            >
              <div className={`text-xs font-bold uppercase ${selectedDay === item.day ? 'text-blue-100' : 'text-slate-400'}`}>
                {item.day}
              </div>
              <div className="text-base sm:text-lg font-black mt-0.5">
                {item.date.split(' ')[1]}
              </div>
              <div className="mt-1 flex justify-center">
                <span className={`w-2 h-2 rounded-full ${item.completed ? (selectedDay === item.day ? 'bg-white' : 'bg-emerald-500') : 'bg-slate-300'}`} />
              </div>
            </button>
          ))}
        </div>

        {/* Sessions & Checklists */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Day's Detailed Schedule */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Scheduled Sessions</h2>
            
            {schedule.map((item, idx) => (
              <div
                key={idx}
                className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs ${
                  item.completed ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200 hover:border-blue-400'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    type="button"
                    onClick={() => toggleTask(idx)}
                    className={`w-7 h-7 mt-0.5 rounded-lg border flex items-center justify-center font-bold text-xs transition-all ${
                      item.completed
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'border-slate-300 bg-white hover:border-blue-500 text-transparent'
                    }`}
                  >
                    ✓
                  </button>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black uppercase text-blue-600">
                        {item.exam}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">•</span>
                      <span className="text-xs font-medium text-slate-500">{item.time}</span>
                    </div>
                    <h3 className={`text-base font-bold mt-1 ${item.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {item.task}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleTask(idx)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all self-end sm:self-center ${
                    item.completed
                      ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                  }`}
                >
                  {item.completed ? 'Completed' : 'Mark Done'}
                </button>
              </div>
            ))}
          </div>

          {/* Right Sidebar: Upcoming Exams & Deadlines */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4">Official Target Deadlines</h3>
              <div className="space-y-4 text-xs font-medium">
                {[
                  { name: 'Digital SAT Exam Date', date: 'Nov 02, 2024', daysLeft: '12 days left', color: 'text-rose-600' },
                  { name: 'IELTS Academic Testing', date: 'Nov 18, 2024', daysLeft: '28 days left', color: 'text-amber-600' },
                  { name: 'GRE General Slot', date: 'Dec 05, 2024', daysLeft: '45 days left', color: 'text-blue-600' },
                  { name: 'AP Calculus BC Mock 1', date: 'Dec 14, 2024', daysLeft: '54 days left', color: 'text-emerald-600' }
                ].map((d, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-900">{d.name}</p>
                      <p className="text-[11px] text-slate-500">{d.date}</p>
                    </div>
                    <span className={`font-bold ${d.color}`}>{d.daysLeft}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-blue-50 border border-blue-200 rounded-3xl p-6 text-xs text-blue-900">
              <h4 className="font-bold text-sm text-blue-950 mb-1">💡 StudyFlow Rule:</h4>
              <p className="leading-relaxed">
                Consistency beats intensity. 90 minutes of focused timed drills every day generates 3x better retention than weekend cramming.
              </p>
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}