import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// --- DATASET SPECIFIC TO DIGITAL SAT ---
const SAT_DATA = {
  title: 'Digital SAT Adaptive Math & Reading',
  badge: 'College Board Bluebook Compatible',
  targetScore: 'Target Score: 1520+',
  stats: [
    { label: 'Full Diagnostic Mocks', value: '8 Adaptive Tests' },
    { label: 'Practice Questions', value: '1,250+ Drills' },
    { label: 'Test Duration', value: '2h 14m (2 Modules)' },
    { label: 'Avg Score Increase', value: '+165 Pts' }
  ],
  modules: [
    {
      id: 'sat-m1',
      title: 'Module 1: Reading & Writing (Craft, Structure & Information)',
      category: 'Reading & Writing',
      questionsCount: 27,
      estimatedTime: '32 mins',
      difficulty: 'Medium',
      completed: true,
      score: '710 / 800'
    },
    {
      id: 'sat-m2',
      title: 'Module 2 (Hard Route): Advanced Rhetoric & Standard Conventions',
      category: 'Reading & Writing',
      questionsCount: 27,
      estimatedTime: '32 mins',
      difficulty: 'Hard (Adaptive)',
      completed: true,
      score: '740 / 800'
    },
    {
      id: 'sat-m3',
      title: 'Module 1: Math Foundations (Algebra & Advanced Linear Functions)',
      category: 'Math',
      questionsCount: 22,
      estimatedTime: '35 mins',
      difficulty: 'Medium',
      completed: false,
      score: null
    },
    {
      id: 'sat-m4',
      title: 'Module 2 (Hard Route): Geometry, Trig & Quadratics with Desmos',
      category: 'Math',
      questionsCount: 22,
      estimatedTime: '35 mins',
      difficulty: 'Hard (Adaptive)',
      completed: false,
      score: null
    },
    {
      id: 'sat-m5',
      title: 'Desmos Regression & Systems of Equations Speed Hacks',
      category: 'Desmos Masterclass',
      questionsCount: 30,
      estimatedTime: '25 mins',
      difficulty: 'Strategy Drill',
      completed: false,
      score: null
    },
    {
      id: 'sat-m6',
      title: 'Transitions & Logical Flow Elimination Heuristics',
      category: 'Reading & Writing',
      questionsCount: 40,
      estimatedTime: '30 mins',
      difficulty: 'High-Yield',
      completed: false,
      score: null
    }
  ],
  practiceQuestions: [
    {
      id: 'pq-1',
      category: 'Math — Advanced Equations',
      question: 'For which value of k will the system of equations have infinitely many solutions?\n3x - 6y = 12\n6x - 12y = 4k',
      desmosTip: '💡 Desmos Hack: In Desmos, both lines must coincide completely. Divide 4k = 24 to find k.',
      options: [
        { label: 'A', text: 'k = 3' },
        { label: 'B', text: 'k = 6' },
        { label: 'C', text: 'k = 12' },
        { label: 'D', text: 'k = 24' }
      ],
      correctAnswer: 'B',
      explanation: 'Multiplying the first equation by 2 yields: 6x - 12y = 24. For infinite solutions, the second equation 6x - 12y = 4k must be identical. Therefore 4k = 24, giving k = 6.'
    },
    {
      id: 'pq-2',
      category: 'Reading & Writing — Transitions',
      question: 'Microbiologists originally believed extreme thermal vents were devoid of life. ________, expeditions in the late 1970s revealed thriving communities of tube worms and chemotrophic bacteria reliant entirely on hydrogen sulfide.',
      desmosTip: '💡 Heuristic: The first sentence states an earlier misconception; the second sentence reveals the contradictory discovery.',
      options: [
        { label: 'A', text: 'Consequently' },
        { label: 'B', text: 'Similarly' },
        { label: 'C', text: 'However' },
        { label: 'D', text: 'In other words' }
      ],
      correctAnswer: 'C',
      explanation: '"However" is the correct contrast transition indicating an unexpected divergence from the prior consensus.'
    },
    {
      id: 'pq-3',
      category: 'Math — Quadratics & Vertex Form',
      question: 'A projectile is launched from the ground. Its height in feet after t seconds is modeled by h(t) = -16t² + 64t + 80. What is the maximum height, in feet, reached by the projectile?',
      desmosTip: '💡 Desmos Hack: Type y = -16x^2 + 64x + 80 and click directly on the vertex point (2, 144).',
      options: [
        { label: 'A', text: '80 feet' },
        { label: 'B', text: '128 feet' },
        { label: 'C', text: '144 feet' },
        { label: 'D', text: '256 feet' }
      ],
      correctAnswer: 'C',
      explanation: 'Vertex time t = -b / (2a) = -64 / (2 * -16) = 2 seconds. Substitute t = 2: h(2) = -16(4) + 64(2) + 80 = -64 + 128 + 80 = 144 feet.'
    }
  ],
  mocks: [
    {
      id: 'mock-1',
      title: 'Digital SAT Diagnostic Simulation #1 (Bluebook Standard)',
      pattern: '2 Modules Reading/Writing + 2 Modules Math',
      duration: '134 mins',
      adaptive: 'True Adaptive Routing'
    },
    {
      id: 'mock-2',
      title: 'College Board Hard-Route Pressure Test #2',
      pattern: 'Upper Quartile 700+ Calibration',
      duration: '134 mins',
      adaptive: 'Hard Module 2 Locked'
    },
    {
      id: 'mock-3',
      title: 'Speed Sprint: 44-Question Pure Math & Desmos Drill',
      pattern: 'No Formula Sheet • Timed Speed Run',
      duration: '70 mins',
      adaptive: 'Section Specialized'
    }
  ]
};

export default function SatDigital() {
  const [activeTab, setActiveTab] = useState('modules'); // 'modules' | 'practice' | 'mocks' | 'desmos'
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Interactive Practice State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [drillScore, setDrillScore] = useState(0);

  const categories = ['All', 'Reading & Writing', 'Math', 'Desmos Masterclass'];

  const filteredModules = SAT_DATA.modules.filter((mod) => {
    if (selectedCategory === 'All') return true;
    return mod.category === selectedCategory;
  });

  const currentQ = SAT_DATA.practiceQuestions[currentQuestionIndex];
  const userSelected = selectedAnswers[currentQ.id];

  const handleSelectOption = (optionLabel) => {
    if (userSelected) return; // Prevent multiple answers on same question
    
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optionLabel }));
    setShowExplanation(true);
    if (optionLabel === currentQ.correctAnswer) {
      setDrillScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex < SAT_DATA.practiceQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    setShowExplanation(false);
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* 1. TOP BREADCRUMB NAVIGATION */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Browse Exams</span>
          </Link>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span>Exams</span>
            <span>/</span>
            <span>SAT</span>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Digital SAT</span>
          </div>
        </div>
      </div>

      {/* 2. HERO / EXAM OVERVIEW BANNER */}
      <section className="bg-white border-b border-slate-200 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  <span>🎯</span> {SAT_DATA.badge}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {SAT_DATA.targetScore}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Desmos Built-In
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {SAT_DATA.title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Comprehensive training for the multi-stage adaptive Digital SAT. Master rapid Reading & Writing 
                conventions, Desmos graphical equation shortcuts, and the high-difficulty Module 2 adaptive algorithm.
              </p>

              {/* Progress Bar */}
              <div className="mt-5 flex items-center gap-4">
                <div className="flex-1 max-w-xs bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '33%' }} />
                </div>
                <span className="text-xs font-semibold text-slate-600">2 of 6 Modules Completed (33%)</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
              <button
                type="button"
                onClick={() => setActiveTab('practice')}
                className="w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all text-center"
              >
                Start Adaptive Drill
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('desmos')}
                className="w-full px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all text-center"
              >
                Desmos Shortcut Vault
              </button>
            </div>

          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
            {SAT_DATA.stats.map((stat, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TABS NAVIGATION & MAIN WORKSPACE */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 w-full">
        
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('modules')}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                activeTab === 'modules'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              Curriculum & Modules (6)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('practice')}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                activeTab === 'practice'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              Interactive Question Drill
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mocks')}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                activeTab === 'mocks'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              Adaptive Mocks (3)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('desmos')}
              className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
                activeTab === 'desmos'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              Desmos Cheatsheet
            </button>
          </div>

          {/* Category Filter for modules tab */}
          {activeTab === 'modules' && (
            <div className="hidden sm:flex items-center gap-1.5 pl-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* TAB 1: CURRICULUM MODULES */}
        {activeTab === 'modules' && (
          <div className="space-y-3.5">
            {filteredModules.map((module, idx) => (
              <div
                key={module.id}
                className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    module.completed
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    {module.completed ? '✓' : `0${idx + 1}`}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-base">
                        {module.title}
                      </h3>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        module.difficulty.includes('Adaptive')
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {module.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-medium">
                      <span className="font-semibold text-blue-600">{module.category}</span>
                      <span>•</span>
                      <span>{module.questionsCount} questions</span>
                      <span>•</span>
                      <span>⏱ {module.estimatedTime}</span>
                      {module.score && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-600 font-bold">Score: {module.score}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab('practice')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      module.completed
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/25'
                    }`}
                  >
                    {module.completed ? 'Retake Module' : 'Launch Module'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: INTERACTIVE PRACTICE DRILL */}
        {activeTab === 'practice' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
            
            {/* Header info bar */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  {currentQ.category}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Question {currentQuestionIndex + 1} of {SAT_DATA.practiceQuestions.length}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-3 py-1 bg-blue-50 text-blue-700 rounded-lg">
                  Score: {drillScore} / {SAT_DATA.practiceQuestions.length}
                </span>
              </div>
            </div>

            {/* Question Text */}
            <div className="mb-6">
              <p className="text-base sm:text-lg font-medium text-slate-800 whitespace-pre-line leading-relaxed">
                {currentQ.question}
              </p>
              
              {/* Desmos Tip Box */}
              <div className="mt-4 p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium">
                {currentQ.desmosTip}
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {currentQ.options.map((opt) => {
                const isSelected = userSelected === opt.label;
                const isCorrect = opt.label === currentQ.correctAnswer;
                
                let btnStyle = 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/30 text-slate-800';
                if (userSelected) {
                  if (isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-semibold';
                  }
                }

                return (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => handleSelectOption(opt.label)}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                      {opt.label}
                    </span>
                    <span className="text-sm">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation card */}
            {showExplanation && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl mb-6">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-bold uppercase ${
                    userSelected === currentQ.correctAnswer ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {userSelected === currentQ.correctAnswer ? '✓ Correct Answer!' : '✗ Incorrect'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-xs font-bold rounded-xl text-slate-700 disabled:opacity-40 transition-all"
              >
                Previous
              </button>

              <button
                type="button"
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === SAT_DATA.practiceQuestions.length - 1}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white rounded-xl shadow-sm disabled:opacity-40 transition-all"
              >
                Next Question
              </button>
            </div>

          </div>
        )}

        {/* TAB 3: ADAPTIVE MOCKS */}
        {activeTab === 'mocks' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAT_DATA.mocks.map((mock) => (
              <div
                key={mock.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-blue-500 transition-all"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-3">
                    {mock.adaptive}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg leading-snug">
                    {mock.title}
                  </h3>
                  <div className="mt-3 text-xs text-slate-500 font-medium space-y-1">
                    <p>📋 {mock.pattern}</p>
                    <p>⏱ {mock.duration}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Launching ${mock.title} adaptive exam mode!`)}
                  className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Start Bluebook Simulation
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: DESMOS CHEATSHEET */}
        {activeTab === 'desmos' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">High-Yield Desmos Graphical Calculator Secrets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-blue-600 uppercase">Regression Shortcut</span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">Linear & Quadratic Regression</h4>
                <p className="text-xs text-slate-600 font-mono mt-1 bg-white p-2 rounded border border-slate-200">
                  y1 ~ m x1 + b  (or  y1 ~ a x1² + b x1 + c)
                </p>
                <p className="text-[11px] text-slate-500 mt-2">Create a table with given points, type this relation to find parameters m and b in 3 seconds.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-purple-600 uppercase">Systems of Equations</span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">Direct Graphing Intersection</h4>
                <p className="text-xs text-slate-600 font-mono mt-1 bg-white p-2 rounded border border-slate-200">
                  y = 2x + 7  and  3x - 5y = 12
                </p>
                <p className="text-[11px] text-slate-500 mt-2">Type both equations as given without rearranging. Click gray intersection dot for (x, y).</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-emerald-600 uppercase">Percent & Word Problems</span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">Single Variable Equation Solver</h4>
                <p className="text-xs text-slate-600 font-mono mt-1 bg-white p-2 rounded border border-slate-200">
                  15(x - 3) = 4(2x + 9)
                </p>
                <p className="text-[11px] text-slate-500 mt-2">Desmos graphs a vertical line at the exact answer. Click the x-axis intercept to read the solution.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-amber-600 uppercase">Reading & Writing Grammar</span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">Semicolon vs. Period Rule</h4>
                <p className="text-xs text-slate-600 font-mono mt-1 bg-white p-2 rounded border border-slate-200">
                  Independent Clause ; Independent Clause
                </p>
                <p className="text-[11px] text-slate-500 mt-2">On the Digital SAT, semicolons and periods are grammatically interchangeable. If both appear as choices, eliminate both.</p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Solid Blue Footer */}
      <Footer />

    </div>
  );
}