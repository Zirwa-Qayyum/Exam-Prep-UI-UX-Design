import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// --- AP CALCULUS QUESTION BANK FOR PRACTICE DRILLS ---
const PRACTICE_QUESTIONS = {
  'mod-1': [
    {
      id: 1,
      prompt: 'Evaluate the limit: \\lim_{x \\to 0} \\frac{\\sin(5x)}{2x}',
      options: ['0', '5/2', '2/5', 'Does not exist'],
      correctIndex: 1,
      explanation: 'Recall the fundamental trigonometric limit \\lim_{u \\to 0} \\frac{\\sin(u)}{u} = 1. Rewriting: \\frac{1}{2} \\cdot 5 \\cdot \\lim_{x \\to 0} \\frac{\\sin(5x)}{5x} = \\frac{5}{2} \\cdot 1 = \\frac{5}{2}.'
    },
    {
      id: 2,
      prompt: 'Let f(x) = (x^2 - 9)/(x - 3) for x ≠ 3. What value should f(3) be assigned to make f continuous at x = 3?',
      options: ['0', '3', '6', 'Undefined'],
      correctIndex: 2,
      explanation: 'Factor the numerator: (x - 3)(x + 3)/(x - 3) = x + 3 for x ≠ 3. The limit as x → 3 is 3 + 3 = 6. For continuity, f(3) must equal \\lim_{x \\to 3} f(x) = 6.'
    },
    {
      id: 3,
      prompt: 'If \\lim_{x \\to 2^-} f(x) = 4 and \\lim_{x \\to 2^+} f(x) = 4, but f(2) = 7, which statement is true?',
      options: [
        'f has a jump discontinuity at x = 2',
        'f has a removable discontinuity at x = 2',
        'f is continuous at x = 2',
        '\\lim_{x \\to 2} f(x) does not exist'
      ],
      correctIndex: 1,
      explanation: 'Since both one-sided limits exist and are equal (4), \\lim_{x \\to 2} f(x) = 4. However, \\lim_{x \\to 2} f(x) ≠ f(2), creating a removable (hole) discontinuity.'
    }
  ],
  'default': [
    {
      id: 1,
      prompt: 'Find the derivative of f(x) = x^3 \\cdot e^{2x} with respect to x.',
      options: [
        '3x^2 \\cdot e^{2x}',
        'x^2 \\cdot e^{2x}(3 + 2x)',
        '2x^3 \\cdot e^{2x} + 3x^2',
        '6x^2 \\cdot e^{2x}'
      ],
      correctIndex: 1,
      explanation: 'Use the product rule: (u·v)\' = u\'v + uv\'. Here u = x^3 ⇒ u\' = 3x^2, and v = e^{2x} ⇒ v\' = 2e^{2x}. So f\'(x) = 3x^2 e^{2x} + 2x^3 e^{2x} = x^2 e^{2x}(3 + 2x).'
    },
    {
      id: 2,
      prompt: 'Evaluate the definite integral: \\int_0^2 (3x^2 - 4x + 1) dx.',
      options: ['2', '4', '6', '0'],
      correctIndex: 0,
      explanation: 'Antiderivative F(x) = [x^3 - 2x^2 + x]. Evaluated from 0 to 2: F(2) = 2^3 - 2(2^2) + 2 = 8 - 8 + 2 = 2. F(0) = 0. Result = 2 - 0 = 2.'
    },
    {
      id: 3,
      prompt: 'Which test confirms the convergence of the infinite series \\sum_{n=1}^\\infty \\frac{1}{n^2 + 3}?',
      options: [
        'Direct Comparison Test with \\sum 1/n^2 (p-series, p=2 > 1)',
        'Divergence Test (nth term test)',
        'Ratio Test yields L = 1 (inconclusive)',
        'Root Test yields L > 1'
      ],
      correctIndex: 0,
      explanation: 'For all n ≥ 1, \\frac{1}{n^2 + 3} < \\frac{1}{n^2}. Since \\sum \\frac{1}{n^2} is a convergent p-series with p = 2 > 1, the original series converges by the Direct Comparison Test.'
    }
  ]
};

// Initial exam structure data
const INITIAL_MODULES = [
  {
    id: 'mod-1',
    title: 'Limits & Continuity',
    questionsCount: 45,
    estimatedTime: '45 mins',
    difficulty: 'Medium',
    completed: true,
    score: '92%'
  },
  {
    id: 'mod-2',
    title: 'Differentiation: Definition & Fundamental Rules',
    questionsCount: 60,
    estimatedTime: '1 hour',
    difficulty: 'Medium',
    completed: true,
    score: '88%'
  },
  {
    id: 'mod-3',
    title: 'Composite, Implicit & Inverse Functions',
    questionsCount: 50,
    estimatedTime: '55 mins',
    difficulty: 'Hard',
    completed: false,
    score: null
  },
  {
    id: 'mod-4',
    title: 'Contextual & Analytical Applications of Differentiation',
    questionsCount: 55,
    estimatedTime: '1 hour',
    difficulty: 'Hard',
    completed: false,
    score: null
  },
  {
    id: 'mod-5',
    title: 'Integration & Accumulation of Change',
    questionsCount: 70,
    estimatedTime: '1h 15m',
    difficulty: 'Hard',
    completed: false,
    score: null
  },
  {
    id: 'mod-6',
    title: 'Differential Equations & Exponential Modeling',
    questionsCount: 40,
    estimatedTime: '45 mins',
    difficulty: 'Medium',
    completed: false,
    score: null
  },
  {
    id: 'mod-7',
    title: 'Applications of Integration (Volume, Arc Length)',
    questionsCount: 65,
    estimatedTime: '1h 10m',
    difficulty: 'Hard',
    completed: false,
    score: null
  },
  {
    id: 'mod-8',
    title: 'Parametric Equations, Polar Coordinates & Vectors',
    questionsCount: 55,
    estimatedTime: '1 hour',
    difficulty: 'Expert (BC)',
    completed: false,
    score: null
  },
  {
    id: 'mod-9',
    title: 'Infinite Sequences & Series (Taylor / Maclaurin)',
    questionsCount: 80,
    estimatedTime: '1h 30m',
    difficulty: 'Expert (BC)',
    completed: false,
    score: null
  }
];

export default function ApCalculus() {
  const [modules, setModules] = useState(INITIAL_MODULES);
  const [activeTab, setActiveTab] = useState('modules'); // 'modules' | 'mocks' | 'formulas'
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  // --- INTERACTIVE PRACTICE SESSION STATE ---
  const [practiceSession, setPracticeSession] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Timer runner during active practice
  useEffect(() => {
    let interval = null;
    if (practiceSession && !sessionCompleted) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [practiceSession, sessionCompleted]);

  // Launch a practice session for a module or mock
  const startPractice = (title, moduleId = 'default') => {
    const questions = PRACTICE_QUESTIONS[moduleId] || PRACTICE_QUESTIONS['default'];
    setPracticeSession({
      title,
      moduleId,
      questions
    });
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setSessionCompleted(false);
    setTimerSeconds(0);
  };

  // Submit current answer
  const handleAnswerSubmit = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const currentQ = practiceSession.questions[currentQIndex];
    if (selectedOption === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

  // Move to next question or complete drill
  const handleNextQuestion = () => {
    if (currentQIndex + 1 < practiceSession.questions.length) {
      setCurrentQIndex((i) => i + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setSessionCompleted(true);
      const percentage = Math.round(
        ((score + (selectedOption === practiceSession.questions[currentQIndex].correctIndex ? 0 : 0)) /
          practiceSession.questions.length) *
          100
      );
      setModules((prev) =>
        prev.map((m) =>
          m.id === practiceSession.moduleId ? { ...m, completed: true, score: `${percentage}%` } : m
        )
      );
    }
  };

  // Exit practice modal
  const closePractice = () => {
    setPracticeSession(null);
  };

  const filteredModules = modules.filter((m) => {
    if (filterDifficulty === 'all') return true;
    return m.difficulty.toLowerCase().includes(filterDifficulty.toLowerCase());
  });

  const completedCount = modules.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  // Format timer as mm:ss
  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${remainingSec < 10 ? '0' : ''}${remainingSec}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* 1. TOP BREADCRUMB & BACK NAVIGATION */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
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
            <span>AP Exams</span>
            <span>/</span>
            <span className="text-slate-800 font-bold">AP Calculus BC & AB</span>
          </div>
        </div>
      </div>

      {/* 2. HERO / EXAM OVERVIEW BANNER */}
      <section className="bg-white border-b border-slate-200 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <span>🎓</span> College Board Aligned
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Target Score: 5
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                AP Calculus BC & AB
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Master Limits, Derivatives, Integrals, Series, and official College Board scoring rubrics
                for both Section I (Multiple Choice) and Section II (Free Response Questions).
              </p>

              {/* Progress Bar */}
              <div className="mt-5 flex items-center gap-4">
                <div className="flex-1 max-w-xs bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  {completedCount} of {modules.length} Modules Mastered ({progressPercent}%)
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
              <button
                type="button"
                onClick={() => {
                  const nextIncomplete = modules.find((m) => !m.completed) || modules[0];
                  startPractice(nextIncomplete.title, nextIncomplete.id);
                }}
                className="w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>⚡ Continue Practice</span>
              </button>
              <button
                type="button"
                onClick={() => startPractice('2024 Pattern Diagnostic Test A', 'default')}
                className="w-full px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all text-center"
              >
                Take Diagnostic Mock
              </button>
            </div>

          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Diagnostic Tests</div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">3 Full-Length</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Practice Bank</div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">640+ Problems</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Time Allowed</div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">3h 15m</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Pass Rate</div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">78.4%</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TABS HEADER */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('modules')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'modules'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              Curriculum Units (9)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('mocks')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'mocks'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              Full Practice Tests (3)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('formulas')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'formulas'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              Formula Cheat Sheet
            </button>
          </div>

          {activeTab === 'modules' && (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400">Difficulty:</span>
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="bg-white border border-slate-200 text-xs font-bold text-slate-700 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
              >
                <option value="all">All Difficulties</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="expert">Expert (BC)</option>
              </select>
            </div>
          )}
        </div>

        {/* TAB 1: CURRICULUM UNITS */}
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
                        module.difficulty.includes('Expert')
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : module.difficulty === 'Hard'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {module.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
                      <span>{module.questionsCount} practice problems</span>
                      <span>•</span>
                      <span>Est. {module.estimatedTime}</span>
                      {module.score && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-600 font-bold">Best Score: {module.score}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => startPractice(module.title, module.id)}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      module.completed
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/25'
                    }`}
                  >
                    {module.completed ? 'Practice Again' : 'Start Practice'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: FULL MOCK EXAMS */}
        {activeTab === 'mocks' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 'mock-1',
                title: '2024 College Board Diagnostic Simulation A',
                type: 'Section I: 45 MCQs + Section II: 6 FRQs',
                time: '195 mins'
              },
              {
                id: 'mock-2',
                title: '2023 Official Pattern Mock Simulation B',
                type: 'Full Timed Simulation',
                time: '195 mins'
              },
              {
                id: 'mock-3',
                title: 'High-Yield Hardest FRQs (Taylor Series & Diff Eq)',
                type: 'Section II Specialty Drill',
                time: '90 mins'
              }
            ].map((mock) => (
              <div
                key={mock.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-blue-500 transition-all"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
                    {mock.type}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg leading-snug">
                    {mock.title}
                  </h3>
                  <div className="mt-3 text-xs text-slate-500 font-medium flex items-center gap-3">
                    <span>⏱ {mock.time}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">Official College Board Rubric</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => startPractice(mock.title, 'default')}
                  className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Start Timed Test
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: FORMULAS */}
        {activeTab === 'formulas' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">High-Yield AP Calculus Formulas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-blue-600 uppercase">Derivatives</span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">Fundamental Theorem of Calculus</h4>
                <p className="text-xs text-slate-600 font-mono mt-1 bg-white p-2 rounded border border-slate-200">
                  d/dx ∫[a to x] f(t) dt = f(x)
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-blue-600 uppercase">Integration</span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">Integration by Parts</h4>
                <p className="text-xs text-slate-600 font-mono mt-1 bg-white p-2 rounded border border-slate-200">
                  ∫ u dv = u·v - ∫ v du
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-purple-600 uppercase">Series (BC Only)</span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">Taylor Series expansion around x = a</h4>
                <p className="text-xs text-slate-600 font-mono mt-1 bg-white p-2 rounded border border-slate-200">
                  f(x) = Σ [f^(n)(a) / n!] · (x - a)^n
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-amber-600 uppercase">Solids & Volumes</span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">Washer Method Volume</h4>
                <p className="text-xs text-slate-600 font-mono mt-1 bg-white p-2 rounded border border-slate-200">
                  V = π ∫ [R(x)² - r(x)²] dx
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. FOOTER */}
      <Footer />

      {/* 5. INTERACTIVE PRACTICE DRILL MODAL RUNNER */}
      {practiceSession && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                  Practice Drill
                </span>
                <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                  {practiceSession.title}
                </h3>
              </div>

              <div className="flex items-center gap-4">
                <div className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-slate-700">
                  ⏱ {formatTimer(timerSeconds)}
                </div>
                <button
                  type="button"
                  onClick={closePractice}
                  className="w-8 h-8 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center text-sm font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {!sessionCompleted ? (
                <div>
                  {/* Progress Indicator */}
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-3">
                    <span>Question {currentQIndex + 1} of {practiceSession.questions.length}</span>
                    <span>Score: {score}/{currentQIndex + (isAnswerSubmitted && selectedOption === practiceSession.questions[currentQIndex].correctIndex ? 1 : 0)}</span>
                  </div>

                  {/* Question Box */}
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 font-medium text-base mb-5">
                    {practiceSession.questions[currentQIndex].prompt}
                  </div>

                  {/* Options */}
                  <div className="space-y-2.5">
                    {practiceSession.questions[currentQIndex].options.map((opt, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === practiceSession.questions[currentQIndex].correctIndex;

                      let btnStyle = 'border-slate-200 bg-white hover:border-blue-500 text-slate-800';
                      if (isAnswerSubmitted) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'border-rose-500 bg-rose-50 text-rose-800';
                        } else {
                          btnStyle = 'border-slate-200 bg-white opacity-50';
                        }
                      } else if (isSelected) {
                        btnStyle = 'border-blue-600 bg-blue-50 text-blue-700 font-semibold';
                      }

                      return (
                        <button
                          key={idx}
                          type="button"
                          disabled={isAnswerSubmitted}
                          onClick={() => setSelectedOption(idx)}
                          className={`w-full p-3.5 rounded-xl border text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center">
                              {['A', 'B', 'C', 'D'][idx]}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isAnswerSubmitted && isCorrect && (
                            <span className="text-emerald-600 text-xs font-bold">✓ Correct</span>
                          )}
                          {isAnswerSubmitted && isSelected && !isCorrect && (
                            <span className="text-rose-600 text-xs font-bold">✕ Incorrect</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Explanation after submit */}
                  {isAnswerSubmitted && (
                    <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
                      <strong className="block font-bold mb-1">Step-by-step Solution:</strong>
                      {practiceSession.questions[currentQIndex].explanation}
                    </div>
                  )}
                </div>
              ) : (
                /* Completed Summary View */
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-black mx-auto mb-4">
                    🎉
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Drill Completed!</h3>
                  <p className="text-xs text-slate-500 mt-1">You just finished {practiceSession.title}</p>

                  <div className="my-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto flex items-center justify-around">
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase">Score</div>
                      <div className="text-2xl font-black text-slate-900">{score} / {practiceSession.questions.length}</div>
                    </div>
                    <div className="h-8 w-px bg-slate-200" />
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase">Time</div>
                      <div className="text-2xl font-black text-slate-900">{formatTimer(timerSeconds)}</div>
                    </div>
                  </div>

                  <p className="text-xs text-emerald-600 font-bold mb-6">
                    ✓ Progress updated on your curriculum tracker!
                  </p>

                  <button
                    type="button"
                    onClick={closePractice}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all"
                  >
                    Back to Curriculum
                  </button>
                </div>
              )}
            </div>

            {/* Modal Footer Controls */}
            {!sessionCompleted && (
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={closePractice}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                >
                  Exit Drill
                </button>

                {!isAnswerSubmitted ? (
                  <button
                    type="button"
                    disabled={selectedOption === null}
                    onClick={handleAnswerSubmit}
                    className="px-5 py-2.5 bg-blue-600 disabled:opacity-50 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
                  >
                    {currentQIndex + 1 < practiceSession.questions.length ? 'Next Question →' : 'Finish Drill'}
                  </button>
                )}
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}