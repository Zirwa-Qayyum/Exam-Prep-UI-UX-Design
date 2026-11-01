import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const MODULES = [
  { id: 'lr-assumptions', title: 'Assumptions & Argument Gaps', type: 'Logical Reasoning', questions: 36, time: '35 min', level: 'Core' },
  { id: 'lr-flaws', title: 'Flaw, Method & Parallel Reasoning', type: 'Logical Reasoning', questions: 42, time: '40 min', level: 'Advanced' },
  { id: 'lr-inference', title: 'Inference, Principle & Strengthen/Weaken', type: 'Logical Reasoning', questions: 40, time: '38 min', level: 'Advanced' },
  { id: 'rc-main-idea', title: 'Main Point, Structure & Purpose', type: 'Reading Comprehension', questions: 32, time: '35 min', level: 'Core' },
  { id: 'rc-inference', title: 'Passage Inference & Evidence', type: 'Reading Comprehension', questions: 36, time: '38 min', level: 'Advanced' },
  { id: 'rc-comparative', title: 'Comparative Reading', type: 'Reading Comprehension', questions: 28, time: '32 min', level: 'Advanced' },
];

const QUESTIONS = [
  {
    type: 'Logical Reasoning · Necessary Assumption',
    prompt: 'A city replaced several downtown parking spaces with a protected bike lane. Six months later, bicycle traffic on the street had increased. Therefore, the new bike lane caused more people to travel by bicycle.',
    question: 'Which assumption is required by the argument?',
    options: [
      'No other change during that period was primarily responsible for the increase in bicycle traffic.',
      'Every person who used the bike lane previously drove a car.',
      'The city plans to add more protected bike lanes next year.',
      'Bicycle traffic increased on every street in the city.'
    ],
    answer: 0,
    explanation: 'The conclusion attributes the increase to the bike lane. It therefore assumes that another simultaneous change did not primarily cause the increase. The other choices introduce claims the argument does not need.'
  },
  {
    type: 'Reading Comprehension · Inference',
    prompt: 'A museum tested two ways of displaying a collection of maps. Visitors spent longer at the maps when short explanatory labels were present. In follow-up interviews, many visitors said the labels helped them notice details they would otherwise have missed. The museum did not measure whether visitors remembered more information afterward.',
    question: 'Which statement is best supported by the passage?',
    options: [
      'The labels increased visitors’ time near the maps, and some visitors reported that the labels drew attention to details.',
      'Visitors remembered more about the maps when labels were present.',
      'The museum’s labels caused every visitor to examine every map closely.',
      'The museum should replace all map displays with labeled displays.'
    ],
    answer: 0,
    explanation: 'The passage directly reports longer viewing time and interview responses from many visitors. It explicitly says memory was not measured, so the stronger memory claim is unsupported.'
  },
  {
    type: 'Logical Reasoning · Weaken',
    prompt: 'A company introduced a four-day workweek in one department. Over the next quarter, that department completed more projects than in the previous quarter. The director concludes that the four-day schedule increased productivity.',
    question: 'Which fact most weakens the director’s conclusion?',
    options: [
      'The department received substantially fewer projects during the quarter after the schedule change.',
      'Employees in the department reported liking the new schedule.',
      'The company has departments that did not change their schedules.',
      'The four-day schedule was announced at a staff meeting.'
    ],
    answer: 0,
    explanation: 'A higher number of completed projects may reflect a lower workload rather than greater productivity. This alternative explanation weakens the causal conclusion.'
  }
];

const MOCKS = [
  { title: 'Logical Reasoning Timed Set', detail: 'Mixed argument questions', questions: '15 questions', time: '25 minutes' },
  { title: 'Reading Comprehension Timed Set', detail: 'Passage analysis and evidence', questions: '14 questions', time: '27 minutes' },
  { title: 'Mixed Diagnostic', detail: 'Reasoning plus passage review', questions: '24 questions', time: '42 minutes' },
];

export default function LsatReasoning() {
  const [activeTab, setActiveTab] = useState('modules');
  const [filter, setFilter] = useState('all');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, attempted: 0 });
  const [completed, setCompleted] = useState({});

  const question = QUESTIONS[questionIndex];
  const visibleModules = MODULES.filter((module) => filter === 'all' || module.type === filter);

  function beginDrill() {
    setActiveTab('drill');
    setSelected(null);
    document.getElementById('lsat-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function chooseAnswer(index) {
    if (selected !== null) return;
    setSelected(index);
    setScore((previous) => ({
      correct: previous.correct + (index === question.answer ? 1 : 0),
      attempted: previous.attempted + 1,
    }));
  }

  function nextQuestion() {
    setQuestionIndex((index) => (index + 1) % QUESTIONS.length);
    setSelected(null);
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-blue-700">
            <span aria-hidden="true">←</span> Back to Browse Exams
          </Link>
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">LSAT Prep</span>
        </div>
      </div>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">⚖️ Logical Reasoning</span>
                <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">Reading Comprehension</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">LSAT Logical Reasoning &amp; Reading Prep</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                Build a repeatable approach to argument structure, assumptions, inference, and passage evidence with guided practice and timed sets.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="h-2.5 w-56 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-1/3 rounded-full bg-blue-600" />
                </div>
                <span className="text-xs font-semibold text-slate-600">2 of 6 study modules completed</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:min-w-56 lg:flex-col">
              <button type="button" onClick={beginDrill} className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
                Start Live Drill
              </button>
              <button type="button" onClick={() => setActiveTab('mocks')} className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50">
                View Timed Sets
              </button>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 border-t border-slate-100 pt-6 sm:grid-cols-4">
            {[
              ['Study modules', '6'],
              ['Practice prompts', '216'],
              ['Core skill areas', '2'],
              ['Your drill score', `${score.correct}/${score.attempted}`],
            ].map(([label, value]) => (
              <div key={label} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                <p className="mt-1 text-xl font-bold text-slate-900">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main id="lsat-workspace" className="flex-1 mx-auto max-w-7xl scroll-mt-6 px-4 pt-8 pb-16 sm:px-6 lg:px-8 w-full">
        <div className="mb-6 flex gap-2 overflow-x-auto border-b border-slate-200 pb-3">
          {[
            ['modules', 'Study Modules'],
            ['drill', 'Interactive Drill'],
            ['mocks', 'Timed Sets'],
            ['strategies', 'Test Strategies'],
          ].map(([id, label]) => (
            <button key={id} type="button" onClick={() => setActiveTab(id)} className={`whitespace-nowrap rounded-xl px-4 py-2 text-sm font-bold transition ${activeTab === id ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-white hover:text-slate-900'}`}>
              {label}
            </button>
          ))}
        </div>

        {activeTab === 'modules' && (
          <>
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-900">Build skills step by step</h2>
              <select value={filter} onChange={(event) => setFilter(event.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 outline-none focus:border-blue-500">
                <option value="all">All skills</option>
                <option value="Logical Reasoning">Logical Reasoning</option>
                <option value="Reading Comprehension">Reading Comprehension</option>
              </select>
            </div>
            <div className="space-y-3">
              {visibleModules.map((module, index) => (
                <article key={module.id} className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md sm:flex-row sm:items-center">
                  <div className="flex gap-4">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${completed[module.id] ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>{completed[module.id] ? '✓' : String(index + 1).padStart(2, '0')}</div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-slate-900">{module.title}</h3>
                        <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-600">{module.type}</span>
                      </div>
                      <p className="mt-1 text-xs text-slate-500">{module.questions} practice questions <span className="px-1">·</span>{module.time} <span className="px-1">·</span>{module.level}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => { setCompleted((state) => ({ ...state, [module.id]: true })); beginDrill(); }} className="rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-700">Start practice</button>
                </article>
              ))}
            </div>
          </>
        )}

        {activeTab === 'drill' && (
          <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-blue-700">Practice question {questionIndex + 1} of {QUESTIONS.length}</p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">{question.type}</h2>
              </div>
              <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-700">Score {score.correct}/{score.attempted}</span>
            </div>
            <p className="mb-3 text-sm font-semibold leading-6 text-slate-800">{question.question}</p>
            <div className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">{question.prompt}</div>
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isCorrect = index === question.answer;
                const isChosen = selected === index;
                let stateClass = 'border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/40';
                if (selected !== null && isCorrect) stateClass = 'border-emerald-400 bg-emerald-50 text-emerald-950';
                else if (isChosen) stateClass = 'border-rose-400 bg-rose-50 text-rose-950';
                return (
                  <button key={option} type="button" disabled={selected !== null} onClick={() => chooseAnswer(index)} className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left text-sm leading-5 transition ${stateClass}`}>
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">{String.fromCharCode(65 + index)}</span>
                    <span className="flex-1">{option}</span>
                    {selected !== null && isCorrect && <span className="text-xs font-bold text-emerald-700">Correct</span>}
                    {isChosen && !isCorrect && <span className="text-xs font-bold text-rose-700">Your answer</span>}
                  </button>
                );
              })}
            </div>
            {selected !== null && (
              <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-blue-800">Explanation</p>
                <p className="mt-1 text-sm leading-6 text-slate-700">{question.explanation}</p>
                <button type="button" onClick={nextQuestion} className="mt-4 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700">Next question →</button>
              </div>
            )}
          </section>
        )}

        {activeTab === 'mocks' && (
          <div className="grid gap-4 md:grid-cols-3">
            {MOCKS.map((mock) => (
              <article key={mock.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
                <span className="w-fit rounded-md bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">Timed practice</span>
                <h2 className="mt-4 text-lg font-bold text-slate-900">{mock.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{mock.detail}</p>
                <p className="mt-4 text-xs font-semibold text-slate-500">{mock.questions} <span className="px-1">·</span> {mock.time}</p>
                <button type="button" onClick={beginDrill} className="mt-6 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700">Start practice set</button>
              </article>
            ))}
          </div>
        )}

        {activeTab === 'strategies' && (
          <section className="grid gap-4 md:grid-cols-2">
            {[
              ['Find the conclusion', 'Separate the author’s main claim from evidence, background, and concessions.'],
              ['Predict the gap', 'Before reviewing choices, identify what must be true for the reasoning to work.'],
              ['Prove answers from text', 'For reading questions, tie each answer to explicit passage evidence or a necessary inference.'],
              ['Review wrong answers', 'Name the trap: too strong, out of scope, reversed, or contradicted by the passage.'],
            ].map(([title, text]) => (
              <article key={title} className="rounded-2xl border border-slate-200 bg-white p-5">
                <h2 className="font-bold text-slate-900">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </section>
        )}
      </main>

      {/* Solid Blue Footer */}
      <Footer />
    </div>
  );
}