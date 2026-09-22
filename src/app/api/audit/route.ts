import { NextResponse } from 'next/server';
import { globalAuditRecords } from '@/lib/sourceVerifier';

export async function GET() {
  return NextResponse.json({
    total: globalAuditRecords.length,
    records: globalAuditRecords
  });
}
