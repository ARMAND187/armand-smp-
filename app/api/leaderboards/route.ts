import { NextResponse } from 'next/server';

export const revalidate = 30; // Cache for 30 seconds

export async function GET() {
  try {
    const SUPABASE_URL = "https://shyiddpxzllyhiwssooi.supabase.co";
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNoeWlkZHB4emxseWhpd3Nzb29pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzMzUwNzgsImV4cCI6MjEwNDkxMTA3OH0.NZi1JjFtk6-m3VQejIAlRmp34jhSWjx8PxoZ8QAdScg";

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
