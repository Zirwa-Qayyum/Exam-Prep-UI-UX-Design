import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-blue-600 text-white mt-auto border-t border-blue-500 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
          
          {/* Logo & Brand Info */}
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-blue-600 text-base font-extrabold shadow-sm">
              S
            </span>
            <div>
              <p className="text-base font-bold text-white tracking-tight leading-none">
                Study<span className="text-blue-200">Flow</span>
              </p>
              <p className="text-xs text-blue-100/90 mt-1">
                Standardized Exam Practice & Diagnostic Suite
              </p>
            </div>
          </div>

          {/* Frosted Feature Badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center text-[11px] font-semibold">
            <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-white backdrop-blur-sm">
              8 Standardized Exams
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-white backdrop-blur-sm">
              Official Timed Format
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/10 border border-white/15 text-white backdrop-blur-sm">
              Instant Rubric Scoring
            </span>
          </div>

          {/* Copyright */}
          <p className="text-xs text-blue-200/90 text-center sm:text-right">
            © {currentYear} StudyFlow. All rights reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}