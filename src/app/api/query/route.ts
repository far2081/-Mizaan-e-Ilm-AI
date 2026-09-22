import { NextRequest, NextResponse } from 'next/server';
import { processFatwaQuery } from '@/lib/sourceVerifier';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, tradition, apiKey } = body;

    if (!question || typeof question !== 'string' || question.trim().length === 0) {
      return NextResponse.json(
        { error: 'براہ کرم کوئی شرعی سوال یا مسئلہ تحریر فرمائیں۔' },
        { status: 400 }
      );
    }

    const result = await processFatwaQuery(question.trim(), tradition || 'all', apiKey);
    return NextResponse.json(result);
  } catch (err: any) {
    console.error('Fatwa query API error:', err);
    return NextResponse.json(
      { error: 'سسٹم میں غیر متوقع مسئلہ پیش آیا۔', details: err.message },
      { status: 500 }
    );
  }
}
