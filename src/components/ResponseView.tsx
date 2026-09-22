'use client';

import React, { useState } from 'react';
import { 
  Copy, Check, Printer, Volume2, VolumeX, ShieldAlert, 
  BookOpen, ChevronDown, ChevronUp, Scale
} from 'lucide-react';
import { FatwaQueryResponse } from '@/types';

interface ResponseViewProps {
  response: FatwaQueryResponse | null;
  isLoading: boolean;
}

export default function ResponseView({ response, isLoading }: ResponseViewProps) {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showPipelineDetails, setShowPipelineDetails] = useState(false);

  if (isLoading) {
    return (
      <div className="w-full max-w-4xl mx-auto my-8 p-8 rounded-2xl bg-[#09150d]/80 border border-emerald-800/40 text-center font-urdu text-emerald-200 shadow-2xl">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-400 rounded-full animate-spin" />
          <h3 className="text-xl font-bold text-white">تحقیقی عمل جاری ہے (Source-First Pipeline)...</h3>
          <div className="text-xs text-emerald-400/80 max-w-md space-y-1">
            <p>1. تصدیق شدہ مکاتب کے کتب خانوں میں تلاش جاری ہے</p>
            <p>2. اصل کتب کے مصنفین، جلد، صفحہ اور نصوص کی توثیق کی جا رہی ہے</p>
            <p>3. غیر مصدقہ قیاس آرائی پر قطعی پابندی عائد ہے</p>
          </div>
        </div>
      </div>
    );
  }

  if (!response) return null;

  const handleCopy = () => {
    const textToCopy = [
      response.bismillah,
      response.salam,
      '',
      'سوال: ' + response.userQuestion,
      '',
      'مختصر جواب:',
      response.shortAnswerUrdu,
      '',
      response.hasDisagreement && response.disagreementReasonUrdu ? 'اختلاف کی صورت میں:\n' + response.disagreementReasonUrdu + '\n' : '',
      ...response.traditionPositions.map(t => 
        '[' + t.traditionNameUrdu + ']\n' +
        'اصل ماخذ:\n' +
        t.originalSourcePassages.map(p => '• کتاب: ' + p.bookTitleUrdu + ' | مصنف: ' + p.authorUrdu + ' | جلد: ' + (p.volume || '-') + '، صفحہ: ' + (p.page || '-') + '\nعبارت: ' + p.originalQuoteUrdu).join('\n') +
        '\n\nAI کی آسان وضاحت:\n' + t.aiExplanationUrdu + '\n'
      ),
      'اصل حوالہ جات:',
      ...response.fullCitations.map(c => '• ' + c.book + ' (' + c.author + ') - ' + c.tradition + ' - جلد: ' + (c.volume || '-') + '، صفحہ: ' + (c.page || '-'))
    ].filter(Boolean).join('\n');

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert('آپ کا براؤزر ٹیکسٹ ٹو اسپیچ کو سپورٹ نہیں کرتا۔');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const textToRead = response.salam + '۔ سوال: ' + response.userQuestion + '۔ مختصر جواب: ' + response.shortAnswerUrdu;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'ur-PK';
    utterance.rate = 0.9;

    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    setIsPlayingAudio(true);
    window.speechSynthesis.speak(utterance);
  };

  const isRefusal = response.status === 'unverified_refused';

  return (
    <div className="w-full max-w-4xl mx-auto my-8 space-y-6 font-urdu text-right transition-all">
      
      {/* Pipeline Status Trace Banner */}
      <div className="bg-[#0b1710] border border-emerald-800/40 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between flex-wrap gap-2 cursor-pointer" onClick={() => setShowPipelineDetails(!showPipelineDetails)}>
          <div className="flex items-center gap-2 text-xs">
            <span className={'w-2.5 h-2.5 rounded-full ' + (isRefusal ? 'bg-red-500 animate-ping' : 'bg-emerald-400')} />
            <span className="font-bold text-emerald-200">تحقیقی مرحلہ وار آڈٹ (Source Pipeline Trace):</span>
            <span className={'text-[11px] px-2 py-0.5 rounded font-sans ' + (isRefusal ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-emerald-950 text-emerald-300 border border-emerald-700')}>
              {isRefusal ? 'NO_SOURCE_REFUSED' : 'SOURCE_VERIFIED'}
            </span>
          </div>
          <button className="text-xs text-emerald-400 hover:text-emerald-200 flex items-center gap-1 font-sans">
            {showPipelineDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            <span>{showPipelineDetails ? 'Hide Trace' : 'View Pipeline Details'}</span>
          </button>
        </div>

        {showPipelineDetails && (
          <div className="mt-3 pt-3 border-t border-emerald-900/60 space-y-2 text-xs">
            {response.pipelineTrace.map((step, i) => (
              <div key={i} className="flex items-start gap-2.5 bg-black/40 p-2 rounded-lg">
                <span className={'mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ' + (step.status === 'success' ? 'bg-emerald-400' : step.status === 'warning' ? 'bg-amber-400' : 'bg-red-500')} />
                <div>
                  <div className="font-bold text-emerald-300 font-sans">{step.stage}</div>
                  <div className="text-emerald-400/80">{step.detailsUrdu}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* High-Risk Scholar Review Warning Banner */}
      {response.isHighRisk && (
        <div className="bg-amber-950/40 border-2 border-amber-500/50 rounded-2xl p-4 shadow-xl text-amber-200 flex items-start gap-3.5">
          <ShieldAlert className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
          <div className="space-y-1 text-xs sm:text-sm">
            <h4 className="font-bold text-amber-300 text-base">
              حساس شرعی مسئلہ (High-Risk Category) — نظرِ مفتی واجب ہے
            </h4>
            <p className="leading-relaxed text-amber-200/90">
              یہ مسئلہ (نکاح، طلاق، میراث یا حساس مالی امور) کے تحت آتا ہے۔ سسٹم کے تصدیق شدہ فتاویٰ نیچے درج ہیں، تاہم انفرادی صورتحال کے حتمی نفاذ کے لیے دار الافتاء کے باقاعدہ مفتی صاحب کی توثیق ضروری ہے۔
            </p>
          </div>
        </div>
      )}

      {/* Main Fatwa Card Container */}
      <div className="fatwa-print-container relative rounded-3xl bg-[#09150d] border border-emerald-700/50 shadow-2xl p-6 sm:p-10 text-emerald-100 overflow-hidden">
        
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Actions */}
        <div className="flex items-center justify-between border-b border-emerald-800/40 pb-4 mb-6 no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-950 border border-emerald-600/40 text-emerald-300">
              {response.topicCategoryUrdu}
            </span>
            <span className="text-xs text-emerald-500/80 font-mono">
              Audit ID: {response.auditId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeak}
              className="p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-300 transition"
              title="آواز میں سنیں"
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-300 transition"
              title="فتویٰ پرنٹ کریں"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/60 text-emerald-300 transition text-xs font-medium"
              title="مکمل فتویٰ کاپی کریں"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'کاپی ہو گیا' : 'کاپی'}</span>
            </button>
          </div>
        </div>

        {/* Islamic Opening Salutations */}
        <div className="text-center space-y-2 mb-8">
          <div className="text-xl sm:text-2xl font-bold font-arabic text-amber-300 tracking-wide">
            {response.bismillah}
          </div>
          <div className="text-base sm:text-lg font-medium text-emerald-300 font-urdu">
            {response.salam}
          </div>
        </div>

        {/* User Question */}
        <div className="mb-6 p-4 rounded-2xl bg-black/40 border border-emerald-800/50">
          <div className="text-xs font-bold text-amber-400 mb-1">سوال:</div>
          <div className="text-lg text-white font-medium">{response.userQuestion}</div>
        </div>

        {/* Short Answer / Concise Synthesis */}
        <div className="mb-8 p-5 rounded-2xl bg-emerald-950/40 border border-emerald-700/60">
          <div className="text-sm font-bold text-emerald-300 mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>مختصر جواب (خلاصہ):</span>
          </div>
          <p className="text-base sm:text-lg leading-relaxed text-emerald-100">
            {response.shortAnswerUrdu}
          </p>
        </div>

        {/* Refusal Notice if unverified */}
        {isRefusal && (
          <div className="p-6 rounded-2xl bg-red-950/30 border-2 border-red-500/40 text-center space-y-3">
            <div className="text-red-400 font-bold text-lg">
              عدمِ ثبوت کا شرعی ضابطہ نافذ العمل ہوا
            </div>
            <p className="text-red-200 text-sm sm:text-base leading-relaxed">
              {response.refusalMessageUrdu}
            </p>
            <div className="text-xs text-red-300/70 font-sans">
              Principle: Source Accuracy &gt; Speed. No Fatwa is generated without verified original citation.
            </div>
          </div>
        )}

        {/* Quranic Evidence Section */}
        {response.quranicEvidence.length > 0 && (
          <div className="mb-8 space-y-4">
            <h4 className="text-base font-bold text-amber-300 border-r-4 border-amber-500 pr-3 flex items-center gap-2">
              <span>قرآن مجید کی روشنی میں:</span>
            </h4>
            {response.quranicEvidence.map((q, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#07130b] border border-amber-900/40 space-y-3">
                <div className="text-xl font-arabic text-amber-200 text-center py-2 leading-loose" dir="rtl">
                  {q.arabicText}
                </div>
                {q.translations.map((t, tidx) => (
                  <div key={tidx} className="text-sm text-emerald-200/90 leading-relaxed border-t border-emerald-900/60 pt-2">
                    <span className="text-xs text-amber-400 font-bold ml-2">ترجمہ ({t.translator}):</span>
                    {t.urduText}
                  </div>
                ))}
                <div className="text-xs text-emerald-400/80 font-sans border-t border-emerald-950 pt-2 flex justify-between">
                  <span>سورة: {q.surahNameUrdu} | آیت نمبر: {q.ayah}</span>
                  <span>ماخذ: King Fahd Quran Complex</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hadith Evidence Section */}
        {response.hadithEvidence.length > 0 && (
          <div className="mb-8 space-y-4">
            <h4 className="text-base font-bold text-emerald-300 border-r-4 border-emerald-500 pr-3 flex items-center gap-2">
              <span>احادیثِ مبارکہ کی روشنی میں:</span>
            </h4>
            {response.hadithEvidence.map((h, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-[#07130b] border border-emerald-900/40 space-y-3">
                <div className="text-lg font-arabic text-emerald-200 text-center py-2 leading-loose" dir="rtl">
                  {h.arabicText}
                </div>
                <div className="text-sm text-emerald-100 leading-relaxed border-t border-emerald-900/60 pt-2">
                  <span className="text-xs text-emerald-400 font-bold ml-2">اردو ترجمہ:</span>
                  {h.urduTranslation}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-emerald-400/90 border-t border-emerald-950 pt-2 font-sans">
                  <span>کتاب: {h.collectionUrdu} (حدیث: {h.hadithNumber})</span>
                  <span>باب: {h.chapter}</span>
                  <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-600 rounded text-emerald-300">
                    درجہ: {h.gradings.map(g => g.grading).join(', ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Disagreement Explanation Section if sources differ */}
        {response.hasDisagreement && (
          <div className="mb-8 p-5 rounded-2xl bg-teal-950/40 border border-teal-600/50 space-y-2">
            <h4 className="text-sm font-bold text-teal-300 flex items-center gap-2">
              <Scale className="w-4 h-4 text-teal-400" />
              <span>اختلاف کی صورت میں (فقہی تنوع و دلائل):</span>
            </h4>
            <p className="text-sm text-teal-100 leading-relaxed">
              {response.disagreementReasonUrdu}
            </p>
          </div>
        )}

        {/* Tradition Positions - Isolated & Strictly Tagged */}
        {response.traditionPositions.length > 0 && (
          <div className="mb-8 space-y-6">
            <h4 className="text-base font-bold text-emerald-300 border-r-4 border-emerald-500 pr-3">
              مختلف مکاتبِ فکر کے مستند مصادر و فتاویٰ:
            </h4>

            <div className="grid grid-cols-1 gap-6">
              {response.traditionPositions.map((t, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-emerald-800/60 bg-[#07130b] overflow-hidden shadow-lg transition hover:border-emerald-600"
                >
                  {/* Tradition Header */}
                  <div className="bg-emerald-950/80 px-5 py-3 border-b border-emerald-800/60 flex items-center justify-between">
                    <span className="font-bold text-emerald-200 text-sm sm:text-base">
                      {t.traditionNameUrdu}
                    </span>
                    <span className="text-xs text-emerald-400 bg-black/40 px-2.5 py-1 rounded-full border border-emerald-800">
                      {t.rulingLabelUrdu}
                    </span>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Original Source Quote (اصل ماخذ) */}
                    {t.originalSourcePassages.map((p, pidx) => (
                      <div key={pidx} className="space-y-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>اصل ماخذ کی عبارت (تصدیق شدہ متن):</span>
                        </div>
                        <blockquote className="p-4 rounded-xl bg-black/50 border-r-4 border-amber-500 text-emerald-100 text-sm leading-relaxed">
                          {p.originalQuoteUrdu}
                        </blockquote>

                        {/* Citation Details Card */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] bg-emerald-950/40 p-2.5 rounded-lg border border-emerald-900/50 text-emerald-400">
                          <div><strong>کتاب:</strong> {p.bookTitleUrdu}</div>
                          <div><strong>مصنف:</strong> {p.authorUrdu}</div>
                          <div><strong>جلد:</strong> {p.volume || '-'} | <strong>صفحہ:</strong> {p.page || '-'}</div>
                          <div><strong>ناشر:</strong> {p.publisher || '-'}</div>
                        </div>
                      </div>
                    ))}

                    {/* AI Simple Grounded Explanation (AI کی آسان وضاحت) */}
                    <div className="border-t border-emerald-900/60 pt-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-400">
                        <span>AI کی آسان وضاحت (Grounded Synthesis):</span>
                      </div>
                      <p className="text-sm text-emerald-200/90 leading-relaxed bg-emerald-950/20 p-3 rounded-xl border border-emerald-900/30">
                        {t.aiExplanationUrdu}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Full Citations Audit List */}
        {response.fullCitations.length > 0 && (
          <div className="border-t border-emerald-900/60 pt-6 space-y-3">
            <h4 className="text-sm font-bold text-emerald-300">
              اصل حوالہ جات و مراجع (Full Verified Citations):
            </h4>
            <div className="space-y-1.5">
              {response.fullCitations.map((c, idx) => (
                <div key={idx} className="text-xs text-emerald-400/80 bg-black/30 p-2 rounded-lg flex flex-wrap items-center justify-between gap-2 border border-emerald-950 font-sans">
                  <span className="font-urdu font-medium text-emerald-200">
                    {idx + 1}. {c.book} — {c.author} ({c.tradition})
                  </span>
                  <span>
                    جلد: {c.volume || '-'} | صفحہ: {c.page || '-'} | Digital ID: {c.digitalId}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}