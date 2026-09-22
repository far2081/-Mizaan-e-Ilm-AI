'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QuestionInput from '@/components/QuestionInput';
import ResponseView from '@/components/ResponseView';
import TraditionCompareView from '@/components/TraditionCompareView';
import SourceLibraryView from '@/components/SourceLibraryView';
import ScholarReviewView from '@/components/ScholarReviewView';
import AuditTrailView from '@/components/AuditTrailView';
import ApiKeyModal from '@/components/ApiKeyModal';
import { IslamicTradition, FatwaQueryResponse } from '@/types';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'research' | 'compare' | 'library' | 'review' | 'audit'>('research');
  const [selectedTradition, setSelectedTradition] = useState<IslamicTradition>('all');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<FatwaQueryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [pendingReviewsCount, setPendingReviewsCount] = useState(0);

  useEffect(() => {
    const savedKey = localStorage.getItem('mizaan_gemini_api_key') || '';
    setApiKey(savedKey);

    // Initial check for pending reviews
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setPendingReviewsCount(data.pendingCount || 0))
      .catch(() => {});
  }, []);

  const handleSaveApiKey = (newKey: string) => {
    setApiKey(newKey);
    localStorage.setItem('mizaan_gemini_api_key', newKey);
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question.trim(),
          tradition: selectedTradition,
          apiKey: apiKey.trim()
        })
      });

      const data = await res.json();
      setResponse(data);

      if (data.isHighRisk) {
        setPendingReviewsCount(prev => prev + 1);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedTradition={selectedTradition}
        setSelectedTradition={setSelectedTradition}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={Boolean(apiKey)}
        pendingReviewCount={pendingReviewsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {activeTab === 'research' && (
          <div className="space-y-8">
            
            {/* Hero Section */}
            <div className="text-center space-y-3 font-urdu max-w-3xl mx-auto mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <span>بسم اللہ الرحمن الرحیم</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                میزانِ علم — مستند فقہی ریفرنس
              </h2>
              <p className="text-sm sm:text-base text-emerald-300/80 leading-relaxed">
                مستند اسلامی مصادر کی روشنی میں سوالات کے مدلل اور حوالہ بند جوابات۔
                <br />
                <span className="text-amber-300 font-semibold">« کوئی فتویٰ بغیر تصدیق شدہ اصل ماخذ کے پیش نہیں کیا جائے گا »</span>
              </p>
            </div>

            {/* Question Input Box */}
            <QuestionInput
              question={question}
              setQuestion={setQuestion}
              selectedTradition={selectedTradition}
              setSelectedTradition={setSelectedTradition}
              onSubmit={handleSearch}
              isLoading={isLoading}
            />

            {/* Results Display */}
            <ResponseView response={response} isLoading={isLoading} />

          </div>
        )}

        {activeTab === 'compare' && (
          <TraditionCompareView />
        )}

        {activeTab === 'library' && (
          <SourceLibraryView />
        )}

        {activeTab === 'review' && (
          <ScholarReviewView />
        )}

        {activeTab === 'audit' && (
          <AuditTrailView />
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onSave={handleSaveApiKey}
        currentKey={apiKey}
      />

    </div>
  );
}
