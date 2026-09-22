'use client';

import React, { useState } from 'react';
import { Layers, Search, ShieldCheck, Book, Filter, ExternalLink, Calendar, CheckCircle } from 'lucide-react';
import sourcesDb from '@/data/sources-db.json';
import { IslamicSourceRecord } from '@/types';

export default function SourceLibraryView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTradition, setSelectedTradition] = useState('all');

  const sources = sourcesDb as IslamicSourceRecord[];

  const filtered = sources.filter(s => {
    if (selectedTradition !== 'all' && s.tradition !== selectedTradition) return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      s.bookTitleUrdu.toLowerCase().includes(term) ||
      s.authorUrdu.toLowerCase().includes(term) ||
      s.originalUrduText.toLowerCase().includes(term) ||
      s.digitalSourceId.toLowerCase().includes(term)
    );
  });

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 font-urdu text-right">
      
      {/* Header */}
      <div className="bg-[#0b1710] border border-emerald-800/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>مصدقہ و منظور شدہ اسلامی کتب خانہ (Source-Locked Library)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              مستند فتاویٰ و اسلامی مراجع کی سنٹرل رجسٹری
            </h2>
          </div>
          <div className="text-xs bg-emerald-950 px-4 py-2 rounded-xl border border-emerald-700/60 text-emerald-300 font-sans text-center">
            Verified Records: <strong className="text-white text-sm">{sources.length}</strong> Books & Passages
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-emerald-900/60">
          <div className="sm:col-span-2 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="کتاب کا نام، مصنف، موضوع یا ڈیجیٹل کوڈ تلاش کریں..."
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-white text-sm focus:outline-none focus:border-emerald-500"
              dir="rtl"
            />
          </div>

          <div>
            <select
              value={selectedTradition}
              onChange={(e) => setSelectedTradition(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-emerald-800 text-emerald-200 text-sm focus:outline-none focus:border-emerald-500"
            >
              <option value="all">تمام مصادر و مکاتب</option>
              <option value="deobandi">دیوبندی مصادر</option>
              <option value="barelvi">بریلوی / اہلِ سنت مصادر</option>
              <option value="ahle_hadith">اہلِ حدیث مصادر</option>
              <option value="shia">اہلِ تشیع مصادر</option>
              <option value="quran">قرآن مجید</option>
              <option value="hadith">کتبِ احادیث</option>
            </select>
          </div>
        </div>
      </div>

      {/* Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((s) => (
          <div
            key={s.id}
            className="rounded-2xl bg-[#09150d] border border-emerald-800/60 p-6 shadow-xl space-y-4 hover:border-emerald-500 transition flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 border-b border-emerald-900/60 pb-3">
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300 font-semibold">
                  {s.traditionNameUrdu}
                </span>
                <span className="text-[11px] font-mono text-amber-400 bg-black/50 px-2 py-0.5 rounded border border-amber-900/50">
                  {s.digitalSourceId}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-white">{s.bookTitleUrdu}</h3>
                <div className="text-xs text-emerald-400/90 font-medium">مصنف: {s.authorUrdu}</div>
              </div>

              {s.chapterUrdu && (
                <div className="text-xs text-emerald-300/80 bg-black/40 p-2 rounded-lg border border-emerald-950">
                  <span>باب / فصل: {s.chapterUrdu} {s.sectionUrdu ? '— ' + s.sectionUrdu : ''}</span>
                </div>
              )}

              <blockquote className="text-xs text-emerald-100 bg-emerald-950/30 p-3.5 rounded-xl border-r-4 border-amber-500 leading-relaxed max-h-36 overflow-y-auto">
                {s.originalUrduText}
              </blockquote>
            </div>

            <div className="pt-3 border-t border-emerald-950 text-[11px] text-emerald-500 flex flex-wrap items-center justify-between gap-2 font-sans">
              <span>Verified: {s.verificationDate}</span>
              <span>جلد: {s.volume || '-'} | صفحہ: {s.page || '-'}</span>
              <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                <CheckCircle className="w-3 h-3 text-emerald-400" /> {s.verificationStatus}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
