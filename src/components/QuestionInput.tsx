'use client';

import React from 'react';
import { Search, Sparkles, Filter, AlertCircle, HelpCircle, ArrowLeft } from 'lucide-react';
import { IslamicTradition } from '@/types';
import sampleQueries from '@/data/sample-queries.json';

interface QuestionInputProps {
  question: string;
  setQuestion: (q: string) => void;
  selectedTradition: IslamicTradition;
  setSelectedTradition: (t: IslamicTradition) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isLoading: boolean;
}

export default function QuestionInput({
  question,
  setQuestion,
  selectedTradition,
  setSelectedTradition,
  onSubmit,
  isLoading
}: QuestionInputProps) {
  
  const traditions: { id: IslamicTradition; labelUrdu: string; color: string }[] = [
    { id: 'all', labelUrdu: 'تمام مکاتبِ فکر (تقابلی)', color: 'border-emerald-500/40 text-emerald-300' },
    { id: 'deobandi', labelUrdu: 'دیوبندی مصادر', color: 'border-emerald-600/40 text-emerald-400' },
    { id: 'barelvi', labelUrdu: 'بریلوی / اہلِ سنت مصادر', color: 'border-teal-500/40 text-teal-300' },
    { id: 'ahle_hadith', labelUrdu: 'اہلِ حدیث مصادر', color: 'border-cyan-500/40 text-cyan-300' },
    { id: 'shia', labelUrdu: 'اہلِ تشیع مصادر', color: 'border-purple-500/40 text-purple-300' },
    { id: 'primary_sources', labelUrdu: 'صرف قرآن و سنّت', color: 'border-amber-500/40 text-amber-300' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 font-urdu text-right">
      
      {/* Tradition Filter Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
        <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
          <Filter className="w-3.5 h-3.5 text-emerald-400" />
          <span>مطلوبہ مکتبِ فکر منتخب فرمائیں:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {traditions.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTradition(t.id)}
              className={`text-xs px-3 py-1 rounded-full border transition-all ${
                selectedTradition === t.id
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md font-semibold'
                  : `bg-[#0b1710] ${t.color} hover:bg-emerald-950/60`
              }`}
            >
              {t.labelUrdu}
            </button>
          ))}
        </div>
      </div>

      {/* Main Search Input Box */}
      <form onSubmit={onSubmit} className="relative">
        <div className="relative rounded-2xl p-[1px] bg-gradient-to-l from-emerald-500/50 via-emerald-600/30 to-amber-500/40 shadow-xl shadow-emerald-950/40">
          <div className="relative flex items-center bg-[#07130b] rounded-2xl overflow-hidden p-2">
            
            <button
              type="submit"
              disabled={isLoading || !question.trim()}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-white transition-all ${
                isLoading || !question.trim()
                  ? 'bg-emerald-950/60 text-emerald-600 cursor-not-allowed border border-emerald-900/40'
                  : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-lg shadow-emerald-900/50 cursor-pointer active:scale-98'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>مصادر کی تصدیق جاری ہے...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>تحقیق فرمائیں</span>
                </>
              )}
            </button>

            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="اپنا شرعی مسئلہ یا سوال یہاں تحریر کریں (مثلاً: تراویح کی رکعات، روزے میں انہیلر، تین طلاق وغیرہ)..."
              className="w-full px-4 py-3 bg-transparent text-white text-base md:text-lg placeholder-emerald-700/80 focus:outline-none font-urdu text-right"
              dir="rtl"
            />

          </div>
        </div>
      </form>

      {/* Quick Sample Queries */}
      <div className="bg-[#09150d]/80 border border-emerald-900/40 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2 text-xs text-emerald-400 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>مثالی و آزمائشی سوالات (ایک کلک سے جانچیں):</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sampleQueries.map((sample) => (
            <button
              key={sample.id}
              type="button"
              onClick={() => {
                setQuestion(sample.titleUrdu);
                setSelectedTradition(sample.traditionHint as IslamicTradition);
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-emerald-950/50 border border-emerald-800/50 text-emerald-200/90 hover:text-white hover:border-emerald-500 hover:bg-emerald-900/40 transition text-right"
            >
              {sample.titleUrdu}
              {sample.isHighRisk && (
                <span className="mr-1.5 px-1.5 py-0.2 text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                  ہائی رسک
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
