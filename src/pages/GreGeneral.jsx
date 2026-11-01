import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

// Comprehensive GRE General (Shorter ETS Format) Syllabus & Mock Data
const GRE_DATA = {
  title: 'GRE General Quant & High-Frequency Verbal',
  badge: 'ETS Official Format (2024–2025)',
  targetScore: 'Target Score: 328+ (Q168 / V160)',
  tagline:
    'Master the official shorter GRE format with Quantitative Comparison shortcuts, 2-blank Text Completion strategies, high-yield vocabulary roots, and timed section pacing.',
  stats: [
    { label: 'Diagnostic Tests', value: '3 Full-Length' },
    { label: 'Practice Questions', value: '540+ Questions' },
    { label: 'Test Duration', value: '1h 58m' },
    { label: 'Avg Quant Score', value: '164.2 / 170' }
  ],
  modules: [
    {
      id: 'gre-mod-1',
      title: 'Quantitative Comparison: Number Properties & Inequalities',
      type: 'Quant',
      questionsCount: 45,
      estimatedTime: '40 mins',
      difficulty: 'Medium',
      completed: true,
      score: '90%'
    },
    {
      id: 'gre-mod-2',
      title: 'High-Frequency Vocabulary & 2-Blank Text Completion',
      type: 'Verbal',
      questionsCount: 50,
      estimatedTime: '45 mins',
      difficulty: 'Hard',
      completed: true,
      score: '84%'
    },
    {
      id: 'gre-mod-3',
      title: 'Coordinate Geometry, Polygons & 3D Solids',
      type: 'Quant',
      questionsCount: 40,
      estimatedTime: '45 mins',
      difficulty: 'Medium',
      completed: false,
      score: null
    },
    {
      id: 'gre-mod-4',
      title: 'Sentence Equivalence & Contextual Tone Traps',
      type: 'Verbal',
      questionsCount: 45,
      estimatedTime: '40 mins',
      difficulty: 'Hard',
      completed: false,
      score: null
    },
    {
      id: 'gre-mod-5',
      title: 'Data Interpretation: Dual Graphs, Percent Change & Boxplots',
      type: 'Quant',
      questionsCount: 35,
      estimatedTime: '45 mins',
      difficulty: 'Hard',
      completed: false,
      score: null
    },
    {
      id: 'gre-mod-6',
      title: 'Analytical Writing: Analyze an Issue Task Rubric & Speed Outlining',
      type: 'AWA',
      questionsCount: 15,
      estimatedTime: '30 mins',
      difficulty: 'Medium',
      completed: false,
      score: null
    }
  ],
  mockTests: [
    {
      id: 'mock-1',
      title: 'Official ETS Pattern Shorter GRE Diagnostic Test 1',
      sections: 'Section 1 (AWA 30m) • Section 2 (Quant 27m) • Section 3 (Verbal 18m)',
      time: '118 mins',
      questions: '54 Questions + 1 Essay',
      status: 'Ready'
    },
    {
      id: 'mock-2',
      title: 'GRE Quant Mastery Diagnostic: Hard Upper-Tier Adaptive Set',
      sections: 'Quant Section 1 & 2 Focus • Advanced Probability & Combinatorics',
      time: '47 mins',
      questions: '27 Questions',
      status: 'Ready'
    },
    {
      id: 'mock-3',
      title: 'Verbal Reasoning Speed Run: High-Yield Vocabulary Pack',
      sections: 'Verbal Section 1 & 2 Focus • Long Dense Academic Passages',
      time: '41 mins',
      questions: '27 Questions',
      status: 'Ready'
    }
  ],
  interactiveDrills: [
    {
      id: 'drill-qc-1',
      type: 'Quantitative Comparison',
      prompt: 'Compare Quantity A and Quantity B given the following condition:',
      given: 'x and y are integers such that x² = y² and x ≠ y.',
      colA: 'x + y',
      colB: '0',
      options: [
        'Quantity A is greater.',
        'Quantity B is greater.',
        'The two quantities are equal.',
        'The relationship cannot be determined from the information given.'
      ],
      correctIndex: 2,
      explanation:
        'If x² = y², then x² - y² = 0, which factors to (x - y)(x + y) = 0. Since we are given that x ≠ y, (x - y) cannot be zero. Therefore, (x + y) must equal 0. Quantity A = 0 and Quantity B = 0, so they are equal.'
    },
    {
      id: 'drill-tc-1',
      type: 'Text Completion',
      prompt:
        'Select the pair of words that best fits the blanks in the sentence below:',
      given:
        'Although the author’s earlier memoirs were marked by a refreshing _______, her latest volume exhibits an irritatingly _______ tone that obscures any genuine emotion.',
      options: [
        'candor ... affected',
        'brevity ... concise',
        'reticence ... bombastic',
        'arrogance ... humble'
      ],
      correctIndex: 0,
      explanation:
        'The shift word "Although" indicates a contrast between her earlier memoirs and her latest volume. A positive earlier quality contrasts with an irritatingly negative tone now: "candor" (frankness/openness) contrasts sharply with "affected" (artificial/pretentious).'
    }
  ]
};

export default function GreGeneral() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('modules'); // 'modules' | 'drills' | 'mocks' | 'vocab'
  const [filterType, setFilterType] = useState('all');

  // Interactive Drill State
  const [drillIndex, setDrillIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [drillScore, setDrillScore] = useState({ correct: 0, attempted: 0 });

  // Onscreen ETS Calculator modal state
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcInput, setCalcInput] = useState('');

  const currentDrill = GRE_DATA.interactiveDrills[drillIndex];

  const handleSelectOption = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    setDrillScore((prev) => ({
      correct: index === currentDrill.correctIndex ? prev.correct + 1 : prev.correct,
      attempted: prev.attempted + 1
    }));
  };

  const handleNextDrill = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setDrillIndex((prev) => (prev + 1) % GRE_DATA.interactiveDrills.length);
  };

  const filteredModules = GRE_DATA.modules.filter((m) => {
    if (filterType === 'all') return true;
    return m.type.toLowerCase() === filterType.toLowerCase();
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* 1. CLEAN TOP NAVIGATION BAR */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Back button */}
          <button
            type="button"
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Browse Exams</span>
          </button>

          {/* Quick Tools */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCalculator(!showCalculator)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors shadow-xs"
            >
              <span>🧮</span>
              <span>GRE Calculator</span>
            </button>
            <span className="hidden sm:inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold rounded-xl">
              ETS Short Format
            </span>
          </div>
        </div>
      </nav>

      {/* 2. HERO / EXAM OVERVIEW BANNER */}
      <section className="bg-white border-b border-slate-200 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-3xl">
              
              {/* Badges Pill Row */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <span>📈</span> {GRE_DATA.badge}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {GRE_DATA.targetScore}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  Quant 165+ Sprint
                </span>
              </div>

              {/* Title & Tagline */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {GRE_DATA.title}
              </h1>
              <p className="mt-2.5 text-sm sm:text-base text-slate-600 leading-relaxed">
                {GRE_DATA.tagline}
              </p>

              {/* Progress Summary Bar */}
              <div className="mt-5 flex items-center gap-4">
                <div className="flex-1 max-w-xs bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '40%' }} />
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  2 of 6 Modules Completed (40%)
                </span>
              </div>
            </div>

            {/* Quick Primary Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('drills');
                  document.getElementById('practice-workspace')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>⚡</span>
                <span>Start Live GRE Drill</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('mocks')}
                className="w-full px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all text-center"
              >
                Full Short GRE Simulation
              </button>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
            {GRE_DATA.stats.map((stat, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </div>
                <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. MAIN WORKSPACE / TABS */}
      <main id="practice-workspace" className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-3 mb-6 gap-3">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <button
              type="button"
              onClick={() => setActiveTab('modules')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'modules'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              Curriculum Modules (6)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('drills')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'drills'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              <span>⚡</span>
              <span>Live Question Drill</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mocks')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'mocks'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              Short GRE Mocks (3)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('vocab')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'vocab'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              High-Frequency Flashcards
            </button>
          </div>

          {/* Module filter when modules tab is selected */}
          {activeTab === 'modules' && (
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs font-semibold text-slate-400">Subject:</span>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              >
                <option value="all">All Sections</option>
                <option value="quant">Quant Only</option>
                <option value="verbal">Verbal Only</option>
                <option value="awa">Analytical Writing</option>
              </select>
            </div>
          )}
        </div>

        {/* TAB 1: CURRICULUM MODULES */}
        {activeTab === 'modules' && (
          <div className="space-y-3.5">
            {filteredModules.map((module, idx) => (
              <div
                key={module.id}
                className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      module.completed
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {module.completed ? '✓' : `0${idx + 1}`}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-base">
                        {module.title}
                      </h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          module.type === 'Quant'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : module.type === 'Verbal'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {module.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-medium">
                      <span>{module.questionsCount} practice questions</span>
                      <span>•</span>
                      <span>Est. {module.estimatedTime}</span>
                      {module.score && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-600 font-bold">
                            Best Score: {module.score}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('drills');
                      document.getElementById('practice-workspace')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      module.completed
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/25'
                    }`}
                  >
                    {module.completed ? 'Review Module' : 'Start Practice'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: INTERACTIVE LIVE QUESTION DRILL */}
        {activeTab === 'drills' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  Interactive Practice • Question {drillIndex + 1} of {GRE_DATA.interactiveDrills.length}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                  {currentDrill.type}
                </h3>
              </div>
              <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700">
                Score: {drillScore.correct} / {drillScore.attempted}
              </div>
            </div>

            <p className="text-sm font-semibold text-slate-700 mb-3">
              {currentDrill.prompt}
            </p>

            {/* Given Condition / Passage Box */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl mb-6 text-sm text-slate-800 font-serif leading-relaxed">
              {currentDrill.given}
            </div>

            {/* If QC (Quantitative Comparison), show 2 comparison columns */}
            {currentDrill.type === 'Quantitative Comparison' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl text-center">
                  <span className="text-xs font-bold text-blue-600 uppercase block mb-1">
                    Quantity A
                  </span>
                  <span className="text-lg font-mono font-bold text-slate-900">
                    {currentDrill.colA}
                  </span>
                </div>
                <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl text-center">
                  <span className="text-xs font-bold text-blue-600 uppercase block mb-1">
                    Quantity B
                  </span>
                  <span className="text-lg font-mono font-bold text-slate-900">
                    {currentDrill.colB}
                  </span>
                </div>
              </div>
            )}

            {/* Answer Options */}
            <div className="space-y-3 mb-6">
              {currentDrill.options.map((opt, i) => {
                const isSelected = selectedAnswer === i;
                const isCorrect = i === currentDrill.correctIndex;

                let optClass = 'bg-white border-slate-200 hover:border-blue-400 text-slate-800';
                if (selectedAnswer !== null) {
                  if (isCorrect) {
                    optClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (isSelected) {
                    optClass = 'bg-rose-50 border-rose-400 text-rose-900';
                  }
                }

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectOption(i)}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${optClass}`}
                  >
                    <span>{opt}</span>
                    {selectedAnswer !== null && isCorrect && (
                      <span className="text-emerald-600 font-bold">✓ Correct</span>
                    )}
                    {selectedAnswer === i && !isCorrect && (
                      <span className="text-rose-600 font-bold">✕ Incorrect</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next Drill Button */}
            {showExplanation && (
              <div className="p-5 bg-blue-50/60 border border-blue-200 rounded-2xl mb-6">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider block mb-1">
                  Official Solution & Breakdown
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentDrill.explanation}
                </p>
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextDrill}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    Next Question →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SHORT GRE MOCK TESTS */}
        {activeTab === 'mocks' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GRE_DATA.mockTests.map((mock) => (
              <div
                key={mock.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-blue-500 transition-all"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
                    {mock.questions}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg leading-snug">
                    {mock.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2">{mock.sections}</p>
                  <div className="mt-4 text-xs text-slate-500 font-semibold flex items-center gap-2">
                    <span>⏱ {mock.time}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">Scaled 130–170 Scoring</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Launching ${mock.title} timed simulator!`)}
                  className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Start Timed Test
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: VOCABULARY ROOTS & FLASHCARDS */}
        {activeTab === 'vocab' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              High-Frequency Top 300 GRE Words
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Review words frequently tested in Sentence Equivalence & Text Completion modules.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { word: 'Laconic', pos: 'adj.', def: 'Using very few words; terse and concise.' },
                { word: 'Pernicious', pos: 'adj.', def: 'Having a harmful effect, especially in a gradual or subtle way.' },
                { word: 'Equivocate', pos: 'verb', def: 'Use ambiguous language to conceal the truth or avoid committing oneself.' },
                { word: 'Capricious', pos: 'adj.', def: 'Given to sudden and unaccountable changes of mood or behavior.' },
                { word: 'Profligate', pos: 'adj.', def: 'Recklessly extravagant or wasteful in the use of resources.' },
                { word: 'Taciturn', pos: 'adj.', def: 'Reserved or uncommunicative in speech; saying little.' }
              ].map((item, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-base">{item.word}</span>
                    <span className="text-[10px] font-bold text-blue-600 uppercase">{item.pos}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.def}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* 4. SOLID BLUE FOOTER */}
      <Footer />

      {/* 5. ONSCREEN ETS CALCULATOR TOOL (MODAL) */}
      {showCalculator && (
        <div className="fixed bottom-6 right-6 z-50 w-72 bg-white border border-slate-300 rounded-2xl shadow-2xl p-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
            <span className="text-xs font-bold text-slate-800">ETS GRE Calculator</span>
            <button
              onClick={() => setShowCalculator(false)}
              className="text-slate-400 hover:text-slate-600 text-sm font-bold"
            >
              ✕
            </button>
          </div>
          <input
            type="text"
            readOnly
            value={calcInput || '0'}
            className="w-full bg-slate-50 border border-slate-200 text-right font-mono text-lg font-bold p-2.5 rounded-lg mb-3"
          />
          <div className="grid grid-cols-4 gap-2 text-xs font-bold">
            {['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((btn) => (
              <button
                key={btn}
                type="button"
                onClick={() => {
                  if (btn === '=') {
                    try {
                      const sanitized = calcInput.replace(/[^0-9+\-*/.]/g, '');
                      setCalcInput(String(Function(`'use strict'; return (${sanitized})`)()));
                    } catch {
                      setCalcInput('Error');
                    }
                  } else {
                    setCalcInput((prev) => prev + btn);
                  }
                }}
                className="p-2.5 bg-slate-100 hover:bg-blue-600 hover:text-white rounded-lg transition-colors text-center"
              >
                {btn}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setCalcInput('')}
            className="mt-2 w-full py-1.5 bg-rose-50 text-rose-600 text-xs font-bold rounded-lg hover:bg-rose-100 transition-colors"
          >
            Clear (C)
          </button>
        </div>
      )}

    </div>
  );
}