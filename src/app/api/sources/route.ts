import { NextRequest, NextResponse } from 'next/server';
import sourcesDb from '@/data/sources-db.json';
import { IslamicSourceRecord } from '@/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tradition = searchParams.get('tradition');
  const search = searchParams.get('q')?.toLowerCase();

  let sources = sourcesDb as IslamicSourceRecord[];

  if (tradition && tradition !== 'all') {
    sources = sources.filter(s => s.tradition === tradition);
  }

  if (search) {
    sources = sources.filter(s => 
      s.bookTitleUrdu.toLowerCase().includes(search) ||
      s.authorUrdu.toLowerCase().includes(search) ||
      s.chapterUrdu?.toLowerCase().includes(search) ||
      s.originalUrduText.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({
    total: sources.length,
    sources
  });
}
