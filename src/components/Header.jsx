import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const SEARCHABLE_ITEMS = [
  { title: 'AP Calculus BC & AB', type: 'Exam Page', path: '/exam/ap-calculus', category: 'AP Exams' },
  { title: 'Limits & Fundamental Theorem', type: 'Formula Sheet', path: '/exam/ap-calculus', category: 'Math' },
  { title: 'NY Regents Chemistry Review', type: 'Exam Page', path: '/exam/regents-chemistry', category: 'Regents' },
  { title: 'NYS Reference Tables (Table A-T)', type: 'Resource', path: '/resources', category: 'Chemistry' },
  { title: 'Digital SAT Adaptive Math', type: 'Exam Page', path: '/exam/sat-digital', category: 'SAT' },
  { title: 'Desmos Regression & Systems Hacks', type: 'Calculator Trick', path: '/resources', category: 'SAT' },
  { title: 'IELTS Academic & General Prep', type: 'Exam Page', path: '/exam/ielts-prep', category: 'IELTS' },
  { title: 'True / False / Not Given Logic', type: 'Reading Guide', path: '/exam/ielts-prep', category: 'IELTS' },
  { title: 'ACT Science & Fast Math Sprint', type: 'Exam Page', path: '/exam/act-prep', category: 'ACT' },
  { title: 'TOEFL iBT Academic Discussion', type: 'Writing Task', path: '/exam/toefl-ibt', category: 'TOEFL' },
  { title: 'GRE Quant Comparison & High Verbal', type: 'Exam Page', path: '/exam/gre-quant-verbal', category: 'GRE' },
  { title: 'LSAT Logical Reasoning & Reading', type: 'Exam Page', path: '/exam/lsat-reasoning', category: 'LSAT' }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Diagnostic Test Due',
    desc: 'AP Calculus BC Diagnostic Mock is scheduled for today.',
    time: '25m ago',
    unread: true,
    link: '/exam/ap-calculus'
  },
  {
    id: 2,
    title: 'New Desmos Cheatsheet Added',
    desc: 'Systems of equations shortcuts are now available in Resources.',
    time: '2h ago',
    unread: true,
    link: '/resources'
  },
  {
    id: 3,
    title: 'Weekly Study Streak: 6 Days 🔥',
    desc: 'Keep going! Complete 1 drill today to reach a 7-day milestone.',
    time: '5h ago',
    unread: false,
    link: '/schedule'
  }
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  // Dropdown states
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showNewSessionModal, setShowNewSessionModal] = useState(false);

  // User state
  const [userTrack, setUserTrack] = useState('MCAT Prep');
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // New session form state
  const [sessionExam, setSessionExam] = useState('/exam/ap-calculus');
  const [sessionMode, setSessionMode] = useState('Speed Drill (15m)');

  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const profileRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const navLinks = [
    { label: 'Dashboard', path: '/' },
    { label: 'Schedule', path: '/schedule' },
    { label: 'Analytics', path: '/analytics' },
    { label: 'Resources', path: '/resources' }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchFocused(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter search results
  const filteredSearch = searchQuery.trim() === ''
    ? []
    : SEARCHABLE_ITEMS.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleLaunchSession = (e) => {
    e.preventDefault();
    setShowNewSessionModal(false);
    navigate(sessionExam);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* 1. BRAND LOGO & NAVIGATION TABS */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 select-none group">
              <span className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-lg shadow-sm shadow-blue-500/20 group-hover:scale-105 transition-all">
                S
              </span>
              <div className="leading-tight">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Study<span className="text-blue-600">Flow</span>
                </span>
                <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                  PREP SUITE
                </span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((tab) => {
                const isActive = location.pathname === tab.path;
                return (
                  <Link
                    key={tab.label}
                    to={tab.path}
                    className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-50 text-blue-600 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* 2. WORKING RIGHT-SIDE CONTROLS */}
          <div className="flex items-center gap-3">
            
            {/* A. FUNCTIONAL SEARCH BAR WITH LIVE DROPDOWN */}
            <div ref={searchRef} className="relative hidden sm:block">
              <div className="relative">
                <svg
                  className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  type="text"
                  placeholder="Search syllabus, flashcards..."
                  value={searchQuery}
                  onFocus={() => setSearchFocused(true)}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchFocused(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setSearchFocused(false);
                      setSearchQuery('');
                    }
                  }}
                  className="w-56 lg:w-72 pl-10 pr-8 py-2 text-xs lg:text-sm bg-slate-50 hover:bg-slate-100/70 border border-slate-200 rounded-full text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Instant Search Dropdown Results */}
              {searchFocused && searchQuery.trim() !== '' && (
                <div className="absolute left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50">
                  <div className="px-3.5 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>Search Results ({filteredSearch.length})</span>
                    <span>Press Esc to close</span>
                  </div>

                  {filteredSearch.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-500">
                      No results for "{searchQuery}". Try "Calculus", "Desmos", or "Chemistry".
                    </div>
                  ) : (
                    <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                      {filteredSearch.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            navigate(item.path);
                            setSearchFocused(false);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-4 py-2.5 hover:bg-blue-50/70 transition-colors flex items-center justify-between group"
                        >
                          <div>
                            <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600">
                              {item.title}
                            </p>
                            <span className="text-[10px] text-slate-400">{item.category}</span>
                          </div>
                          <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md">
                            {item.type}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* B. NOTIFICATION BELL WITH BLUE BADGE */}
            <div ref={notifRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfile(false);
                }}
                title="Notifications"
                className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-600 rounded-full ring-2 ring-white" />
                )}
              </button>

              {/* Notification Menu */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Notifications</h4>
                      <p className="text-[10px] text-slate-400">{unreadCount} unread alerts</p>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllRead}
                        className="text-[11px] font-bold text-blue-600 hover:text-blue-800"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setShowNotifications(false);
                          navigate(n.link);
                        }}
                        className={`p-3.5 hover:bg-slate-50 cursor-pointer transition-colors ${
                          n.unread ? 'bg-blue-50/40' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-bold text-slate-800 leading-snug">{n.title}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{n.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                    <Link
                      to="/schedule"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      View Full Study Calendar →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* C. BRIGHT BLUE (+) BUTTON — LAUNCHES NEW STUDY SESSION MODAL */}
            <button
              type="button"
              onClick={() => setShowNewSessionModal(true)}
              title="Start New Study Session"
              className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center text-xl font-medium shadow-md shadow-blue-500/25 transition-all"
            >
              +
            </button>

            {/* Divider */}
            <div className="h-5 w-px bg-slate-200 mx-0.5" />

            {/* D. PROFILE PILL (AR / Alex R. / Track Switcher) */}
            <div ref={profileRef} className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowProfile(!showProfile);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-50 transition-colors text-left"
              >
                <div className="w-9 h-9 rounded-full bg-blue-50 border border-blue-200 text-blue-700 font-extrabold text-xs flex items-center justify-center">
                  AR
                </div>
                <div className="hidden sm:block leading-tight">
                  <p className="text-xs font-bold text-slate-900">Alex R.</p>
                  <p className="text-[11px] font-semibold text-slate-500">{userTrack}</p>
                </div>
              </button>

              {/* Profile Card & Track Switcher */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl p-4 z-50">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
                      AR
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Alex R.</h4>
                      <p className="text-xs text-blue-600 font-medium">alex.prep@studyflow.edu</p>
                    </div>
                  </div>

                  {/* Study Track Switcher */}
                  <div className="py-3 border-b border-slate-100">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Active Target Exam Track
                    </label>
                    <select
                      value={userTrack}
                      onChange={(e) => setUserTrack(e.target.value)}
                      className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-600"
                    >
                      <option value="MCAT Prep">MCAT Prep</option>
                      <option value="AP Calculus BC">AP Calculus BC</option>
                      <option value="Digital SAT (Target 1520+)">Digital SAT (Target 1520+)</option>
                      <option value="GRE General (Target 328+)">GRE General (Target 328+)</option>
                      <option value="IELTS Band 8.0+">IELTS Band 8.0+</option>
                      <option value="NY Regents Chemistry">NY Regents Chemistry</option>
                      <option value="LSAT 170+ Sprint">LSAT 170+ Sprint</option>
                    </select>
                  </div>

                  {/* Quick Profile Metrics */}
                  <div className="grid grid-cols-2 gap-2 py-3 border-b border-slate-100 text-center">
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Streak</p>
                      <p className="text-sm font-extrabold text-slate-800 mt-0.5">6 Days 🔥</p>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl">
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Diagnostic</p>
                      <p className="text-sm font-extrabold text-emerald-600 mt-0.5">88% Avg</p>
                    </div>
                  </div>

                  {/* Quick Navigation Links */}
                  <div className="pt-3 space-y-1">
                    <Link
                      to="/analytics"
                      onClick={() => setShowProfile(false)}
                      className="block px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      📊 View Performance Analytics
                    </Link>
                    <Link
                      to="/schedule"
                      onClick={() => setShowProfile(false)}
                      className="block px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors"
                    >
                      📅 Study Schedule & Deadlines
                    </Link>
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </header>

      {/* 3. MODAL: TRIGGERED BY THE (+) BUTTON */}
      {showNewSessionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-7">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 font-black text-sm flex items-center justify-center">
                  +
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Start New Study Session</h3>
                  <p className="text-xs text-slate-400">Customize your next focused review</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowNewSessionModal(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLaunchSession} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Target Exam
                </label>
                <select
                  value={sessionExam}
                  onChange={(e) => setSessionExam(e.target.value)}
                  className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-600"
                >
                  <option value="/exam/ap-calculus">AP Calculus BC & AB</option>
                  <option value="/exam/sat-digital">Digital SAT Adaptive Math & Reading</option>
                  <option value="/exam/gre-quant-verbal">GRE General Quant & Verbal</option>
                  <option value="/exam/ielts-prep">IELTS Academic & General</option>
                  <option value="/exam/regents-chemistry">NY Regents Chemistry</option>
                  <option value="/exam/act-prep">ACT Science & Fast Math</option>
                  <option value="/exam/toefl-ibt">TOEFL iBT 2-Hour Booster</option>
                  <option value="/exam/lsat-reasoning">LSAT Logical Reasoning</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Study Format / Goal
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'Speed Drill (15m)',
                    'Diagnostic Mock (Full)',
                    'Formula Review',
                    'Difficult Problems Pack'
                  ].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setSessionMode(mode)}
                      className={`p-2.5 rounded-xl text-xs font-bold border text-left transition-all ${
                        sessionMode === mode
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowNewSessionModal(false)}
                  className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/25 transition-all"
                >
                  Launch Session →
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </>
  );
}