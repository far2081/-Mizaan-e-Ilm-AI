'use client';

import React, { useState, useEffect } from 'react';
import { FileText, ShieldCheck, Search, CheckCircle, RefreshCw } from 'lucide-react';
import { AuditRecord } from '@/types';

export default function AuditTrailView() {
  const [records, setRecords] = useState<AuditRecord[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAudit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/audit');
      const data = await res.json();
      setRecords(data.records || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAudit();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 font-urdu text-right">
      
      {/* Header */}
      <div className="bg-[#0b1710] border border-emerald-800/60 rounded-3xl p-6 sm:p-8 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs mb-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>ناقابلِ تغیر آڈٹ ٹریل (Immutable Audit Logs)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              تحقیقی سوالات اور ماخذی توثیق کا تاریخی ریکارڈ
            </h2>
            <p className="text-xs sm:text-sm text-emerald-300/80 leading-relaxed mt-1">
              ہر سوال کے ساتھ مآخذ کی تلاش، تصدیق کے نتائج، اور ماڈل پروسیجر کی مکمل فرانزک تفتیش کا انتظام۔
            </p>
          </div>
          <button
            onClick={fetchAudit}
            className="p-3 bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/60 rounded-xl text-emerald-200 flex items-center gap-2 text-xs transition"
          >
            <RefreshCw className={'w-4 h-4 ' + (loading ? 'animate-spin' : '')} />
            <span>ریفریش</span>
          </button>
        </div>
      </div>

      {/* Logs Table */}
      {records.length === 0 ? (
        <div className="p-12 text-center bg-[#09150d] rounded-2xl border border-emerald-900/60 text-emerald-400 space-y-3">
          <FileText className="w-12 h-12 text-emerald-500/50 mx-auto" />
          <h3 className="text-lg font-bold text-white">ابھی تک کوئی آڈٹ ریکارڈ درج نہیں ہوا۔</h3>
          <p className="text-xs text-emerald-400/80">جیسے ہی آپ کوئی شرعی سوال پوچھیں گے، اس کا مکمل آڈٹ لاگ یہاں محفوظ ہو جائے گا۔</p>
        </div>
      ) : (
        <div className="space-y-4">
          {records.map((rec) => (
            <div
              key={rec.id}
              className="p-5 rounded-2xl bg-[#09150d] border border-emerald-800/60 shadow-lg space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-950 pb-2.5">
                <span className="font-mono text-xs text-amber-400 font-bold">{rec.id}</span>
                <span className="text-xs text-emerald-400/80 font-sans">{new Date(rec.timestamp).toLocaleString()}</span>
                <span className={'text-xs px-2.5 py-0.5 rounded-full font-bold font-sans ' + (
                  rec.validationResult === 'PASSED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
                  rec.validationResult === 'FLAGGED_HIGH_RISK' ? 'bg-amber-950 text-amber-300 border border-amber-700' :
                  'bg-red-950 text-red-300 border border-red-700'
                )}>
                  {rec.validationResult}
                </span>
              </div>

              <div>
                <div className="text-xs text-emerald-400 font-bold">سوال:</div>
                <div className="text-sm font-medium text-white">{rec.userQuestion}</div>
              </div>

              <div className="text-xs text-emerald-300/80 bg-black/40 p-3 rounded-xl border border-emerald-950">
                <div className="font-bold text-emerald-200 mb-1">استعمال شدہ مصادر ({rec.sourcesRetrievedCount}):</div>
                {rec.sourcesUsed.length === 0 ? (
                  <div className="text-red-400 text-[11px]">کوئی مستند ماخذ نہیں ملا (Refusal Triggered)</div>
                ) : (
                  <ul className="space-y-1 text-[11px]">
                    {rec.sourcesUsed.map((s, idx) => (
                      <li key={idx}>• {s.book} ({s.tradition}) — {s.volumePage} [ID: {s.digitalId}]</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
