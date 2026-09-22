import { NextRequest, NextResponse } from 'next/server';
import { globalPendingReviews } from '@/lib/sourceVerifier';

export async function GET() {
  return NextResponse.json({
    pendingCount: globalPendingReviews.length,
    reviews: globalPendingReviews
  });
}

export async function POST(req: NextRequest) {
  try {
    const { queryId, action, reviewerNotes, reviewerName } = await req.json();
    
    const idx = globalPendingReviews.findIndex(r => r.queryId === queryId);
    if (idx !== -1) {
      const item = globalPendingReviews[idx];
      if (action === 'approved') {
        item.status = 'source_verified';
        item.requiresScholarReview = false;
      } else if (action === 'rejected') {
        item.status = 'unverified_refused';
        item.refusalMessageUrdu = 'مفتی / محقق کے معائنے کے بعد یہ سوال غیر مصدقہ قرار دیا گیا ہے۔ نوٹ: ' + (reviewerNotes || '');
      }
      globalPendingReviews.splice(idx, 1);
    }

    return NextResponse.json({ success: true, message: 'مفتی صاحب کی رائے اور فیصلہ کامیابی سے محفوظ ہو گیا۔' });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
