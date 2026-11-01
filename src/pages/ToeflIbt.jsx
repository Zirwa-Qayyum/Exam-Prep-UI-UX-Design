import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

// Comprehensive TOEFL iBT Practice Question Bank (Updated 2-Hour Format)
const TOEFL_DRILL_BANK = {
  academic_discussion: [
    {
      id: 'toefl-disc-1',
      section: 'Writing for an Academic Discussion',
      timeLimit: 600, // 10 minutes
      professorPrompt: `Professor Diaz:
"In today's class, we're discussing whether governments should prioritize funding for public transportation infrastructure (such as subways and high-speed rail) or provide subsidies and tax rebates for individual electric vehicle (EV) purchases. Which policy approach do you believe produces greater long-term environmental and social benefits, and why?"`,
      studentPostA: `Claire:
"I strongly favor expanding public transit systems. High-speed rail and expanded subway lines not only curtail greenhouse gas emissions on a massive scale, but they also alleviate severe urban traffic congestion and ensure affordable mobility for lower-income households who cannot afford any private vehicle."`,
      studentPostB: `Paul:
"I disagree with Claire. Constructing subway lines and rail tracks takes decades and produces tremendous carbon emissions from concrete and steel manufacturing. Providing immediate tax rebates for electric vehicles empowers millions of motorists to adopt clean driving right now with zero construction lag."`,
      taskInstruction: 'Your Task: Write a response of at least 100 words in which you express and support your opinion, contribute to the discussion, and refer to or build upon the classmates\' arguments.',
      sampleHighScoringResponse: `I agree with Claire that developing municipal public transit yields substantially greater environmental and socio-economic payoffs than private electric vehicle subsidies. While Paul correctly points out that EV subsidies offer immediate consumer incentives, subsidizing private vehicles fails to resolve the systemic crisis of urban vehicular gridlock. Furthermore, electric cars still depend on battery manufacturing that requires carbon-intensive lithium mining. By contrast, an integrated subway and electric bus network democratizes transit for citizens of all income levels while removing thousands of vehicles from highways simultaneously. Therefore, public infrastructure creates both ecological sustainability and social equity.`,
      scoringRubric: [
        'Score 5: Well-elaborated contribution, relevant evidence, syntactic variety, negligible lexical errors.',
        'Score 4: Clear viewpoint with sufficient elaboration, minor language inaccuracies that do not obscure meaning.',
        'Score 3: Relevant response but limited development or recurring grammatical slips.'
      ]
    }
  ],
  listening: [
    {
      id: 'toefl-listen-1',
      section: 'Listening (Academic Lecture)',
      topic: 'Marine Ecology • Hydrothermal Vent Extremophiles',
      audioTranscript: `[Professor]:
"Today we are examining chemosynthesis in benthic hydrothermal vent ecosystems. In terrestrial and shallow-water biomes, primary productivity is almost universally mediated by chloroplasts absorbing solar photons during photosynthesis. 

However, at abyssal ocean depths exceeding 2,500 meters, sunlight is entirely absent. Instead, benthic ecosystems rely on sulfur-oxidizing bacteria living symbiotically inside organisms like Riftia pachyptila—the giant tube worm. These bacteria oxidize toxic hydrogen sulfide—H2S—spewing from superheated mineral chimneys, converting geothermal chemical energy into adenosine triphosphate (ATP). This demonstrates that life does not strictly depend on solar radiation, dramatically reshaping astrobiological criteria for life on icy Jovian moons such as Europa."`,
      question: 'What is the primary mechanism of energy production in abyssal hydrothermal vent ecosystems described by the professor?',
      options: [
        'A. Photosynthetic plankton drifting downward from pelagic photic zones.',
        'B. Chemosynthesis conducted by symbiotic bacteria utilizing dissolved hydrogen sulfide.',
        'C. Direct absorption of geothermal heat converted into cellular glucose.',
        'D. Anaerobic fermentation of fallen organic detritus from surface waters.'
      ],
      correct: 1,
      explanation: 'The professor explicitly explains that benthic ecosystems rely on chemosynthesis performed by sulfur-oxidizing symbiotic bacteria that oxidize toxic hydrogen sulfide (H2S) emitted from vents to synthesize ATP without sunlight.'
    },
    {
      id: 'toefl-listen-2',
      section: 'Listening (Campus Conversation)',
      topic: 'Student Services • Interlibrary Loan Request',
      audioTranscript: `[Student]: "Hi, I'm working on my senior history thesis on Renaissance cartography, but our campus library only has the 1974 translation of this Venetian surveyor's diary. I need the 2018 critical edition with the facsimile plates."
[Librarian]: "We don't hold the physical 2018 edition, but through our Interlibrary Loan Consortium with Columbia and NYU, we can either courier the bound volume within three business days or request a high-resolution digital chapter scan within 24 hours."
[Student]: "The digital scan for Chapters 3 and 4 would be ideal since my chapter outline is due Friday."`,
      question: 'Why does the student choose the digital chapter scan rather than the physical courier?',
      options: [
        'A. The courier service requires a significant out-of-pocket processing fee.',
        'B. The student only needs specific chapters and faces a fast-approaching Friday deadline.',
        'C. The 1974 translation was reported lost by another undergraduate researcher.',
        'D. Interlibrary loans cannot deliver rare manuscripts to undergraduate students.'
      ],
      correct: 1,
      explanation: 'The student states that their chapter outline is due Friday, so obtaining the digital scans within 24 hours fits their immediate deadline much better than the 3-day physical courier option.'
    }
  ],
  reading: [
    {
      id: 'toefl-read-1',
      section: 'Reading Comprehension',
      topic: 'Cognitive Archaeology • Prehistoric Cave Ochre Usage',
      passage: `The systematic retrieval and pyrotechnic manipulation of red ochre pigments in Middle Stone Age southern Africa—most prominently exemplified by engraved hematite crayons recovered from Blombos Cave dating to roughly 75,000 BP—represents one of the earliest indisputable material correlates of symbolic cognition. 

While early twentieth-century anthropologists frequently dismissed prehistoric pigments as purely utilitarian adhesives for mastic composite tools, spectrographic analysis reveals that hunter-gatherers intentionally selected minerals with vibrant iron oxide saturation over chemically identical, closer substitutes. [■] This deliberate prioritization of visual resonance suggests that pigment grinding functioned as a communal ritual denoting shared cultural iconography.`,
      question: 'The word "utilitarian" in paragraph 2 is closest in meaning to:',
      options: [
        'A. Functional and practical',
        'B. Decorative and ornate',
        'C. Ancient and primeval',
        'D. Fragile and volatile'
      ],
      correct: 0,
      explanation: 'In this context, anthropologists dismissed prehistoric pigments as "purely utilitarian adhesives," contrasting practical tool-binding uses with symbolic or artistic meanings.'
    }
  ],
  speaking: [
    {
      id: 'toefl-speak-1',
      section: 'Speaking Task 1 (Independent Speaking)',
      preparationTime: 15,
      responseDuration: 45,
      prompt: 'State whether you agree or disagree with the following statement: "Undergraduate university students should be required to take at least one computer programming course regardless of their chosen major." Provide reasons and concrete examples to substantiate your response.',
      samplePoints: [
        'Point 1: Algorithmic problem-solving teaches students to decompose complex non-technical tasks into verifiable iterative steps.',
        'Point 2: Data literacy is now mandatory across humanities, business, journalism, and biological sciences (e.g. data scraping, statistical analysis).'
      ],
      exemplaryTranscript: `"I firmly agree that all university undergraduates should complete at least one foundational programming course. First, computer science cultivates rigorous analytical thinking; when students write code, they learn to deconstruct vast, ambiguous problems into systematic, sequential steps. Second, nearly every modern industry relies on computational automation. A journalism major who knows basic Python can scrape public records for investigative exposés, while a biology major can parse genomic sequences. Therefore, coding is a modern universal language of problem-solving."`
    }
  ]
};

const EXAM_DATA = {
  title: 'TOEFL iBT 2-Hour Rapid Score Booster',
  badge: 'ETS Official Format (2024–2025)',
  targetScore: 'Target Score: 105+',
  stats: [
    { label: 'Exam Duration', value: 'Under 2 Hours' },
    { label: 'Target Score', value: '105+ (26+ / sect)' },
    { label: 'Writing Format', value: 'Academic Discussion' },
    { label: 'Acceptance Rate', value: '12,000+ Universities' }
  ],
  modules: [
    {
      id: 'toefl-mod-1',
      category: 'academic_discussion',
      title: 'Writing: Academic Discussion Task (10-Min Sprint)',
      questionsCount: 25,
      estimatedTime: '10 mins / prompt',
      difficulty: 'High Speed',
      completed: true,
      score: '28/30'
    },
    {
      id: 'toefl-mod-2',
      category: 'listening',
      title: 'Listening: Natural Speech Lectures & Accents',
      questionsCount: 30,
      estimatedTime: '36 mins',
      difficulty: 'Medium',
      completed: true,
      score: '27/30'
    },
    {
      id: 'toefl-mod-3',
      category: 'reading',
      title: 'Reading: 2 Long Passages & Vocabulary In-Context',
      questionsCount: 20,
      estimatedTime: '35 mins',
      difficulty: 'Academic Dense',
      completed: false,
      score: null
    },
    {
      id: 'toefl-mod-4',
      category: 'speaking',
      title: 'Speaking: 4 Integrated & Independent Speech Cues',
      questionsCount: 16,
      estimatedTime: '16 mins',
      difficulty: 'AI Scored',
      completed: false,
      score: null
    }
  ],
  mockExams: [
    {
      id: 'toefl-mock-1',
      title: 'Complete 2-Hour Official Simulated Test 1',
      type: 'Reading (20Q) + Listening (28Q) + Speaking (4 Tasks) + Writing (2 Tasks)',
      time: '1h 56m'
    },
    {
      id: 'toefl-mock-2',
      title: 'Speaking & Writing Rapid Scored Section Test',
      type: 'Live AI Acoustic Scoring & Grammar Evaluation',
      time: '35 mins'
    },
    {
      id: 'toefl-mock-3',
      title: 'Reading & Listening High-Yield Diagnostic Mock',
      type: 'Academic Passage Inference & Lecture Synthesis',
      time: '70 mins'
    }
  ]
};

export default function ToeflIbt() {
  const [activeTab, setActiveTab] = useState('modules'); // 'modules' | 'mocks' | 'templates'

  // Drill Runner State
  const [drillActive, setDrillActive] = useState(false);
  const [drillCategory, setDrillCategory] = useState('listening');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);
  const [drillFinished, setDrillFinished] = useState(false);

  // Academic Discussion Text State
  const [userEssay, setUserEssay] = useState('');
  const [essaySubmitted, setEssaySubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Speaking state
  const [speakingRecording, setSpeakingRecording] = useState(false);
  const [speakingTimer, setSpeakingTimer] = useState(45);

  const activeQuestions = TOEFL_DRILL_BANK[drillCategory] || TOEFL_DRILL_BANK.listening;
  const currentQ = activeQuestions[currentIndex];

  // Word count tracker
  useEffect(() => {
    const trimmed = userEssay.trim();
    if (!trimmed) {
      setWordCount(0);
    } else {
      setWordCount(trimmed.split(/\s+/).length);
    }
  }, [userEssay]);

  // Speaking countdown
  useEffect(() => {
    let timer = null;
    if (speakingRecording && speakingTimer > 0) {
      timer = setInterval(() => setSpeakingTimer((t) => t - 1), 1000);
    } else if (speakingTimer === 0) {
      setSpeakingRecording(false);
    }
    return () => clearInterval(timer);
  }, [speakingRecording, speakingTimer]);

  const handleStartDrill = (category = 'listening') => {
    setDrillCategory(category);
    setCurrentIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setScoreCount(0);
    setDrillFinished(false);
    setUserEssay('');
    setEssaySubmitted(false);
    setSpeakingRecording(false);
    setSpeakingTimer(45);
    setDrillActive(true);
    window.scrollTo({ top: 320, behavior: 'smooth' });
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    if (selectedOption === currentQ.correct) {
      setScoreCount((s) => s + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex((i) => i + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setDrillFinished(true);
    }
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
            <span>TOEFL iBT</span>
            <span>/</span>
            <span className="text-slate-700 font-semibold">2-Hour Rapid Score Booster</span>
          </div>
        </div>
      </div>

      {/* 2. EXAM OVERVIEW HERO */}
      <section className="bg-white border-b border-slate-200 py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  <span>文A</span> {EXAM_DATA.badge}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                  {EXAM_DATA.targetScore}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {EXAM_DATA.title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                Practice the streamlined TOEFL format: streamlined 2-hour duration,
                the new 10-minute Academic Discussion writing task, and high-frequency lecture passages.
              </p>

              <div className="mt-5 flex items-center gap-3">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse" />
                <span className="text-xs font-bold text-slate-700">
                  Features Updated 2024 "Writing for an Academic Discussion" Engine
                </span>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
              <button
                type="button"
                onClick={() => handleStartDrill('academic_discussion')}
                className="w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md shadow-blue-500/25 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>✍️</span>
                <span>Practice Academic Discussion</span>
              </button>
              <button
                type="button"
                onClick={() => handleStartDrill('listening')}
                className="w-full px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all text-center flex items-center justify-center gap-2"
              >
                <span>🎧</span>
                <span>Start Lecture Listening</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
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

      {/* 3. INTERACTIVE DRILL ARENA */}
      {drillActive && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-3xl border-2 border-blue-600 shadow-xl overflow-hidden transition-all">
            
            {/* Top Bar */}
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                  ETS
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white capitalize">
                    {drillCategory.replace('_', ' ')}
                  </h3>
                  <p className="text-[11px] text-slate-400">Official 2-Hour TOEFL Format Drill</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDrillActive(false)}
                className="text-slate-400 hover:text-white text-xs font-bold px-2 py-1"
              >
                ✕ Close Drill
              </button>
            </div>

            {/* CASE A: WRITING FOR AN ACADEMIC DISCUSSION */}
            {drillCategory === 'academic_discussion' && (
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between text-xs text-slate-500 font-semibold pb-4 border-b border-slate-100 mb-6">
                  <span>⏱ Recommended Time: 10 Minutes</span>
                  <span className={wordCount >= 100 ? 'text-emerald-600 font-bold' : 'text-amber-600 font-bold'}>
                    Word Count: {wordCount} words (Target: 100+)
                  </span>
                </div>

                {/* Professor Question */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-5 text-sm text-slate-800 font-sans leading-relaxed">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase mb-2">
                    <span>🎓</span> Professor's Discussion Topic
                  </div>
                  <p className="whitespace-pre-line">{currentQ.professorPrompt}</p>
                </div>

                {/* Classmate Posts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900 block mb-1">👩 Claire</span>
                    {currentQ.studentPostA}
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 leading-relaxed">
                    <span className="font-bold text-slate-900 block mb-1">👨 Paul</span>
                    {currentQ.studentPostB}
                  </div>
                </div>

                {/* User Writing Area */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    Your Response (Min. 100 Words) — Express your opinion and reference classmates:
                  </label>
                  <textarea
                    rows={7}
                    value={userEssay}
                    onChange={(e) => setUserEssay(e.target.value)}
                    placeholder="In my opinion, I believe that public transportation yields significantly greater collective advantages..."
                    className="w-full p-4 border border-slate-200 rounded-2xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-sans"
                  />
                </div>

                {/* Submit & Sample Toggle */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-400">
                    ETS Scoring Criteria: Substantive development + Lexical variety
                  </span>
                  <button
                    type="button"
                    onClick={() => setEssaySubmitted(true)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                  >
                    Evaluate & Show Score 5 Model
                  </button>
                </div>

                {/* Model High-Scoring Response Preview */}
                {essaySubmitted && (
                  <div className="mt-6 p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 leading-relaxed">
                    <div className="flex items-center justify-between mb-2">
                      <strong className="text-sm font-bold text-emerald-900">
                        🌟 Benchmark Score 5.0 (Band 30) Model Response:
                      </strong>
                      <span className="px-2 py-0.5 rounded bg-emerald-200 text-emerald-800 font-bold text-[10px]">
                        138 words
                      </span>
                    </div>
                    <p className="italic text-emerald-900 font-sans mb-3">
                      "{currentQ.sampleHighScoringResponse}"
                    </p>
                    <div className="text-[11px] text-emerald-800 font-medium pt-2 border-t border-emerald-200">
                      <strong>Rubric Notes:</strong> Note how the author explicitly names both Claire and Paul,
                      synthesizes their viewpoints, and presents an independent thesis on structural socio-economic equity.
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* CASE B: SPEAKING TASK */}
            {drillCategory === 'speaking' && (
              <div className="p-6 sm:p-8">
                <div className="text-xs font-semibold text-slate-500 mb-2">
                  Task 1: Independent Speaking (15s Prep • 45s Response)
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-6">
                  <h4 className="text-base font-extrabold text-slate-900 leading-snug">
                    {currentQ.prompt}
                  </h4>
                </div>

                {/* Countdown & Mic Simulation */}
                <div className="text-center py-6 border border-dashed border-slate-200 rounded-2xl mb-6">
                  <div className="text-4xl font-black text-slate-900 font-mono mb-2">
                    00:{speakingTimer < 10 ? `0${speakingTimer}` : speakingTimer}
                  </div>
                  <p className="text-xs text-slate-400 mb-4">
                    {speakingRecording ? '🎙️ Recording your audio answer...' : 'Click start when ready to record'}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSpeakingRecording(true);
                      setSpeakingTimer(45);
                    }}
                    className={`px-6 py-2.5 font-bold text-xs rounded-xl shadow-md transition-all ${
                      speakingRecording
                        ? 'bg-rose-600 text-white animate-pulse'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {speakingRecording ? 'Recording Live... (45s)' : '🎙️ Start 45s Speaking Response'}
                  </button>
                </div>

                {/* Exemplary Transcript */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-700 leading-relaxed">
                  <strong className="block text-slate-900 font-bold mb-1">
                    🎯 Score 4.0 / 30 High-Scoring Audio Transcript Sample:
                  </strong>
                  <p className="italic">{currentQ.exemplaryTranscript}</p>
                </div>
              </div>
            )}

            {/* CASE C: LISTENING & READING MULTIPLE CHOICE */}
            {(drillCategory === 'listening' || drillCategory === 'reading') && (
              <div className="p-6 sm:p-8">
                
                {/* Progress Bar */}
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-2">
                  <span>Question {currentIndex + 1} of {activeQuestions.length}</span>
                  <span>Score: {scoreCount} Correct</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
                  <div
                    className="bg-blue-600 h-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
                  />
                </div>

                {/* Stimulus Transcript / Passage */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6 text-sm text-slate-700 whitespace-pre-line leading-relaxed font-sans">
                  {currentQ.audioTranscript || currentQ.passage}
                </div>

                {/* Question */}
                <h4 className="text-base font-extrabold text-slate-900 mb-4">
                  {currentQ.question}
                </h4>

                {/* Option Buttons */}
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

                {/* Answer Rationale */}
                {submitted && (
                  <div className={`mt-5 p-4 rounded-xl border text-xs leading-relaxed ${
                    selectedOption === currentQ.correct
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}>
                    <strong className="block font-bold mb-1">
                      {selectedOption === currentQ.correct ? '🎯 Correct Explanation:' : '💡 Explanation:'}
                    </strong>
                    {currentQ.explanation}
                  </div>
                )}

                {/* Footer Next Button */}
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
                      <span>{currentIndex + 1 < activeQuestions.length ? 'Next Question' : 'Drill Completed'}</span>
                      <span>→</span>
                    </button>
                  )}
                </div>

              </div>
            )}

          </div>
        </section>
      )}

      {/* 4. MAIN CURRICULUM MODULES */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 w-full">
        
        {/* Navigation Tabs */}
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
            Curriculum Sections (4)
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
            2-Hour Full Mocks (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${
              activeTab === 'templates'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            High-Score Templates
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
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200">
                        {module.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 font-medium">
                      <span>{module.questionsCount} items</span>
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

                <button
                  type="button"
                  onClick={() => handleStartDrill(module.category)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm shadow-blue-500/25 transition-all self-end sm:self-center"
                >
                  Start Practice
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
                  <span className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200 mb-3">
                    ETS 2-Hour Test
                  </span>
                  <h3 className="font-bold text-slate-900 text-lg leading-snug">
                    {mock.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2">{mock.type}</p>
                  <div className="mt-3 text-xs text-slate-500 font-medium flex items-center gap-3">
                    <span>⏱ {mock.time}</span>
                    <span>•</span>
                    <span className="text-emerald-600 font-bold">Official 0–120 Scale</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartDrill('academic_discussion')}
                  className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                >
                  Launch Full 2-Hour Simulation
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: HIGH SCORE TEMPLATES */}
        {activeTab === 'templates' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">TOEFL iBT Academic Discussion Writing Architecture</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-blue-600 uppercase">Step 1: The Acknowledgment Sentence</span>
                <p className="text-xs text-slate-700 font-mono mt-1 bg-white p-2.5 rounded border border-slate-200 leading-relaxed">
                  "While [Classmate A] makes a persuasive argument regarding [X], I side with [Classmate B] that [Y] produces far more durable benefits because..."
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-purple-600 uppercase">Step 2: Unexplored Angle Addition</span>
                <p className="text-xs text-slate-700 font-mono mt-1 bg-white p-2.5 rounded border border-slate-200 leading-relaxed">
                  "Moreover, an overlooked factor in this debate is [Z]. When authorities prioritize [Y], it directly impacts [secondary positive outcome]..."
                </p>
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