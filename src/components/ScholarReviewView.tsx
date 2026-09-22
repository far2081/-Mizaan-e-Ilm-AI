'use client';

import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle, XCircle, AlertCircle, RefreshCw, FileText, UserCheck } from 'lucide-react';
import { FatwaQueryResponse } from '@/types';

export default function ScholarReviewView() {
  const [reviews, setReviews] = useState<FatwaQueryResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [actingId, setActingId] = useState<string | null>(null);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reviews');
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleAction = async (queryId: string, action: 'approved' | 'rejected') => {
    setActingId(queryId);
    try {
      await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          queryId,
          action,
          reviewerNotes: notes[queryId] || 'مفتی صاحب کی تصدیق',
          reviewerName: 'مجلسِ تحقیق و افتاء'
        })
      });
      fetchReviews();
    } catch (err) {
      console.error(err);
    } finally {
      setActingId(null);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-urdu text-right">
      
      {/* Header */}
      <div className="bg-amber-950/30 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs mb-2">
              <UserCheck className="w-4 h-4 text-amber-400" />
              <span>مجلسِ توثیق و نظرِ مفتی (Scholar Review Layer)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              حساس فتاویٰ و مسائل کی انسانی و مفتیانہ تصدیق
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/80 leading-relaxed mt-1">
              طلاق، نکاح، حدود، میراث اور پیچیدہ مالی معاملات کو AI کے خودکار جواب کے ساتھ ساتھ مستند مفتیانِ کرام کی نظر سے گزارا جاتا ہے۔
            </p>
          </div>
          <button
            onClick={fetchReviews}
            className="p-3 bg-amber-950 hover:bg-amber-900 border border-amber-700/60 rounded-xl text-amber-200 flex items-center gap-2 text-xs transition"
          >
            <RefreshCw className={'w-4 h-4 ' + (loading ? 'animate-spin' : '')} />
            <span>ریفریش</span>
          </button>
        </div>
      </div>

      {/* Review Queue */}
      {reviews.length === 0 ? (
        <div className="p-12 text-center bg-[#09150d] rounded-2xl border border-emerald-900/60 text-emerald-400 space-y-3">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">فی الوقت کوئی حساس فتویٰ زیرِ جائزہ نہیں ہے۔</h3>
          <p className="text-xs text-emerald-400/80">تمام جاری کردہ فتاویٰ مصدقہ مآخذ کے ساتھ کلی طور پر ہم آہنگ ہیں۔</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((rev) => (
            <div
              key={rev.queryId}
              className="p-6 rounded-2xl bg-[#09150d] border-2 border-amber-500/40 shadow-xl space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-emerald-900/60 pb-3">
                <span className="text-xs font-bold px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full">
                  موضوع: {rev.topicCategoryUrdu} (High Risk)
                </span>
                <span className="text-xs text-emerald-400 font-mono">
                  Query ID: {rev.queryId}
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-amber-400 mb-1">صارف کا اصل سوال:</div>
                <div className="text-lg font-medium text-white">{rev.userQuestion}</div>
              </div>

              <div className="bg-black/40 p-4 rounded-xl border border-emerald-900/60 space-y-2">
                <div className="text-xs font-bold text-emerald-300">برآمد شدہ مصادر کی تعداد: {rev.traditionPositions.length} مکاتب</div>
                <div className="text-xs text-emerald-200 leading-relaxed">
                  <strong>خلاصہ جواب:</strong> {rev.shortAnswerUrdu}
                </div>
              </div>

              {/* Reviewer Note Input */}
              <div>
                <label className="block text-xs font-medium text-amber-300 mb-1">
                  مفتی صاحب کا تفصیلی نوٹ / تصحیح:
                </label>
                <textarea
                  rows={2}
                  value={notes[rev.queryId] || ''}
                  onChange={(e) => setNotes({ ...notes, [rev.queryId]: e.target.value })}
                  placeholder="اپنی شرعی توثیق یا ضروری ترمیم یہاں تحریر فرمائیں..."
                  className="w-full px-4 py-2 rounded-xl bg-black/60 border border-amber-900/60 text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  disabled={actingId === rev.queryId}
                  onClick={() => handleAction(rev.queryId, 'rejected')}
                  className="px-4 py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-red-200 text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <XCircle className="w-4 h-4" />
                  <span>رد کریں (Reject)</span>
                </button>

                <button
                  disabled={actingId === rev.queryId}
                  onClick={() => handleAction(rev.queryId, 'approved')}
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg transition"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>توثیق و منظوری (Approve Fatwa)</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
