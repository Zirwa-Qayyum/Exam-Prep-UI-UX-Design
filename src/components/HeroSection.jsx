import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';

// --- 1. DEFAULT DATA WITH WORKING UNSPLASH IMAGES FOR EVERY SUBJECT ---
export const DEFAULT_CATEGORIES = [
  { id: 'all', label: 'All Subjects', count: 8 },
  { id: 'ap', label: 'AP Exams', icon: '🎓', count: 1 },
  { id: 'regents', label: 'Regents Exams', icon: '🧪', count: 1 },
  { id: 'ielts', label: 'IELTS', icon: '🌐', count: 1 },
  { id: 'sat', label: 'SAT', icon: '🎯', count: 1 },
  { id: 'act', label: 'ACT', icon: '📖', count: 1 },
  { id: 'toefl', label: 'TOEFL iBT', icon: '文A', count: 1 },
  { id: 'gre', label: 'GRE', icon: '📈', count: 1 },
  { id: 'lsat', label: 'LSAT', icon: '⚖️', count: 1 },
];

export const DEFAULT_EXAMS = [
  {
    id: 'ap-calculus',
    subjectId: 'ap',
    subjectName: 'AP Exams',
    subjectIcon: '🎓',
    title: 'AP Calculus BC & AB Diagnostics',
    tagline: 'College Board Pattern • Score 5 Sprint',
    description: 'Master differential equations, Taylor series, and timed FRQ walkthroughs with step-by-step scoring rubrics.',
    sections: ['Derivatives', 'Integration Techniques', 'Series & Sequences', 'FRQ Practice'],
    totalTests: 18,
    duration: '3h 15m',
    studentsEnrolled: '14,200',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
    color: 'border-indigo-500',
    isLive: true
  },
  {
    id: 'regents-chemistry',
    subjectId: 'regents',
    subjectName: 'Regents Exams',
    subjectIcon: '🧪',
    title: 'NY Regents Chemistry Review',
    tagline: 'New York State Aligned • 85+ Mastery',
    description: 'Comprehensive review using official NYS Reference Tables, stoichiometry balance drills, and past 5-year exam packets.',
    sections: ['Atomic Concepts', 'Stoichiometry', 'Kinetics & Equilibrium', 'Reference Tables'],
    totalTests: 12,
    duration: '3h 00m',
    studentsEnrolled: '8,400',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80',
    color: 'border-emerald-500',
    isLive: true
  },
  {
    id: 'ielts-prep',
    subjectId: 'ielts',
    subjectName: 'IELTS',
    subjectIcon: '🌐',
    title: 'IELTS Academic & General Prep',
    tagline: 'Cambridge Standard • Target Band 8.0+',
    description: 'Realistic British, Australian, and North American audio passages, Task 1 & 2 essay evaluations, and speaking cues.',
    sections: ['Academic Reading', 'Listening Multi-Accent', 'Task 2 Essay', 'Speaking Interview'],
    totalTests: 24,
    duration: '2h 45m',
    studentsEnrolled: '32,100',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    color: 'border-blue-500',
    isLive: true
  },
  {
    id: 'sat-digital',
    subjectId: 'sat',
    subjectName: 'SAT',
    subjectIcon: '🎯',
    title: 'Digital SAT Adaptive Math & Reading',
    tagline: 'Bluebook Compatible • Target 1520+',
    description: 'Adaptive module algorithm simulations with integrated Desmos graphing calculator tricks and grammar heuristics.',
    sections: ['Algebra & Advanced Math', 'Desmos Hacks', 'Reading Comprehension', 'Standard Conventions'],
    totalTests: 30,
    duration: '2h 14m',
    studentsEnrolled: '45,600',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    color: 'border-amber-500',
    isLive: true
  },
  {
    id: 'act-prep',
    subjectId: 'act',
    subjectName: 'ACT',
    subjectIcon: '📖',
    title: 'ACT Science & Fast-Paced Math',
    tagline: 'Speed Strategy • Target 34+',
    description: 'Pacing strategies for 35-minute Science reasoning charts, quick trigonometry, and English rhetorical skills.',
    sections: ['Science Reasoning', 'College Math', 'English Mechanics', 'Reading Sprint'],
    totalTests: 15,
    duration: '2h 55m',
    studentsEnrolled: '12,900',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    color: 'border-teal-500',
    isLive: true
  },
  {
    id: 'toefl-ibt',
    subjectId: 'toefl',
    subjectName: 'TOEFL iBT',
    subjectIcon: '文A',
    title: 'TOEFL iBT 2-Hour Rapid Score Booster',
    tagline: 'ETS Official Format • Target 105+',
    description: 'Practice the updated concise exam format with AI acoustic pronunciation scoring and academic discussion prompts.',
    sections: ['Academic Discussion', 'Integrated Writing', 'Lecture Listening', 'Speaking Tasks'],
    totalTests: 14,
    duration: '2h 00m',
    studentsEnrolled: '19,300',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800&q=80',
    color: 'border-purple-500',
    isLive: true
  },
  {
    id: 'gre-quant-verbal',
    subjectId: 'gre',
    subjectName: 'GRE',
    subjectIcon: '📈',
    title: 'GRE General Quant & High-Frequency Verbal',
    tagline: 'ETS Short GRE • Target 328+',
    description: '800 essential vocabulary roots, text completion strategies, advanced geometry shortcuts, and timed quant sets.',
    sections: ['Quantitative Comparison', 'Text Completion', 'Data Interpretation', 'Analytical Writing'],
    totalTests: 20,
    duration: '1h 58m',
    studentsEnrolled: '11,700',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    color: 'border-cyan-500',
    isLive: true
  },
  {
    id: 'lsat-reasoning',
    subjectId: 'lsat',
    subjectName: 'LSAT',
    subjectIcon: '⚖️',
    title: 'LSAT Logical Reasoning & Reading Prep',
    tagline: '2025 Standard • Target 170+',
    description: 'Master conditional syllogisms, flaw identification, assumption questions, and complex legal jurisprudence passages.',
    sections: ['Logical Reasoning I', 'Logical Reasoning II', 'Comparative Reading', 'Writing Sample'],
    totalTests: 22,
    duration: '3h 00m',
    studentsEnrolled: '9,100',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    color: 'border-rose-500',
    isLive: true
  }
];

// --- 2. HERO SECTION / SECTION1 COMPONENT ---
export default function Section1({
  exams = DEFAULT_EXAMS,
  categories = DEFAULT_CATEGORIES
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('all');

  // Filter exams based on both dropdown/pill subject and search keyword
  const filteredExams = useMemo(() => {
    return exams.filter((exam) => {
      // Subject filter match
      const matchesSubject =
        selectedSubject === 'all' ||
        exam.subjectId === selectedSubject ||
        exam.subjectName.toLowerCase() === selectedSubject.toLowerCase();

      // Search query filter match across title, subject, description, and sections
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        exam.title.toLowerCase().includes(q) ||
        exam.subjectName.toLowerCase().includes(q) ||
        exam.description.toLowerCase().includes(q) ||
        exam.sections.some((s) => s.toLowerCase().includes(q));

      return matchesSubject && matchesSearch;
    });
  }, [exams, selectedSubject, searchQuery]);

  // Reset helper
  const handleReset = () => {
    setSearchQuery('');
    setSelectedSubject('all');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Main Browse Section */}
      <section className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Title & Subtitle */}
          <div className="mb-6">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Browse exams
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Choose your target test, practice realistic timed sections, and track your progress.
            </p>
          </div>

          {/* Search Bar + Working Dropdown Row */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            
            {/* 1. Functional Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exams — name, subject, or section..."
                className="w-full pl-11 pr-10 py-3 bg-white text-sm text-slate-800 placeholder-slate-400 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* 2. Functional Select Subject Dropdown */}
            <div className="relative w-full sm:w-64">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full h-full min-h-[46px] px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all shadow-sm cursor-pointer appearance-none"
              >
                <option value="all">Select Subject (All Subjects)</option>
                {categories
                  .filter((cat) => cat.id !== 'all')
                  .map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon ? `${cat.icon} ` : ''}{cat.label}
                    </option>
                  ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 3. Category Filter Quick Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none">
            {categories.map((cat) => {
              const isSelected = selectedSubject === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedSubject(cat.id)}
                  className={`inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                    isSelected
                      ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  {cat.icon && <span>{cat.icon}</span>}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Results Count Line */}
          <div className="flex items-center justify-between mt-6 mb-5 text-xs text-slate-500">
            <div>
              Showing <strong className="text-slate-900 font-bold">{filteredExams.length}</strong> exams
              {selectedSubject !== 'all' && (
                <span> in <strong className="text-blue-600 font-semibold">{categories.find((c) => c.id === selectedSubject)?.label}</strong></span>
              )}
              {searchQuery && (
                <span> matching "<strong className="text-slate-900 font-bold">{searchQuery}</strong>"</span>
              )}
            </div>
            {(selectedSubject !== 'all' || searchQuery) && (
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {/* 4. Exam Cards Grid with Unsplash Pictures */}
          {filteredExams.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center my-6">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 mx-auto flex items-center justify-center mb-3 text-lg font-bold">
                🔍
              </div>
              <h3 className="text-base font-bold text-slate-800">No exams found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                No exams match your current filter. Try clearing your search keyword or switching category.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredExams.map((exam) => (
                <div
                  key={exam.id}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col overflow-hidden"
                >
                  {/* Subject Picture */}
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={exam.image}
                      alt={exam.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                    {/* Subject Badge */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-white/95 backdrop-blur-md text-slate-800 shadow-sm">
                        <span>{exam.subjectIcon}</span>
                        <span>{exam.subjectName}</span>
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-blue-600 text-white shadow-sm">
                        {exam.duration}
                      </span>
                    </div>

                    {/* Rating & Enrollment */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[11px] font-semibold">
                      <span>★ {exam.rating} • {exam.studentsEnrolled}</span>
                      <span>{exam.totalTests} Mocks</span>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                        {exam.tagline}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                        {exam.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {exam.description}
                      </p>

                      {/* Section Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {exam.sections.slice(0, 3).map((sec, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-600 rounded-md"
                          >
                            {sec}
                          </span>
                        ))}
                        {exam.sections.length > 3 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-medium bg-slate-100 text-slate-500 rounded-md">
                            +{exam.sections.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* CTA link: All exams are now live and directly link to /exam/:id */}
                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500">
                        {exam.isLive ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> Ready
                          </span>
                        ) : (
                          'Full Practice'
                        )}
                      </span>

                      {exam.isLive ? (
                        <Link
                          to={`/exam/${exam.id}`}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-sm shadow-blue-500/25 transition-all flex items-center gap-1.5"
                        >
                          <span>Go to Exam</span>
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => alert(`Selected exam: ${exam.title} (Page is currently being built)`)}
                          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                        >
                          <span>Coming Soon</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Footer component cleanly placed at the bottom */}
      <Footer />
    </div>
  );
}