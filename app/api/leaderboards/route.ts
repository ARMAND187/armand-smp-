import { NextResponse } from 'next/server';

export const revalidate = 30; // Cache for 30 seconds

export async function GET() {
  try {
    const res = await fetch('http://rawchysmp.com:8080/api/leaderboards', {
      headers: {
        'Authorization': 'Bearer rawchy_secure_api_key_2026'
      },
      next: { revalidate: 30 }
    });
    
    if (res.status === 503) {
      return NextResponse.json({ success: false, error: "SERVER DATA TEMPORARILY UNAVAILABLE" }, { status: 503 });
    }

    if (!res.ok) {
      throw new Error(`Endpoint returned ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ success: false, error: "SERVER DATA TEMPORARILY UNAVAILABLE" }, { status: 503 });
  }
}
