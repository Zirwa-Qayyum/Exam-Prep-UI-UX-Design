import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// Comprehensive ACT Practice Question Bank with Real Passages & Data
const ACT_DRILL_BANK = {
  science: [
    {
      id: 'sci-1',
      subject: 'Science Reasoning',
      topic: 'Data Representation (Reaction Kinetics)',
      passage: `A student group investigated the effect of temperature and enzyme concentration on the rate of oxygen gas production in milliliters per minute (mL/min) during hydrogen peroxide decomposition.

Table 1: Reaction Rates (mL/min) at Varying Temperatures & Enzyme Concentrations
• Trial 1 (15°C, 1% Enzyme): 12.4 mL/min
• Trial 2 (25°C, 1% Enzyme): 24.8 mL/min
• Trial 3 (37°C, 1% Enzyme): 48.2 mL/min
• Trial 4 (50°C, 1% Enzyme): 8.1 mL/min (Enzyme denaturation observed)
• Trial 5 (25°C, 2% Enzyme): 49.5 mL/min`,
      question: 'Based on Table 1, if the experiment was repeated at 25°C with a 1.5% enzyme concentration, the predicted oxygen production rate would most likely be:',
      options: [
        'A. Less than 12.4 mL/min',
        'B. Between 24.8 mL/min and 49.5 mL/min',
        'C. Exactly 8.1 mL/min',
        'D. Greater than 60.0 mL/min'
      ],
      correct: 1, // Index 1 = B
      explanation: 'At 25°C, 1% enzyme yields 24.8 mL/min, and 2% enzyme yields 49.5 mL/min. Since enzyme concentration and reaction rate exhibit a direct positive correlation before saturation, a 1.5% enzyme solution at 25°C will produce a rate between 24.8 and 49.5 mL/min.'
    },
    {
      id: 'sci-2',
      subject: 'Science Reasoning',
      topic: 'Research Summaries (Planetary Physics)',
      passage: `Experiment 2: A wheeled cart of mass M was released from rest at the top of an inclined plane of height h = 1.2 m. The velocity at the bottom was recorded across 3 trials with different surface friction coefficients μ:
• Smooth Ice (μ ≈ 0.02): v = 4.80 m/s
• Polished Wood (μ = 0.25): v = 4.25 m/s
• Rough Rubber (μ = 0.65): v = 2.95 m/s`,
      question: 'Which of the following hypotheses is best supported by the velocity data in Experiment 2?',
      options: [
        'A. Frictional force converts mechanical energy into thermal energy, decreasing final velocity.',
        'B. Mass is the sole determinant of acceleration down an inclined plane.',
        'C. Rougher surfaces increase the gravitational potential energy at height h.',
        'D. Velocity remains constant regardless of frictional coefficient μ.'
      ],
      correct: 0,
      explanation: 'As the surface friction coefficient increased from 0.02 to 0.65, the final velocity dropped from 4.80 m/s to 2.95 m/s. Work done by non-conservative friction dissipates kinetic energy as thermal energy.'
    }
  ],
  math: [
    {
      id: 'math-1',
      subject: 'ACT Math Sprint',
      topic: 'Plane Trigonometry & Angle Identities',
      passage: 'Consider right triangle ABC with right angle at C. The length of hypotenuse AB is 13 cm, and the length of leg BC is 5 cm.',
      question: 'What is the exact value of tan(A)?',
      options: [
        'A. 5 / 12',
        'B. 12 / 5',
        'C. 5 / 13',
        'D. 12 / 13'
      ],
      correct: 0,
      explanation: 'Using the Pythagorean theorem: AC = √(13² - 5²) = √(169 - 25) = √144 = 12. Since tan(A) = Opposite / Adjacent = BC / AC, tan(A) = 5 / 12.'
    },
    {
      id: 'math-2',
      subject: 'ACT Math Sprint',
      topic: 'Algebra & Quadratic Optimization',
      passage: 'A rectangular garden is enclosed by 60 feet of fencing along three sides, with the fourth side bordered by an existing brick barn wall.',
      question: 'If x represents the width perpendicular to the barn wall, what value of x maximizes the garden area?',
      options: [
        'A. 10 feet',
        'B. 15 feet',
        'C. 20 feet',
        'D. 30 feet'
      ],
      correct: 1,
      explanation: 'Fencing equation: 2x + L = 60 => L = 60 - 2x. Area A(x) = x(60 - 2x) = -2x² + 60x. The vertex of a parabola occurs at x = -b / (2a) = -60 / (2 * -2) = 15 feet.'
    }
  ],
  english: [
    {
      id: 'eng-1',
      subject: 'English Mechanics',
      topic: 'Sentence Structure & Comma Splices',
      passage: 'The archival manuscript was remarkably well preserved [1] however the ink on the outer parchment had begun to oxidize into a faint amber hue.',
      question: 'Which of the following choices best replaces [1] in the underlined passage?',
      options: [
        'A. preserved; however,',
        'B. preserved, however',
        'C. preserved however,',
        'D. preserved; however'
      ],
      correct: 0,
      explanation: '"However" acts as a conjunctive adverb joining two independent clauses. It requires either a semicolon before it and a comma after it ("; however,"), or a full stop.'
    }
  ],
  reading: [
    {
      id: 'read-1',
      subject: 'Reading Sprint',
      topic: 'Natural Science Passage Synthesis',
      passage: 'Bioluminescence in deep-sea cephalopods serves paradoxical dual objectives: illuminating benthic prey while simultaneously obscuring the predator against downwelling surface twilight through counter-illumination photophores.',
      question: 'As used in the passage, the word "obscuring" most nearly means:',
      options: [
        'A. Camouflaging',
        'B. Confusing',
        'C. Darkening',
        'D. Extinguishing'
      ],
      correct: 0,
      explanation: 'The context describes "counter-illumination photophores," which cephalopods use to match twilight from above and blend in, meaning "camouflaging" or concealing themselves.'
    }
  ]
};

// Exam Overview Metadata
const EXAM_DATA = {
  title: 'ACT Science & Fast-Paced Math',
  badge: 'ACT Inc. Standard Aligned',
  targetScore: 'Target Composite: 34+',
  stats: [
    { label: 'Speed Diagnostic', value: '4 Full Tests' },
    { label: 'Time Allowed', value: '2h 55m' },
    { label: 'Avg Pace / Question', value: '52 Seconds' },
    { label: 'Target Percentile', value: '99th (Top 1%)' }
  ],
  modules: [
    {
      id: 'science-1',
      category: 'science',
      title: 'Science: Data Representation & Trend Grids',
      questionsCount: 40,
      estimatedTime: '35 mins',
      difficulty: 'Pacing Focus',
      completed: true,
      score: '33/36'
    },
    {
      id: 'science-2',
      category: 'science',
      title: 'Science: Research Summaries & Variable Isolation',
      questionsCount: 35,
      estimatedTime: '35 mins',
      difficulty: 'Hard',
      completed: false,
      score: null
    },
    {
      id: 'math-1',
      category: 'math',
      title: 'Math: 60-Question 60-Minute Algebra & Geometry Sprint',
      questionsCount: 60,
      estimatedTime: '60 mins',
      difficulty: 'High Speed',
      completed: true,
      score: '35/36'
    },
    {
      id: 'math-2',
      category: 'math',
      title: 'Math: Trigonometry & Advanced Matrices',
      questionsCount: 30,
      estimatedTime: '30 mins',
      difficulty: 'Hard',
      completed: false,
      score: null
    },
    {
      id: 'english-1',
      category: 'english',
      title: 'English: Punctuation, Modifiers & Rhetorical Skills',
      questionsCount: 75,
      estimatedTime: '45 mins',
      difficulty: 'Fast Paced',
      completed: false,
      score: null
    },
    {
      id: 'reading-1',
      category: 'reading',
      title: 'Reading: 8.5-Minute Passage Sprint Strategy',
      questionsCount: 40,
      estimatedTime: '35 mins',
      difficulty: 'High Speed',
      completed: false,
      score: null
    }
  ],
  mockExams: [
    {
      id: 'mock-1',
      category: 'science',
      title: 'Full ACT Science 35-Minute Official Sprint Test',
      type: 'Official Format • 40 Questions',
      time: '35 mins'
    },
    {
      id: 'mock-2',
      category: 'math',
      title: 'Full ACT Math 60-Question Speed Drill',
      type: '1 min / Question Sprint',
      time: '60 mins'
    },
    {
      id: 'mock-3',
      category: 'english',
      title: 'Complete 4-Section Diagnostic Simulation',
      type: 'Composite Score 1-36',
      time: '175 mins'
    }
  ]
};

export default function ActPrep() {
  const [activeTab, setActiveTab] = useState('modules'); // 'modules' | 'mocks' | 'strategies'

  // Drill Runner State
  const [drillActive, setDrillActive] = useState(false);
  const [drillCategory, setDrillCategory] = useState('science');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [drillCompleted, setDrillCompleted] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(120);

  // Active Questions List based on selected category
  const activeQuestions = ACT_DRILL_BANK[drillCategory] || ACT_DRILL_BANK.science;
  const currentQ = activeQuestions[currentIndex];

  // Live Timer Countdown for authenticity
  useEffect(() => {
    let interval = null;
    if (drillActive && !drillCompleted && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [drillActive, drillCompleted, timerSeconds]);

  // Start a drill for any category
  const handleStartDrill = (category = 'science') => {
    setDrillCategory(category);
    setCurrentIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setCorrectCount(0);
    setDrillCompleted(false);
    setTimerSeconds(150); // 2.5 minutes per drill set
    setDrillActive(true);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Submit Answer
  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    if (selectedOption === currentQ.correct) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  // Next Question
  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setDrillCompleted(true);
    }
  };

  const formatTimer = (totalSec) => {
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      
      {/* 1. TOP BREADCRUMB */}
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
            <span>ACT</span>
            <span>/</span>
            <span className="text-slate-700 font-semibold">Science & Math Sprint</span>
          </div>
        </div>
      </div>

      {/* 2. EXAM HERO OVERVIEW */}
      <section className="bg-white border-b border-slate-200 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-200">
                  <span>📖</span> {EXAM_DATA.badge}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {EXAM_DATA.targetScore}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {EXAM_DATA.title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Aggressive time management protocols for the 35-minute Science reasoning chart blitz,
                rapid algebraic equations, and precision punctuation heuristics.
              </p>

              {/* Pacing Speed Indicator */}
              <div className="mt-5 flex items-center gap-3">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-700">
                  Target: &lt; 52.5 sec / question on Science passages
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
              <button
                type="button"
                onClick={() => handleStartDrill('science')}
                className="w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>⚡</span>
                <span>Start Science Speed Drill</span>
              </button>
              <button
                type="button"
                onClick={() => handleStartDrill('math')}
                className="w-full px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all text-center flex items-center justify-center gap-2"
              >
                <span>📐</span>
                <span>Start Math 60s Drill</span>
              </button>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
            {EXAM_DATA.stats.map((stat, i) => (
              <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{stat.label}</div>
                <div className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. LIVE INTERACTIVE DRILL ARENA (WHEN ACTIVE) */}
      {drillActive && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-3xl border-2 border-blue-600 shadow-xl overflow-hidden transition-all">
            
            {/* Drill Top Bar */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                  ACT
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white capitalize">{currentQ.subject}</h3>
                  <p className="text-[11px] text-slate-400">{currentQ.topic}</p>
                </div>
              </div>

              {/* Timer & Close */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-lg text-xs font-mono font-bold text-amber-400 border border-slate-700">
                  <span>⏱</span>
                  <span>{formatTimer(timerSeconds)}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDrillActive(false)}
                  className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
                >
                  ✕ Close Drill
                </button>
              </div>
            </div>

            {/* Drill Body */}
            {!drillCompleted ? (
              <div className="p-6 sm:p-8">
                
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
                  <span>Question {currentIndex + 1} of {activeQuestions.length}</span>
                  <span>Score: {correctCount} Correct</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
                  <div
                    className="bg-blue-600 h-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
                  />
                </div>

                {/* Stimulus / Passage / Table */}
                {currentQ.passage && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 text-sm text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                    {currentQ.passage}
                  </div>
                )}

                {/* Question */}
                <h4 className="text-base font-extrabold text-slate-900 mb-4">
                  {currentQ.question}
                </h4>

                {/* Options */}
                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentQ.correct;

                    let btnClass = 'bg-white border-slate-200 text-slate-700 hover:border-blue-400';
                    if (isSelected) {
                      btnClass = 'bg-blue-50 border-blue-600 text-blue-900 font-bold';
                    }
                    if (submitted) {
                      if (isCorrect) {
                        btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnClass = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={submitted}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${btnClass}`}
                      >
                        <span>{option}</span>
                        {submitted && isCorrect && <span className="text-emerald-600 font-bold">✓ Correct</span>}
                        {submitted && isSelected && !isCorrect && <span className="text-rose-600 font-bold">✗ Incorrect</span>}
                      </button>
                    );
                  })}
                </div>

                {/* Feedback & Rationale */}
                {submitted && (
                  <div className={`mt-5 p-4 rounded-xl border text-xs leading-relaxed ${
                    selectedOption === currentQ.correct
                      ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50/80 border-rose-200 text-rose-900'
                  }`}>
                    <strong className="block font-bold mb-1">
                      {selectedOption === currentQ.correct ? '🎯 Great work! Correct Strategy' : '💡 Explanation:'}
                    </strong>
                    {currentQ.explanation}
                  </div>
                )}

                {/* Action CTA */}
                <div className="mt-6 flex justify-end gap-3">
                  {!submitted ? (
                    <button
                      type="button"
                      disabled={selectedOption === null}
                      onClick={handleCheckAnswer}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                    >
                      <span>{currentIndex + 1 < activeQuestions.length ? 'Next Question' : 'View Results'}</span>
                      <span>→</span>
                    </button>
                  )}
                </div>

              </div>
            ) : (
              /* Drill Finished Screen */
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 font-black text-2xl flex items-center justify-center mx-auto mb-4">
                  🏆
                </div>
                <h3 className="text-2xl font-black text-slate-900">Drill Completed!</h3>
                <p className="text-sm text-slate-500 mt-1">
                  You scored <strong className="text-slate-900">{correctCount}</strong> out of{' '}
                  <strong className="text-slate-900">{activeQuestions.length}</strong> correct.
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleStartDrill(drillCategory)}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    Retake Drill
                  </button>
                  <button
                    type="button"
                    onClick={() => setDrillActive(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                  >
                    Back to Curriculum
                  </button>
                </div>
              </div>
            )}

          </div>
        </section>
      )}

      {/* 4. MAIN CURRICULUM & MOCKS TABS */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        
        {/* Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab('modules')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
              activeTab === 'modules'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            Speed Modules (6)
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
            Timed Full Tests (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('strategies')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
              activeTab === 'strategies'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            Pacing Cheat Codes
          </button>
        </div>

        {/* TAB 1: MODULES */}
        {activeTab === 'modules' && (
          <div className="space-y-3.5">
            {EXAM_DATA.modules.map((module, idx) => (
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
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {module.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
                      <span>{module.questionsCount} problems</span>
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

                {/* Start Drill Button connected to live drill */}
                <button
                  type="button"
                  onClick={() => handleStartDrill(module.category)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm shadow-blue-500/25 transition-all self-end sm:self-center"
                >
                  Start Drill
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: FULL MOCK EXAMS */}
        {activeTab === 'mocks' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXAM_DATA.mockExams.map((mock) => (
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
                    <span className="text-emerald-600 font-bold">Standard 36 Scale</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartDrill(mock.category)}
                  className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Start Timed Test
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: STRATEGIES */}
        {activeTab === 'strategies' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">ACT High-Yield Speed Shortcuts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-blue-600 uppercase">Science Section</span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">Direct Chart Scanning (Skip the Text)</h4>
                <p className="text-xs text-slate-600 mt-1">
                  85% of Data Representation questions only require locating axes, units, and trend slopes without reading the paragraph.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-teal-600 uppercase">Math Section</span>
                <h4 className="font-bold text-slate-800 text-sm mt-1">First 30 in 20 Minutes</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Questions 1–30 are easiest. Bank 10+ extra minutes for questions 45–60 where complex trigonometry and conic sections sit.
                </p>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* 5. FOOTER COMPONENT */}
      <Footer />

    </div>
  );
}