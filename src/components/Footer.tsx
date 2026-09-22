'use client';

import React from 'react';
import Image from 'next/image';
import { Mail, Shield, AlertCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-emerald-900/60 bg-[#060c08] text-emerald-300/80 text-sm font-urdu no-print mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-emerald-950">
          
          {/* Col 1: System Purpose */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-emerald-500/30 bg-black">
                <Image src="/logo.jpg" alt="NEXORA AI" fill className="object-cover" />
              </div>
              <h3 className="text-lg font-bold text-emerald-100 font-urdu">میزانِ علم — Mizaan-e-Ilm AI</h3>
            </div>
            <p className="text-xs text-emerald-400/70 leading-relaxed">
              ایک سورس لاکڈ اسلامی ریسرچ اور فتویٰ ریفرنس پلیٹ فارم، جس کی اولین ترجیح رفتار پر نہیں بلکہ مصادر کی صحت، سند اور مکاتبِ فکر کی الگ الگ درست نسبت پر ہے۔
            </p>
            <div className="text-xs text-amber-300/90 font-urdu flex items-center gap-2 pt-1">
              <Shield className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="font-semibold">بنیادی ضابطہ: بلا تصدیق شدہ ماخذ جواب نہیں دیا جائے گا</span>
            </div>
          </div>

          {/* Col 2: Supported Traditions */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-emerald-200 border-r-2 border-emerald-500 pr-2">
              تصدیق شدہ مکاتبِ فکر
            </h4>
            <ul className="text-xs space-y-1.5 text-emerald-400/80">
              <li>• دیوبندی مصادر (فتاویٰ دارالعلوم، عثمانی، شامی وغیرہ)</li>
              <li>• اہلِ سنت / بریلوی مصادر (فتاویٰ رضویہ، بہارِ شریعت وغیرہ)</li>
              <li>• اہلِ حدیث مصادر (فتاویٰ ثنائیہ، نذیریہ، سبل السلام وغیرہ)</li>
              <li>• اہلِ تشیع مصادر (توضیح المسائل، وسائل الشیعہ وغیرہ)</li>
              <li>• قرآن مجید و متفقہ کتبِ احادیث (بخاری، مسلم، سنن اربعہ)</li>
            </ul>
          </div>

          {/* Col 3: Developer & Contact */}
          <div className="space-y-3 font-sans">
            <h4 className="text-sm font-bold text-emerald-200 font-urdu border-r-2 border-emerald-500 pr-2">
              ترقی و رابطہ (Developer & Contact)
            </h4>
            <div className="text-xs text-emerald-300">
              <span className="font-bold text-white text-base">created by NEXORA AI</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-300/90">
              <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>contect: </span>
              <a
                href="mailto:farzunmir@gmail.com"
                className="text-amber-300 hover:underline hover:text-amber-200 transition font-medium"
              >
                farzunmir@gmail/com
              </a>
            </div>
            <p className="text-[11px] text-emerald-500/70 font-urdu leading-relaxed">
              جدید ٹیکنالوجی برائے فہمِ دین و تحقیقِ شرعی۔ تمام حقوق بحقِ نیکسورا اے آئی محفوظ ہیں۔
            </p>
          </div>

        </div>

        {/* Bottom Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-500/80 pt-2">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>
              <strong>شرعی تنبیہ:</strong> یہ پلیٹ فارم صرف تحقیقی و ریفرنس کے لیے ہے۔ نکاح، طلاق، حدود، اور حساس مالی مسائل میں قریبی دار الافتاء سے بالمشافہ رجوع فرمائیں۔
            </span>
          </div>
          <div className="font-sans text-[11px] text-emerald-400/60">
            © 2026 NEXORA AI • All Rights Reserved
          </div>
        </div>

      </div>
    </footer>
  );
}
