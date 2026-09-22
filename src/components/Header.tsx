'use client';

import React from 'react';
import Image from 'next/image';
import { BookOpen, Key, ShieldCheck, FileText, Layers, Scale, Sparkles } from 'lucide-react';
import { IslamicTradition } from '@/types';

interface HeaderProps {
  activeTab: 'research' | 'compare' | 'library' | 'review' | 'audit';
  setActiveTab: (tab: 'research' | 'compare' | 'library' | 'review' | 'audit') => void;
  selectedTradition: IslamicTradition;
  setSelectedTradition: (t: IslamicTradition) => void;
  onOpenApiKeyModal: () => void;
  hasApiKey: boolean;
  pendingReviewCount: number;
}

export default function Header({
  activeTab,
  setActiveTab,
  selectedTradition,
  setSelectedTradition,
  onOpenApiKeyModal,
  hasApiKey,
  pendingReviewCount
}: HeaderProps) {
  return (
    <header className="border-b border-emerald-900/60 bg-[#070e0a]/90 backdrop-blur-md sticky top-0 z-50 no-print transition-all">
      {/* Top Banner / Brand Promise */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900/50 to-[#070e0a] border-b border-emerald-800/40 text-xs py-1.5 px-4 text-emerald-300/90 flex flex-wrap items-center justify-between font-urdu">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            اصل ماخذ پر مبنی نظام
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="text-emerald-200 font-medium tracking-wide">
            « حوالہ پہلے، جواب بعد میں — ہر موقف اپنے مستند ماخذ کے ساتھ »
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px] font-sans">
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Source-Locked Engine
          </span>
          <span className="text-emerald-700">|</span>
          <span className="text-amber-300/90">No Cross-Attribution</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand & Logo Area */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-emerald-500/40 shadow-lg shadow-emerald-950/50 bg-black/40 flex-shrink-0 group hover:border-emerald-400 transition">
            <Image
              src="/logo.jpg"
              alt="NEXORA AI Logo"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-l from-emerald-400 via-emerald-200 to-amber-200 bg-clip-text text-transparent font-urdu">
                میزانِ علم
              </h1>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-700/60 text-emerald-300 font-sans">
                Mizaan-e-Ilm AI
              </span>
            </div>
            <p className="text-xs text-emerald-400/80 font-urdu -mt-1">
              مستند فتاویٰ و اسلامی تحقیقاتی ریفرنس پلیٹ فارم
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 p-1 bg-emerald-950/60 border border-emerald-800/40 rounded-xl font-urdu text-sm overflow-x-auto">
          <button
            onClick={() => setActiveTab('research')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'research'
                ? 'bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-900/60'
                : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>فتویٰ و تحقیق</span>
          </button>

          <button
            onClick={() => setActiveTab('compare')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'compare'
                ? 'bg-emerald-600 text-white font-semibold shadow-md'
                : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <Scale className="w-4 h-4" />
            <span>تقابلی جائزہ</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'library'
                ? 'bg-emerald-600 text-white font-semibold shadow-md'
                : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>مستند لائبریری</span>
          </button>

          <button
            onClick={() => setActiveTab('review')}
            className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'review'
                ? 'bg-amber-600 text-white font-semibold shadow-md'
                : 'text-amber-200/80 hover:text-white hover:bg-amber-950/40'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>نظرِ مفتی / ریویو</span>
            {pendingReviewCount > 0 && (
              <span className="px-1.5 py-0.2 text-[10px] bg-red-600 text-white font-bold rounded-full animate-pulse">
                {pendingReviewCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'audit'
                ? 'bg-emerald-600 text-white font-semibold shadow-md'
                : 'text-emerald-200/80 hover:text-white hover:bg-emerald-900/40'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>آڈٹ ٹریل</span>
          </button>
        </nav>

        {/* Action Controls & API Key */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenApiKeyModal}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              hasApiKey
                ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-300 hover:bg-emerald-800/50'
                : 'bg-amber-950/40 border-amber-500/50 text-amber-300 hover:bg-amber-900/50 animate-pulse'
            }`}
            title="AI ماڈل API Key سیٹنگز"
          >
            <Key className="w-3.5 h-3.5" />
            <span>{hasApiKey ? 'API چالو ہے' : 'API Key شامل کریں'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
