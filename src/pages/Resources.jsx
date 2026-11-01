import React, { useState } from 'react';
import Footer from '../components/Footer';

// Rich resource database with actual viewable study content
const RESOURCE_ITEMS = [
  {
    id: 'calc-formulas',
    category: 'Math & Calculus',
    title: 'AP Calculus BC & AB Complete Formula Sheet',
    format: 'Formula Cheatsheet • 4 Pages',
    tag: 'Calculus',
    desc: 'All derivatives, integration techniques, Taylor series expansions, disk/washer volumes, and convergence tests.',
    content: {
      subtitle: 'Official College Board Exam Formula Reference',
      sections: [
        {
          heading: '1. Essential Derivative Rules',
          items: [
            { label: 'Product Rule', formula: 'd/dx [u · v] = u\'v + uv\'' },
            { label: 'Quotient Rule', formula: 'd/dx [u / v] = (u\'v - uv\') / v²' },
            { label: 'Chain Rule', formula: 'd/dx [f(g(x))] = f\'(g(x)) · g\'(x)' },
            { label: 'Inverse Trig', formula: 'd/dx [arcsin(x)] = 1 / √(1 - x²),  d/dx [arctan(x)] = 1 / (1 + x²)' }
          ]
        },
        {
          heading: '2. Integration Techniques',
          items: [
            { label: 'Integration by Parts', formula: '∫ u dv = u·v - ∫ v du' },
            { label: 'Fundamental Theorem of Calculus', formula: 'd/dx [∫(a to x) f(t) dt] = f(x)' },
            { label: 'Average Value of f(x)', formula: 'f_avg = [1 / (b - a)] · ∫(a to b) f(x) dx' }
          ]
        },
        {
          heading: '3. Taylor & Maclaurin Series (BC Only)',
          items: [
            { label: 'e^x', formula: 'Σ [x^n / n!] = 1 + x + x²/2! + x³/3! + ...' },
            { label: 'sin(x)', formula: 'Σ [(-1)^n · x^(2n+1) / (2n+1)!] = x - x³/3! + x⁵/5! - ...' },
            { label: 'cos(x)', formula: 'Σ [(-1)^n · x^(2n) / (2n)!] = 1 - x²/2! + x⁴/4! - ...' },
            { label: '1 / (1 - x)', formula: 'Σ [x^n] = 1 + x + x² + x³ + ... for |x| < 1' }
          ]
        },
        {
          heading: '4. Volumes of Revolution',
          items: [
            { label: 'Disk Method', formula: 'V = π ∫(a to b) [R(x)]² dx' },
            { label: 'Washer Method', formula: 'V = π ∫(a to b) ([R(x)]² - [r(x)]²) dx' },
            { label: 'Known Cross Sections', formula: 'V = ∫(a to b) A(x) dx  (A = s² for squares, A = (π/8)s² for semicircles)' }
          ]
        }
      ]
    }
  },
  {
    id: 'chem-tables',
    category: 'Chemistry & Science',
    title: 'NYS Regents Chemistry Reference Tables (A through T)',
    format: 'Official Reference Booklet • 12 Tables',
    tag: 'Chemistry',
    desc: 'Electronegativity values (Table S), solubility guidelines (Table F), and all standard thermodynamic equations.',
    content: {
      subtitle: 'High-Yield New York State Chemistry Reference Tables',
      sections: [
        {
          heading: 'Table T: Standard Formulas',
          items: [
            { label: 'Heat Calculation', formula: 'q = m · C · ΔT  (C_water = 4.18 J/g·°C)' },
            { label: 'Titration Neutralization', formula: 'M_A · V_A = M_B · V_B' },
            { label: 'Combined Gas Law', formula: '(P₁ · V₁) / T₁ = (P₂ · V₂) / T₂  (Temperatures strictly in Kelvin)' },
            { label: 'Parts Per Million (ppm)', formula: 'ppm = (mass of solute / mass of solution) × 1,000,000' }
          ]
        },
        {
          heading: 'Table S: Selected Periodic Properties',
          items: [
            { label: 'Fluorine (F)', formula: 'Electronegativity: 4.0 | 1st Ionization Energy: 1681 kJ/mol | Radius: 60 pm' },
            { label: 'Cesium (Cs)', formula: 'Electronegativity: 0.8 | 1st Ionization Energy: 376 kJ/mol | Radius: 238 pm' },
            { label: 'Carbon (C)', formula: 'Electronegativity: 2.6 | 1st Ionization Energy: 1086 kJ/mol | Radius: 67 pm' }
          ]
        },
        {
          heading: 'Table M: Common Acid-Base Indicators',
          items: [
            { label: 'Phenolphthalein', formula: 'Colorless below pH 8.2 — Turns vibrant pink above pH 9.0' },
            { label: 'Bromthymol Blue', formula: 'Yellow below pH 6.0 — Blue above pH 7.6' },
            { label: 'Litmus Paper', formula: 'Red in acid (pH < 5.5) — Blue in base (pH > 8.2)' }
          ]
        }
      ]
    }
  },
  {
    id: 'desmos-guide',
    category: 'Digital SAT',
    title: 'Desmos Graphing Calculator Speed Run Guide',
    format: 'Strategy Blueprint • 5 Proven Hacks',
    tag: 'SAT',
    desc: 'Regression tricks, systems of equations intersections, and quadratic vertex shortcuts that save 15+ minutes.',
    content: {
      subtitle: 'Save 15+ Minutes on Module 1 & 2 Math with Built-In Desmos',
      sections: [
        {
          heading: 'Hack #1: Instant System of Equations Solution',
          items: [
            { label: 'How to use', formula: 'Type both equations exactly as they appear (e.g. 3x - 5y = 12 and y = 2x + 7).' },
            { label: 'Why it works', formula: 'Desmos automatically marks the intersection point with a gray dot. Click it to read (x, y) with zero algebraic manipulation!' }
          ]
        },
        {
          heading: 'Hack #2: Linear & Quadratic Regression Model (~)',
          items: [
            { label: 'Setup', formula: 'Insert table with coordinates (x1, y1).' },
            { label: 'Linear Command', formula: 'Type: y1 ~ m·x1 + b' },
            { label: 'Quadratic Command', formula: 'Type: y1 ~ a·x1² + b·x1 + c' },
            { label: 'Result', formula: 'Desmos instantly solves parameters m, b, a, and R².' }
          ]
        },
        {
          heading: 'Hack #3: Single Variable Equation Direct Solver',
          items: [
            { label: 'Example', formula: 'Solve 4(x - 3) + 7 = 3(2x + 1)' },
            { label: 'Method', formula: 'Type the whole equation directly. Desmos plots a vertical line at the exact answer. Click the x-axis intercept to read x!' }
          ]
        }
      ]
    }
  },
  {
    id: 'gre-vocab',
    category: 'Vocabulary',
    title: 'Top 500 High-Frequency GRE & SAT Vocabulary Roots',
    format: 'Word Mastery Bank • Core 8 Roots',
    tag: 'Verbal',
    desc: 'Master Greek and Latin prefixes, dual-meaning words, and secondary definitions essential for Verbal Reasoning.',
    content: {
      subtitle: 'High-Yield Roots, Prefixes & Exam-Tested Words',
      sections: [
        {
          heading: 'High-Frequency Words Tested in Sentence Equivalence',
          items: [
            { label: 'Laconic (adj.)', formula: 'Using very few words; concise and terse. "His laconic reply conveyed annoyance."' },
            { label: 'Pernicious (adj.)', formula: 'Having a gradual, subtle, harmful effect. "The pernicious influence of disinformation."' },
            { label: 'Equivocate (v.)', formula: 'To use ambiguous language to mislead or dodge truth. "The politician equivocated on tax increases."' },
            { label: 'Profligate (adj.)', formula: 'Recklessly extravagant or wasteful. "Profligate spending depleted municipal reserves."' }
          ]
        },
        {
          heading: 'High-Yield Greek & Latin Roots',
          items: [
            { label: 'BELL- (War)', formula: 'Bellicose (aggressive), Belligerent (hostile), Antebellum (before the war)' },
            { label: 'LUC / LUM- (Light)', formula: 'Lucid (clear), Pellucid (crystal clear), Luminary (eminent person)' },
            { label: 'MAL- (Bad / Evil)', formula: 'Maladroit (clumsy), Malevolent (spiteful), Malign (defame)' }
          ]
        }
      ]
    }
  },
  {
    id: 'ielts-templates',
    category: 'English & ESL',
    title: 'IELTS Band 8+ Writing Task 1 & 2 Templates',
    format: 'Essay Frameworks • Band 9 Rubric',
    tag: 'IELTS',
    desc: 'High-scoring cohesive linkers, data trend lexical resources, and thesis statement structures.',
    content: {
      subtitle: 'Examiner-Approved Paragraph Layouts & Lexical Connectors',
      sections: [
        {
          heading: 'Task 1: The 4-Paragraph Framework',
          items: [
            { label: 'Paragraph 1: Paraphrase', formula: 'The provided [bar chart/line graph] illustrates changes in [topic] across [region] between [year] and [year].' },
            { label: 'Paragraph 2: Overall Overview', formula: 'Overall, it is readily apparent that while [Category A] experienced an upward trajectory, [Category B] witnessed a steady decline.' },
            { label: 'Paragraph 3: Key Detail 1', formula: 'Regarding [Category A], initial figures stood at [X%] in [Year], before climbing precipitously to a peak of [Y%].' },
            { label: 'Paragraph 4: Key Detail 2', formula: 'By stark contrast, [Category B] fluctuated between [X] and [Y], ultimately plateauing at [Z].' }
          ]
        },
        {
          heading: 'Band 8+ Trend Vocabulary Bank',
          items: [
            { label: 'Sharp Rise', formula: 'Surged, soared, escalated dramatically, climbed exponentially' },
            { label: 'Sharp Drop', formula: 'Plummeted, plunged, witnessed a sharp downturn' },
            { label: 'Stability', formula: 'Remained constant, hovered around, plateaued at' }
          ]
        }
      ]
    }
  },
  {
    id: 'toefl-models',
    category: 'English & ESL',
    title: 'TOEFL iBT Academic Discussion 10-Minute Model Bank',
    format: 'Official 2024 Scoring Rubrics',
    tag: 'TOEFL',
    desc: '20 prompt templates demonstrating how to synthesise classmate viewpoints and present standalone arguments.',
    content: {
      subtitle: 'Score 5.0 (Band 30) Academic Discussion Architecture',
      sections: [
        {
          heading: 'The 3-Step 120-Word Writing Template',
          items: [
            { label: 'Sentence 1-2: Acknowledge Classmates', formula: '"While [Student A] rightly highlights that [point], I strongly concur with [Student B] that [opposing point] produces far more durable benefits."' },
            { label: 'Sentence 3-5: Add Unexplored Angle', formula: '"An overlooked dimension of this debate is that [new perspective]. When governments implement [policy], it directly stimulates [broader societal impact]."' },
            { label: 'Sentence 6: Concluding Synthesis', formula: '"Therefore, prioritizing [preferred approach] not only addresses immediate concerns but also establishes equitable long-term sustainability."' }
          ]
        },
        {
          heading: 'High-Scoring Synonyms & Connectors',
          items: [
            { label: 'Agreeing with nuance', formula: '"I align with [Name]\'s assertion that...", "While [Name] makes a compelling case..."' },
            { label: 'Adding depth', formula: '"Furthermore, empirical evidence demonstrates that...", "Crucially, this overlook..."' }
          ]
        }
      ]
    }
  }
];

export default function Resources() {
  const [filter, setFilter] = useState('All');
  const [activeModalResource, setActiveModalResource] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const categories = ['All', 'Math & Calculus', 'Chemistry & Science', 'Digital SAT', 'Vocabulary', 'English & ESL'];

  const filtered = RESOURCE_ITEMS.filter((item) => filter === 'All' || item.category === filter);

  const handleCopyText = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 pt-16">
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Header Banner */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 mb-8 shadow-xs">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-200 inline-block mb-3">
            Exam Prep Library
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Study Resources & Cheat Sheets
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Click <strong>"View Resource"</strong> on any card to instantly open interactive formula sheets, 
            official reference tables, Desmos calculators, and vocabulary decks.
          </p>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pt-6 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  filter === c
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-blue-500 hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold text-[10px]">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                  {item.desc}
                </p>
                <div className="text-[11px] font-semibold text-slate-400 mt-4 flex items-center gap-1.5">
                  <span>📄</span>
                  <span>{item.format}</span>
                </div>
              </div>

              {/* View Resource Button (Opens the Modal) */}
              <button
                type="button"
                onClick={() => setActiveModalResource(item)}
                className="mt-6 w-full py-2.5 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm shadow-blue-500/20 transition-all text-center flex items-center justify-center gap-2"
              >
                <span>View Resource</span>
                <span>→</span>
              </button>
            </div>
          ))}
        </div>

      </main>

      {/* --- INTERACTIVE RESOURCE VIEWER MODAL --- */}
      {activeModalResource && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[88vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="pr-4">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-1">
                  {activeModalResource.category} • {activeModalResource.tag}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                  {activeModalResource.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {activeModalResource.content.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalResource(null)}
                className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center text-sm font-bold shrink-0 transition-colors"
                title="Close Viewer"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {activeModalResource.content.sections.map((section, sIdx) => (
                <div key={sIdx} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                  <h4 className="text-xs font-black uppercase text-blue-600 tracking-wider mb-3">
                    {section.heading}
                  </h4>

                  <div className="space-y-2.5">
                    {section.items.map((item, iIdx) => {
                      const itemKey = `${sIdx}-${iIdx}`;
                      const isCopied = copiedKey === itemKey;

                      return (
                        <div
                          key={iIdx}
                          className="p-3.5 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-blue-300 transition-colors"
                        >
                          <div className="flex-1">
                            <span className="text-xs font-bold text-slate-900 block mb-0.5">
                              {item.label}
                            </span>
                            <span className="text-xs font-mono text-slate-700 leading-relaxed block break-words">
                              {item.formula}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleCopyText(item.formula, itemKey)}
                            className="self-end sm:self-center px-2.5 py-1 text-[11px] font-bold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600 active:scale-95 transition-all shrink-0"
                          >
                            {isCopied ? '✓ Copied' : 'Copy'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Bottom Toolbar */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Official StudyFlow Prep Reference Library
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert(`Printing/Downloading ${activeModalResource.title}...`)}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 font-bold rounded-xl text-slate-700 transition-colors"
                >
                  Print / Save
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalResource(null)}
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-sm transition-colors"
                >
                  Close Viewer
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}