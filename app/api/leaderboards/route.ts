import { NextResponse, NextRequest } from 'next/server';

export const revalidate = 30;

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // 30 req / min per IP

export async function GET(req: NextRequest) {
  try {
    // Basic Rate Limiting
    const ip = req.ip ?? req.headers.get('x-forwarded-for') ?? 'unknown-ip';
    const now = Date.now();
    const rateData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

    if (now - rateData.lastReset > RATE_LIMIT_WINDOW_MS) {
      rateData.count = 1;
      rateData.lastReset = now;
    } else {
      rateData.count++;
      if (rateData.count > MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json({ success: false, error: "Too Many Requests" }, { status: 429 });
      }
    }
    rateLimitMap.set(ip, rateData);

    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://shyiddpxzllyhiwssooi.supabase.co";
    const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

    if (!SUPABASE_KEY) throw new Error("Missing Supabase Anon Key");

    const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboards?id=eq.1&select=data,updated_at`, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      },
      next: { revalidate: 30 }
    });
    
    if (!res.ok) {
      throw new Error(`Endpoint returned ${res.status}`);
    }

    const rows = await res.json();
    if (!rows || rows.length === 0) {
       return NextResponse.json({ success: false, error: "SERVER DATA TEMPORARILY UNAVAILABLE" }, { status: 503 });
    }

    return NextResponse.json({ 
        success: true, 
        data: rows[0].data, 
        updated_at: rows[0].updated_at 
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: "SERVER DATA TEMPORARILY UNAVAILABLE" }, { status: 503 });
  }
}
