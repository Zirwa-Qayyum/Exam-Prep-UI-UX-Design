import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// IELTS Academic & General Training Exam Data
const EXAM_DATA = {
  title: 'IELTS Academic & General Prep',
  badge: 'Cambridge & IDP Aligned',
  targetBand: 'Target Band: 8.0+',
  description:
    'Comprehensive IELTS preparation with real audio recordings, timed reading passages, Task 1 & 2 essay evaluations, and interactive speaking simulators.',
  stats: [
    { label: 'Band Target', value: 'Band 8.0+' },
    { label: 'Audio Tracks', value: '48 Passages' },
    { label: 'Writing Prompts', value: '60+ Tasks' },
    { label: 'Avg Improvement', value: '+1.5 Bands' },
  ],
  modules: [
    {
      id: 'ielts-listening',
      unitNo: '01',
      title: 'Listening: Multi-Accent Mastery',
      tagline: 'Section 1 to 4 • 40 Questions',
      difficulty: 'Medium',
      duration: '30 mins (+10m transfer)',
      questionsCount: 40,
      description:
        'Practice British, Australian, Canadian, and American English audio clips with note completion, map labeling, and multiple-choice questions.',
      completed: true,
      bandScore: 'Band 8.5',
      highYield: 'Map labeling & spelling trap prevention',
    },
    {
      id: 'ielts-reading',
      unitNo: '02',
      title: 'Academic Reading: True/False/Not Given & Headings',
      tagline: '3 Passages • 2,750 Words',
      difficulty: 'Hard',
      duration: '60 mins',
      questionsCount: 40,
      description:
        'Skimming and scanning drills, matching headings, summary completion, and mastering tricky True / False / Not Given logic.',
      completed: true,
      bandScore: 'Band 8.0',
      highYield: 'TFNG vs YNNG logical distinctions',
    },
    {
      id: 'ielts-writing-1',
      unitNo: '03',
      title: 'Writing Task 1: Data Interpretation & Process Diagrams',
      tagline: '150+ Words • 20 Minutes',
      difficulty: 'Hard',
      duration: '20 mins',
      questionsCount: 15,
      description:
        'Line graphs, bar charts, pie charts, comparison tables, maps (past vs present), and manufacturing cycle descriptions.',
      completed: false,
      bandScore: null,
      highYield: 'Overview paragraph & trend vocabulary',
    },
    {
      id: 'ielts-writing-2',
      unitNo: '04',
      title: 'Writing Task 2: Discursive Essay & Argumentation',
      tagline: '250+ Words • 40 Minutes',
      difficulty: 'Hard',
      duration: '40 mins',
      questionsCount: 25,
      description:
        'Opinion (agree/disagree), discussion, advantages/disadvantages, problem-solution, and direct question essays with band 9 sample answers.',
      completed: false,
      bandScore: null,
      highYield: 'Cohesion, coherence & lexical resource',
    },
    {
      id: 'ielts-speaking',
      unitNo: '05',
      title: 'Speaking: 3-Part Interview Simulator',
      tagline: 'Part 1, 2 Cue Card & Part 3 Discussion',
      difficulty: 'Medium',
      duration: '11-14 mins',
      questionsCount: 30,
      description:
        'Timed 1-minute cue card prep, 2-minute uninterrupted speech pacing, idiomatic language bank, and abstract Part 3 discussions.',
      completed: false,
      bandScore: null,
      highYield: 'Fluency markers & natural intonation',
    },
  ],
  mockExams: [
    {
      id: 'mock-academic-1',
      title: 'Official Cambridge Format Academic Practice Test 18',
      type: 'Full 4-Skills Simulation',
      time: '2h 45m',
      status: 'Ready',
      bandGoal: '8.0',
    },
    {
      id: 'mock-academic-2',
      title: 'High-Band Reading & Listening Timed Sprint Test 17',
      type: 'Speed & Accuracy Drill',
      time: '90 mins',
      status: 'Ready',
      bandGoal: '8.5',
    },
    {
      id: 'mock-writing-special',
      title: 'Task 1 & Task 2 Evaluator with Instant Rubric Feedback',
      type: 'Writing Focused Simulation',
      time: '60 mins',
      status: 'Ready',
      bandGoal: '7.5+',
    },
  ],
  vocabBank: [
    {
      category: 'Task 1 Trends',
      word: 'Fluctuate wildly',
      meaning: 'To rise and fall irregularly over time',
      example: 'The share prices fluctuated wildly between March and August.',
    },
    {
      category: 'Task 1 Trends',
      word: 'Plateaued at',
      meaning: 'Reached a state of little or no change after a climb',
      example: 'Renewable energy consumption plateaued at 42% in 2022.',
    },
    {
      category: 'Task 2 Formal',
      word: 'Preponderance',
      meaning: 'The quality of being greater in number or influence',
      example: 'A preponderance of evidence suggests urban congestion has worsened.',
    },
    {
      category: 'Task 2 Formal',
      word: 'Exacerbate',
      meaning: 'To make a problem or situation worse',
      example: 'Deforestation further exacerbates carbon emission levels.',
    },
  ],
};

// Interactive Practice Questions for IELTS
const PRACTICE_QUESTIONS = [
  {
    id: 1,
    skill: 'Academic Reading — TFNG',
    passage:
      'Recent archaeological surveys in the Indus Valley suggest that rainfall variations played a decisive role in urban shifts, rather than single cataclysmic flood events.',
    question:
      'According to the passage, single flood catastrophes were the primary reason for city abandonments in the Indus Valley.',
    options: [
      { text: 'TRUE', isCorrect: false },
      { text: 'FALSE', isCorrect: true },
      { text: 'NOT GIVEN', isCorrect: false },
    ],
    explanation:
      'The text states rainfall variations played a decisive role "rather than single cataclysmic flood events", making the assertion False.',
  },
  {
    id: 2,
    skill: 'Listening — Vocabulary in Context',
    passage:
      'Audio Cue: "The museum gallery on the second floor is currently closed for refurbishment until early November."',
    question:
      'Why is the second-floor gallery unavailable to visitors?',
    options: [
      { text: 'It has been permanently relocated', isCorrect: false },
      { text: 'It is undergoing renovations', isCorrect: true },
      { text: 'It was damaged by severe weather', isCorrect: false },
      { text: 'It is reserved for private scholars', isCorrect: false },
    ],
    explanation:
      '"Refurbishment" is a direct British English synonym for renovations/repairs.',
  },
  {
    id: 3,
    skill: 'Writing Task 2 — Thesis Formulation',
    passage:
      'Prompt: "Some argue university education should focus purely on employment skills, while others believe its primary purpose is personal and intellectual growth."',
    question:
      'Which opening thesis statement scores highest on Band 8+ Task Achievement?',
    options: [
      { text: 'I agree with this topic because university is very useful for getting a good job today.', isCorrect: false },
      { text: 'While vocational readiness is undeniably vital for modern economies, higher education must equally nurture analytical rigor and broader civic intellect.', isCorrect: true },
      { text: 'There are many advantages and disadvantages of university and I will discuss both points.', isCorrect: false },
      { text: 'Everyone knows university education helps students learn different things.', isCorrect: false },
    ],
    explanation:
      'Option 2 clearly states a nuanced position acknowledging both sides while using sophisticated academic vocabulary and cohesive subordinators.',
  },
];

export default function IeltsPrep() {
  const [activeTab, setActiveTab] = useState('modules'); // 'modules' | 'practice' | 'mocks' | 'vocab'
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceCompleted, setPracticeCompleted] = useState(false);

  const currentQ = PRACTICE_QUESTIONS[currentQIndex];

  const handleSelectOption = (index) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (currentQ.options[index].isCorrect) {
      setPracticeScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQIndex < PRACTICE_QUESTIONS.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setPracticeCompleted(true);
    }
  };

  const handleRestartPractice = () => {
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setPracticeScore(0);
    setPracticeCompleted(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      
      {/* 1. TOP BREADCRUMB BAR */}
      <div className="border-b border-slate-200 bg-white">
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
            <span>English Proficiency</span>
            <span>/</span>
            <span className="text-slate-800 font-bold">IELTS Academic</span>
          </div>
        </div>
      </div>

      {/* 2. HERO OVERVIEW BANNER */}
      <section className="border-b border-slate-200 bg-slate-50/50 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  <span>🌐</span> {EXAM_DATA.badge}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {EXAM_DATA.targetBand}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {EXAM_DATA.title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                {EXAM_DATA.description}
              </p>

              {/* Progress Summary */}
              <div className="mt-5 flex items-center gap-4">
                <div className="flex-1 max-w-xs bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '40%' }} />
                </div>
                <span className="text-xs font-semibold text-slate-600">
                  2 of 5 Skills Certified (40%)
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
              <button
                type="button"
                onClick={() => setActiveTab('practice')}
                className="w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all text-center"
              >
                Start Timed Drill
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('mocks')}
                className="w-full px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all text-center shadow-xs"
              >
                Full Band Diagnostic
              </button>
            </div>

          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200">
            {EXAM_DATA.stats.map((stat, i) => (
              <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
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

      {/* 3. NAVIGATION TABS */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 w-full">
        
        <div className="flex items-center gap-2 border-b border-slate-200 pb-3 mb-6 overflow-x-auto scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('modules')}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'modules'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Exam Sections ({EXAM_DATA.modules.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('practice')}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'practice'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Live Diagnostic Drill (3 Qs)
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('mocks')}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'mocks'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Practice Tests ({EXAM_DATA.mockExams.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('vocab')}
            className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-colors ${
              activeTab === 'vocab'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            Band 8+ Vocabulary Bank
          </button>
        </div>

        {/* TAB 1: EXAM SECTIONS LIST */}
        {activeTab === 'modules' && (
          <div className="space-y-4">
            {EXAM_DATA.modules.map((mod) => (
              <div
                key={mod.id}
                className="bg-white border border-slate-200 hover:border-blue-500 rounded-2xl p-5 sm:p-6 transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                      mod.completed
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {mod.completed ? '✓' : mod.unitNo}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-slate-900 text-base">{mod.title}</h3>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                        {mod.difficulty}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                      {mod.description}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 font-medium flex-wrap">
                      <span>⏱ {mod.duration}</span>
                      <span>•</span>
                      <span>{mod.questionsCount} items</span>
                      <span>•</span>
                      <span className="text-blue-600 font-semibold">Key: {mod.highYield}</span>
                      {mod.bandScore && (
                        <>
                          <span>•</span>
                          <span className="text-emerald-600 font-bold">
                            Official Result: {mod.bandScore}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => setActiveTab('practice')}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                      mod.completed
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                        : 'bg-blue-600 hover:bg-blue-700 active:scale-95 text-white shadow-sm shadow-blue-500/25'
                    }`}
                  >
                    {mod.completed ? 'Review Module' : 'Practice Section'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: INTERACTIVE PRACTICE DRILL */}
        {activeTab === 'practice' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs max-w-3xl mx-auto">
            {!practiceCompleted ? (
              <div>
                {/* Question Header & Progress */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                      {currentQ.skill}
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 mt-0.5">
                      Question {currentQIndex + 1} of {PRACTICE_QUESTIONS.length}
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    Score: {practiceScore} / {PRACTICE_QUESTIONS.length}
                  </span>
                </div>

                {/* Passage / Audio Prompt */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-6 text-sm text-slate-700 leading-relaxed font-serif">
                  {currentQ.passage}
                </div>

                {/* Question Text */}
                <h3 className="font-bold text-slate-900 text-base mb-4 leading-snug">
                  {currentQ.question}
                </h3>

                {/* Options List */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => {
                    let btnStyle =
                      'bg-white border-slate-200 hover:border-blue-500 text-slate-800';

                    if (selectedAnswer !== null) {
                      if (opt.isCorrect) {
                        btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold';
                      } else if (selectedAnswer === idx) {
                        btnStyle = 'bg-rose-50 border-rose-500 text-rose-800 font-bold';
                      } else {
                        btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={selectedAnswer !== null}
                        onClick={() => handleSelectOption(idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all text-sm flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt.text}</span>
                        {selectedAnswer !== null && opt.isCorrect && (
                          <span className="text-emerald-600 font-bold text-sm">✓ Correct</span>
                        )}
                        {selectedAnswer === idx && !opt.isCorrect && (
                          <span className="text-rose-600 font-bold text-sm">✕ Incorrect</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Banner */}
                {showExplanation && (
                  <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
                    <h4 className="text-xs font-bold text-blue-800 uppercase tracking-wider mb-1">
                      Examiner Rubric Breakdown
                    </h4>
                    <p className="text-xs text-blue-900 leading-relaxed">
                      {currentQ.explanation}
                    </p>
                  </div>
                )}

                {/* Next CTA */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                  {selectedAnswer !== null && (
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all"
                    >
                      {currentQIndex === PRACTICE_QUESTIONS.length - 1
                        ? 'Finish Drill'
                        : 'Next Question →'}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Completed Screen */
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center text-3xl font-bold mb-4 border border-emerald-200">
                  🎉
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900">Drill Completed!</h3>
                <p className="text-sm text-slate-600 mt-2">
                  You scored <strong className="text-blue-600">{practiceScore}</strong> out of{' '}
                  <strong>{PRACTICE_QUESTIONS.length}</strong> (Estimated Band{' '}
                  {practiceScore === 3 ? '8.5 - 9.0' : practiceScore === 2 ? '7.5 - 8.0' : '6.5'}).
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleRestartPractice}
                    className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                  >
                    Retake Drill
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('modules')}
                    className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all"
                  >
                    Back to All Modules
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MOCK EXAMS */}
        {activeTab === 'mocks' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EXAM_DATA.mockExams.map((mock) => (
              <div
                key={mock.id}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-blue-500 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {mock.type}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      Goal: Band {mock.bandGoal}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {mock.title}
                  </h3>

                  <div className="mt-3 text-xs text-slate-500 font-medium flex items-center gap-2">
                    <span>⏱ {mock.time}</span>
                    <span>•</span>
                    <span>4 Sections</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => alert(`Starting exam session: ${mock.title}`)}
                  className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Start Timed Test
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: VOCABULARY BANK */}
        {activeTab === 'vocab' && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">High-Scoring IELTS Lexical Resource</h3>
              <p className="text-xs text-slate-500 mt-1">
                Precision academic verbs, task 1 data language, and argumentative discourse markers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXAM_DATA.vocabBank.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-400 transition-all"
                >
                  <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h4 className="text-base font-bold text-slate-900">{item.word}</h4>
                  <p className="text-xs text-slate-600 mt-1">{item.meaning}</p>
                  <div className="mt-2.5 p-2 bg-white rounded-lg border border-slate-200 text-xs italic text-slate-700">
                    "{item.example}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* 4. SOLID ROYAL BLUE FOOTER */}
      <Footer />

    </div>
  );
}