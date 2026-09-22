'use client';

import React, { useState, useEffect } from 'react';
import { Key, ShieldCheck, X, Sparkles, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (key: string) => void;
  currentKey: string;
}

export default function ApiKeyModal({ isOpen, onClose, onSave, currentKey }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState(currentKey);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setApiKey(currentKey);
  }, [currentKey]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(apiKey.trim());
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setApiKey('');
    onSave('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0b1710] border border-emerald-700/60 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative text-right font-urdu text-emerald-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-1.5 rounded-lg text-emerald-400 hover:text-white hover:bg-emerald-900/60 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <Key className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">AI ماڈل API Key سیٹنگز</h3>
            <p className="text-xs text-emerald-400/80 font-sans">
              Google Gemini / AI Model Custom API Key
            </p>
          </div>
        </div>

        {/* Informational Box */}
        <div className="bg-emerald-950/60 border border-emerald-800/40 rounded-xl p-3.5 mb-5 text-xs text-emerald-300 leading-relaxed">
          <p className="mb-2">
            <strong>اہم نوٹ:</strong> آپ اپنی ذاتی Google Gemini API Key یہاں داخل کر سکتے ہیں۔ یہ کلید صرف آپ کے براؤزر کے محفوظ اسٹوریج میں رکھی جاتی ہے۔
          </p>
          <p className="text-emerald-400/90 text-[11px]">
            ✨ اگر آپ کے پاس فی الوقت API Key نہیں ہے، تب بھی سسٹم کی <strong>سورس لاکڈ لائبریری</strong> اور رول بیسڈ انجن مکمل طور پر کام کرتا ہے۔ آپ بعد میں کبھی بھی اپنی کلید یہاں شامل کر سکتے ہیں۔
          </p>
        </div>

        {/* Input Field */}
        <div className="mb-5">
          <label className="block text-sm font-medium text-emerald-200 mb-1.5">
            API Key درج فرمائیں:
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-emerald-800/80 text-white font-mono text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-left"
            dir="ltr"
          />
          <div className="flex items-center justify-between mt-2 text-[11px] text-emerald-400/70 font-sans">
            <span>Free Google Gemini API Key can be obtained from Google AI Studio</span>
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-amber-300 hover:underline"
            >
              Get API Key <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {showSuccess && (
          <div className="mb-4 p-2.5 bg-emerald-500/20 border border-emerald-500/50 rounded-xl text-center text-xs text-emerald-200 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>API Key کامیابی سے محفوظ ہو گئی ہے!</span>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-emerald-900/60">
          {apiKey ? (
            <button
              onClick={handleClear}
              className="text-xs text-red-400 hover:text-red-300 font-sans transition"
            >
              Clear Key
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs rounded-xl bg-emerald-950/80 text-emerald-300 hover:bg-emerald-900 transition"
            >
              بند کریں
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-900/40 hover:from-emerald-500 hover:to-emerald-400 transition"
            >
              محفوظ کریں
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
