import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Section1 from './components/Section1';
import Schedule from './pages/Schedule';
import Analytics from './pages/Analytics';
import Resources from './pages/Resources';

// 8 Dedicated Exam Pages
import ApCalculus from './pages/ApCalculus';
import RegentsChemistry from './pages/RegentsChemistry';
import IeltsPrep from './pages/IeltsPrep';
import SatDigital from './pages/SatDigital';
import ActPrep from './pages/ActPrep';
import ToeflIbt from './pages/ToeflIbt';
import GreGeneral from './pages/GreGeneral';
import LsatReasoning from './pages/LsatReasoning';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Fixed Header on every screen */}
      <Header />

      {/* Routes */}
      <Routes>
        {/* Main Nav Tabs */}
        <Route path="/" element={<Section1 />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/resources" element={<Resources />} />

        {/* 8 Exam Routes */}
        <Route path="/exam/ap-calculus" element={<ApCalculus />} />
        <Route path="/exam/regents-chemistry" element={<RegentsChemistry />} />
        <Route path="/exam/ielts-prep" element={<IeltsPrep />} />
        <Route path="/exam/sat-digital" element={<SatDigital />} />
        <Route path="/exam/act-prep" element={<ActPrep />} />
        <Route path="/exam/toefl-ibt" element={<ToeflIbt />} />
        <Route path="/exam/gre-quant-verbal" element={<GreGeneral />} />
        <Route path="/exam/lsat-reasoning" element={<LsatReasoning />} />
      </Routes>
    </div>
  );
}