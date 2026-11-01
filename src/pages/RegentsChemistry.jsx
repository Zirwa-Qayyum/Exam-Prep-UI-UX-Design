import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// --- NY REGENTS CHEMISTRY QUESTION BANK ---
const CHEMISTRY_QUESTIONS = {
  'chem-mod-1': [
    {
      id: 1,
      prompt: 'Which subatomic particles are located in the nucleus of a carbon-14 atom?',
      options: [
        '6 protons and 8 neutrons',
        '6 protons and 8 electrons',
        '8 protons and 6 neutrons',
        '6 neutrons and 8 electrons'
      ],
      correctIndex: 0,
      explanation: 'Carbon always has atomic number Z = 6 (6 protons). For carbon-14, mass number A = 14. Neutrons = 14 - 6 = 8. Protons and neutrons reside in the nucleus.'
    },
    {
      id: 2,
      prompt: 'Which electron configuration represents an atom of chlorine in an excited state?',
      options: ['2-8-7', '2-8-8', '2-7-8', '2-8-6-1'],
      correctIndex: 2,
      explanation: 'Chlorine ground state is 2-8-7 (total 17 electrons). In 2-7-8, one electron from the second shell jumped to the third shell without changing the total count (2 + 7 + 8 = 17).'
    },
    {
      id: 3,
      prompt: 'According to Reference Table S, which element has the lowest first ionization energy?',
      options: ['Fluorine (F)', 'Cesium (Cs)', 'Sodium (Na)', 'Helium (He)'],
      correctIndex: 1,
      explanation: 'First ionization energy decreases down a group due to increased shielding and atomic radius. Cesium has one of the lowest ionization energies (376 kJ/mol) in Table S.'
    }
  ],
  'chem-mod-2': [
    {
      id: 1,
      prompt: 'Given the balanced equation: 2H2(g) + O2(g) -> 2H2O(g). How many moles of H2O are produced from 5.0 moles of O2 completely reacting?',
      options: ['2.5 moles', '5.0 moles', '10.0 moles', '20.0 moles'],
      correctIndex: 2,
      explanation: 'Mole ratio of O2 to H2O is 1 : 2. Therefore, 5.0 mol O2 * (2 mol H2O / 1 mol O2) = 10.0 moles of H2O.'
    },
    {
      id: 2,
      prompt: 'What is the gram-formula mass of calcium nitrate, Ca(NO3)2? (Ca = 40.1, N = 14.0, O = 16.0)',
      options: ['102.1 g/mol', '164.1 g/mol', '150.1 g/mol', '204.2 g/mol'],
      correctIndex: 1,
      explanation: 'Mass = 40.1 + 2*(14.0) + 6*(16.0) = 40.1 + 28.0 + 96.0 = 164.1 g/mol.'
    }
  ],
  'default': [
    {
      id: 1,
      prompt: 'According to Le Chatelier’s principle, increasing pressure on N2(g) + 3H2(g) <=> 2NH3(g) shifts the equilibrium:',
      options: [
        'To the right (toward fewer moles of gas)',
        'To the left (toward more moles of gas)',
        'No shift occurs',
        'Toward reactant decomposition'
      ],
      correctIndex: 0,
      explanation: 'Reactant side has 1 + 3 = 4 gas moles. Product side has 2 gas moles. Increasing pressure shifts equilibrium toward the side with fewer gas moles (forward/right).'
    },
    {
      id: 2,
      prompt: 'What is the pH of a solution with a hydronium ion concentration [H3O+] = 1.0 x 10^-4 M?',
      options: ['4.0', '10.0', '7.0', '1.0'],
      correctIndex: 0,
      explanation: 'pH = -log[H3O+] = -log(1.0 x 10^-4) = 4.0. The solution is acidic.'
    }
  ]
};

const INITIAL_CHEM_MODULES = [
  {
    id: 'chem-mod-1',
    title: 'Atomic Concepts & Electron Configurations',
    questionsCount: 40,
    estimatedTime: '40 mins',
    difficulty: 'Medium',
    completed: true,
    score: '90%'
  },
  {
    id: 'chem-mod-2',
    title: 'Periodic Table Trends (Table S & Electronegativity)',
    questionsCount: 45,
    estimatedTime: '45 mins',
    difficulty: 'Medium',
    completed: true,
    score: '85%'
  },
  {
    id: 'chem-mod-3',
    title: 'Moles, Stoichiometry & Formula Mass (Table T)',
    questionsCount: 50,
    estimatedTime: '1 hour',
    difficulty: 'Hard',
    completed: false,
    score: null
  },
  {
    id: 'chem-mod-4',
    title: 'Chemical Bonding (Ionic, Covalent, Intermolecular)',
    questionsCount: 48,
    estimatedTime: '50 mins',
    difficulty: 'Medium',
    completed: false,
    score: null
  },
  {
    id: 'chem-mod-5',
    title: 'Physical Behavior of Matter & Gas Laws (PV=nRT)',
    questionsCount: 42,
    estimatedTime: '45 mins',
    difficulty: 'Medium',
    completed: false,
    score: null
  },
  {
    id: 'chem-mod-6',
    title: 'Kinetics, Le Chatelier & Equilibrium (Table I)',
    questionsCount: 55,
    estimatedTime: '1 hour',
    difficulty: 'Hard',
    completed: false,
    score: null
  },
  {
    id: 'chem-mod-7',
    title: 'Acids, Bases, Titration & Indicators (Tables K, L, M)',
    questionsCount: 50,
    estimatedTime: '55 mins',
    difficulty: 'Hard',
    completed: false,
    score: null
  },
  {
    id: 'chem-mod-8',
    title: 'Oxidation-Reduction & Electrochemistry (Table J)',
    questionsCount: 44,
    estimatedTime: '50 mins',
    difficulty: 'Hard',
    completed: false,
    score: null
  },
  {
    id: 'chem-mod-9',
    title: 'Organic Chemistry & Functional Groups (Tables P, Q, R)',
    questionsCount: 40,
    estimatedTime: '45 mins',
    difficulty: 'Medium',
    completed: false,
    score: null
  },
  {
    id: 'chem-mod-10',
    title: 'Nuclear Chemistry (Decay Modes & Half-Life Table N)',
    questionsCount: 35,
    estimatedTime: '35 mins',
    difficulty: 'Medium',
    completed: false,
    score: null
  }
];

export default function RegentsChemistry() {
  const [modules, setModules] = useState(INITIAL_CHEM_MODULES);
  const [activeTab, setActiveTab] = useState('modules'); // 'modules' | 'mocks' | 'tables'
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  // Practice drill runner state
  const [practiceSession, setPracticeSession] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (practiceSession && !sessionCompleted) {
      interval = setInterval(() => setTimerSeconds((prev) => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [practiceSession, sessionCompleted]);

  const startPractice = (title, moduleId = 'default') => {
    const questions = CHEMISTRY_QUESTIONS[moduleId] || CHEMISTRY_QUESTIONS['default'];
    setPracticeSession({ title, moduleId, questions });
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setSessionCompleted(false);
    setTimerSeconds(0);
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const currentQ = practiceSession.questions[currentQIndex];
    if (selectedOption === currentQ.correctIndex) {
      setScore((s) => s + 1);
    }
  };

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

  const closePractice = () => setPracticeSession(null);

  const filteredModules = modules.filter((m) => {
    if (filterDifficulty === 'all') return true;
    return m.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
  });

  const completedCount = modules.filter((m) => m.completed).length;
  const progressPercent = Math.round((completedCount / modules.length) * 100);

  const formatTimer = (sec) => {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${remainingSec < 10 ? '0' : ''}${remainingSec}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* 1. BREADCRUMB */}
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
            <span>Regents Exams</span>
            <span>/</span>
            <span className="text-slate-800 font-bold">NY Regents Chemistry</span>
          </div>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="bg-white border-b border-slate-200 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <span>🧪</span> NYS Physical Setting Aligned
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Target Mastery: 85+ (Honors)
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                NY Regents Chemistry Review
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Comprehensive preparation using official NYS Reference Tables (Tables A through T), 
                stoichiometry balance drills, and past 5-year exam packets for Parts A, B-1, B-2, and C.
              </p>

              {/* Progress bar */}
              <div className="mt-5 flex items-center gap-4">
                <div className="flex-1 max-w-xs bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  {completedCount} of {modules.length} Topics Mastered ({progressPercent}%)
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
                <span>⚡ Continue Topic Review</span>
              </button>
              <button
                type="button"
                onClick={() => startPractice('Official June Regents Chemistry Simulation', 'chem-mod-1')}
                className="w-full px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all text-center"
              >
                Full Exam Simulation
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Official Mocks</div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">12 Full Tests</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Question Bank</div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">480+ Regents Qs</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Exam Duration</div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">3h 00m</div>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mastery Rate</div>
              <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">84.2%</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TABS */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 w-full">
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
              Curriculum Topics (10)
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
              Past Regents Exams (4)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('tables')}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
                activeTab === 'tables'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-white hover:text-slate-900'
              }`}
            >
              NYS Reference Tables Cheat Sheet
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
              </select>
            </div>
          )}
        </div>

        {/* TAB 1: MODULES */}
        {activeTab === 'modules' && (
          <div className="space-y-3.5">
            {filteredModules.map((module, idx) => (
              <div
                key={module.id}
                className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
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
                      <h3 className="font-bold text-slate-900 text-base">{module.title}</h3>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          module.difficulty === 'Hard'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {module.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
                      <span>{module.questionsCount} Regents practice questions</span>
                      <span>•</span>
                      <span>Est. {module.estimatedTime}</span>
                      {module.score && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-600 font-bold">Best: {module.score}</span>
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

        {/* TAB 2: MOCKS */}
        {activeTab === 'mocks' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                id: 'reg-june-24',
                title: 'June 2024 Physical Setting / Chemistry Exam',
                format: 'Part A (30 MCQs) + Part B-1 (20 MCQs) + Part B-2 & C (Constructed Response)',
                time: '180 mins'
              },
              {
                id: 'reg-jan-24',
                title: 'January 2024 Official Regents Examination',
                format: 'Parts A, B-1, B-2 & Part C Free Response',
                time: '180 mins'
              },
              {
                id: 'reg-june-23',
                title: 'June 2023 Physical Setting / Chemistry Exam',
                format: 'Full 85-point Regents Standard',
                time: '180 mins'
              },
              {
                id: 'reg-high-yield',
                title: 'Stoichiometry & Table T Intensive Pack',
                format: 'Specialty Math & Reference Tables Drill',
                time: '75 mins'
              }
            ].map((mock) => (
              <div
                key={mock.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm hover:border-blue-500 transition-all"
              >
                <div>
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
                    {mock.format}
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg leading-snug">{mock.title}</h3>
                  <div className="mt-3 text-xs text-slate-500 font-medium flex items-center gap-3">
                    <span>⏱ {mock.time}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">85 Scale Score Aligned</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => startPractice(mock.title, 'chem-mod-1')}
                  className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Launch Timed Regents Exam
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: REFERENCE TABLES GUIDE */}
        {activeTab === 'tables' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              High-Yield NYS Chemistry Reference Tables
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-blue-600 uppercase">Table T</span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">Important Formulas</h4>
                <p className="text-xs text-slate-600 mt-1 font-mono bg-white p-2 rounded border border-slate-200">
                  q = mCΔT | MA·VA = MB·VB | Parts per Million = (mass solute / mass sol) * 10^6
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-blue-600 uppercase">Table J</span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">Activity Series</h4>
                <p className="text-xs text-slate-600 mt-1 bg-white p-2 rounded border border-slate-200">
                  Metals higher on Table J will spontaneously replace metals lower in single-replacement reactions.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-blue-600 uppercase">Table M</span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">Common Acid-Base Indicators</h4>
                <p className="text-xs text-slate-600 mt-1 font-mono bg-white p-2 rounded border border-slate-200">
                  Phenolphthalein: colorless (pH &lt; 8.2), pink (pH &gt; 9.0)
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-blue-600 uppercase">Table N & O</span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">Nuclear Chemistry & Decay Modes</h4>
                <p className="text-xs text-slate-600 mt-1 font-mono bg-white p-2 rounded border border-slate-200">
                  Alpha: 4/2 He | Beta: 0/-1 e | Positron: 0/+1 e | Gamma: 0/0 γ
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 4. PRACTICE DRILL MODAL */}
      {practiceSession && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                  Regents Practice Drill
                </span>
                <h3 className="text-base font-bold text-slate-900 line-clamp-1">{practiceSession.title}</h3>
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

            <div className="p-6 overflow-y-auto flex-1">
              {!sessionCompleted ? (
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-3">
                    <span>
                      Question {currentQIndex + 1} of {practiceSession.questions.length}
                    </span>
                    <span>
                      Score: {score}/
                      {currentQIndex +
                        (isAnswerSubmitted &&
                        selectedOption === practiceSession.questions[currentQIndex].correctIndex
                          ? 1
                          : 0)}
                    </span>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-slate-900 font-medium text-base mb-5">
                    {practiceSession.questions[currentQIndex].prompt}
                  </div>

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

                  {isAnswerSubmitted && (
                    <div className="mt-5 p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 leading-relaxed">
                      <strong className="block font-bold mb-1">Regents Scoring Explanation:</strong>
                      {practiceSession.questions[currentQIndex].explanation}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl font-black mx-auto mb-4">
                    🎉
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Drill Completed!</h3>
                  <p className="text-xs text-slate-500 mt-1">You finished {practiceSession.title}</p>
                  <div className="my-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto flex items-center justify-around">
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase">Score</div>
                      <div className="text-2xl font-black text-slate-900">
                        {score} / {practiceSession.questions.length}
                      </div>
                    </div>
                    <div className="h-8 w-px bg-slate-200" />
                    <div>
                      <div className="text-xs text-slate-400 font-semibold uppercase">Time</div>
                      <div className="text-2xl font-black text-slate-900">{formatTimer(timerSeconds)}</div>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-600 font-bold mb-6">
                    ✓ Progress updated on your Regents topic tracker!
                  </p>
                  <button
                    type="button"
                    onClick={closePractice}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all"
                  >
                    Back to Topics
                  </button>
                </div>
              )}
            </div>

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

      {/* Solid Blue Footer */}
      <Footer />
    </div>
  );
}