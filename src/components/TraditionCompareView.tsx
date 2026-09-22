'use client';

import React, { useState } from 'react';
import { Scale, BookOpen, ShieldCheck, Search, CheckCircle2 } from 'lucide-react';
import sourcesDb from '@/data/sources-db.json';
import { IslamicSourceRecord } from '@/types';

export default function TraditionCompareView() {
  const [selectedTopic, setSelectedTopic] = useState('taraweeh');

  const topics = [
    {
      id: 'taraweeh',
      titleUrdu: 'تراویح کی مسنون تعداد اور طریقہ کار',
      keywords: ['تراویح']
    },
    {
      id: 'talaq',
      titleUrdu: 'ایک مجلس میں تین طلاق کا وقوع',
      keywords: ['تین طلاق']
    },
    {
      id: 'inhaler',
      titleUrdu: 'روزے میں انہیلر اور انجکشن کا حکم',
      keywords: ['انہیلر']
    }
  ];

  const currentTopic = topics.find(t => t.id === selectedTopic) || topics[0];
  const sources = sourcesDb as IslamicSourceRecord[];

  const deobandiSource = sources.find(s => s.tradition === 'deobandi' && s.keywords.some(k => currentTopic.keywords.includes(k)));
  const barelviSource = sources.find(s => s.tradition === 'barelvi' && s.keywords.some(k => currentTopic.keywords.includes(k)));
  const hadithSource = sources.find(s => s.tradition === 'ahle_hadith' && s.keywords.some(k => currentTopic.keywords.includes(k)));
  const shiaSource = sources.find(s => s.tradition === 'shia' && s.keywords.some(k => currentTopic.keywords.includes(k)));

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 font-urdu text-right">
      
      {/* Title & Description */}
      <div className="bg-[#0b1710] border border-emerald-800/60 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs">
          <Scale className="w-4 h-4" />
          <span>تقابلی جائزہ و مکاتبِ فکر کا باہمی مطالعہ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">
          مختلف مکاتبِ فکر کا تقابلی و مدلل فقیہی منظرنامہ
        </h2>
        <p className="text-xs sm:text-sm text-emerald-300/80 max-w-2xl mx-auto leading-relaxed">
          کسی بھی مکتب کی رائے کو دوسرے پر خلط ملط کیے بغیر، ہر ایک کی مستند اور منظور شدہ کتاب سے اصل عبارت اور صفحہ نمبر کے ساتھ تقابل۔
        </p>
      </div>

      {/* Topic Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {topics.map(t => (
          <button
            key={t.id}
            onClick={() => setSelectedTopic(t.id)}
            className={'px-5 py-2.5 rounded-2xl text-sm font-semibold border transition-all ' + (
              selectedTopic === t.id
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400 shadow-lg shadow-emerald-950/50 scale-102'
                : 'bg-[#09150d] text-emerald-300/80 border-emerald-900 hover:border-emerald-700 hover:text-white'
            )}
          >
            {t.titleUrdu}
          </button>
        ))}
      </div>

      {/* 4-Columns Grid Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. Deobandi */}
        <div className="rounded-2xl bg-[#09150d] border border-emerald-700/60 overflow-hidden shadow-xl flex flex-col justify-between">
          <div>
            <div className="bg-emerald-950 p-4 border-b border-emerald-800/60">
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-sans">
                Deobandi / Hanafi
              </span>
              <h3 className="text-lg font-bold text-white mt-1">دیوبندی مکتبِ فکر</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-xs text-amber-400 font-medium">
                <strong>ماخذ:</strong> {deobandiSource?.bookTitleUrdu}
              </div>
              <div className="text-[11px] text-emerald-400/80">
                <strong>مصنف:</strong> {deobandiSource?.authorUrdu} (جلد: {deobandiSource?.volume}، صفحہ: {deobandiSource?.page})
              </div>
              <blockquote className="text-xs text-emerald-100 bg-black/40 p-3 rounded-xl border-r-2 border-amber-500 leading-relaxed">
                {deobandiSource?.originalUrduText}
              </blockquote>
            </div>
          </div>
          <div className="p-3 bg-black/30 border-t border-emerald-950 text-[10px] text-emerald-400 font-mono text-center">
            ID: {deobandiSource?.digitalSourceId}
          </div>
        </div>

        {/* 2. Barelvi */}
        <div className="rounded-2xl bg-[#09150d] border border-teal-700/60 overflow-hidden shadow-xl flex flex-col justify-between">
          <div>
            <div className="bg-teal-950 p-4 border-b border-teal-800/60">
              <span className="text-xs px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-sans">
                Barelvi / Ahle Sunnat
              </span>
              <h3 className="text-lg font-bold text-white mt-1">اہلِ سنت (بریلوی)</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-xs text-amber-400 font-medium">
                <strong>ماخذ:</strong> {barelviSource?.bookTitleUrdu}
              </div>
              <div className="text-[11px] text-teal-300/80">
                <strong>مصنف:</strong> {barelviSource?.authorUrdu} (جلد: {barelviSource?.volume}، صفحہ: {barelviSource?.page})
              </div>
              <blockquote className="text-xs text-emerald-100 bg-black/40 p-3 rounded-xl border-r-2 border-teal-500 leading-relaxed">
                {barelviSource?.originalUrduText}
              </blockquote>
            </div>
          </div>
          <div className="p-3 bg-black/30 border-t border-teal-950 text-[10px] text-teal-400 font-mono text-center">
            ID: {barelviSource?.digitalSourceId}
          </div>
        </div>

        {/* 3. Ahle Hadith */}
        <div className="rounded-2xl bg-[#09150d] border border-cyan-700/60 overflow-hidden shadow-xl flex flex-col justify-between">
          <div>
            <div className="bg-cyan-950 p-4 border-b border-cyan-800/60">
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-sans">
                Ahle Hadith / Salafi
              </span>
              <h3 className="text-lg font-bold text-white mt-1">اہلِ حدیث مکتبِ فکر</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-xs text-amber-400 font-medium">
                <strong>ماخذ:</strong> {hadithSource?.bookTitleUrdu}
              </div>
              <div className="text-[11px] text-cyan-300/80">
                <strong>مصنف:</strong> {hadithSource?.authorUrdu} (جلد: {hadithSource?.volume}، صفحہ: {hadithSource?.page})
              </div>
              <blockquote className="text-xs text-emerald-100 bg-black/40 p-3 rounded-xl border-r-2 border-cyan-500 leading-relaxed">
                {hadithSource?.originalUrduText}
              </blockquote>
            </div>
          </div>
          <div className="p-3 bg-black/30 border-t border-cyan-950 text-[10px] text-cyan-400 font-mono text-center">
            ID: {hadithSource?.digitalSourceId}
          </div>
        </div>

        {/* 4. Shia */}
        <div className="rounded-2xl bg-[#09150d] border border-purple-700/60 overflow-hidden shadow-xl flex flex-col justify-between">
          <div>
            <div className="bg-purple-950 p-4 border-b border-purple-800/60">
              <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-sans">
                Shia / Ja'fari
              </span>
              <h3 className="text-lg font-bold text-white mt-1">اہلِ تشیع (امامیہ)</h3>
            </div>
            <div className="p-4 space-y-3">
              <div className="text-xs text-amber-400 font-medium">
                <strong>ماخذ:</strong> {shiaSource?.bookTitleUrdu}
              </div>
              <div className="text-[11px] text-purple-300/80">
                <strong>مرجع:</strong> {shiaSource?.authorUrdu} (جلد: {shiaSource?.volume}، صفحہ: {shiaSource?.page})
              </div>
              <blockquote className="text-xs text-emerald-100 bg-black/40 p-3 rounded-xl border-r-2 border-purple-500 leading-relaxed">
                {shiaSource?.originalUrduText}
              </blockquote>
            </div>
          </div>
          <div className="p-3 bg-black/30 border-t border-purple-950 text-[10px] text-purple-400 font-mono text-center">
            ID: {shiaSource?.digitalSourceId}
          </div>
        </div>

      </div>

    </div>
  );
}
