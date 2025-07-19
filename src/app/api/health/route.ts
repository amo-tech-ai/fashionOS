import { NextResponse } from 'next/server';
import { supabaseClient } from '@/utility/supabaseClient';

export async function GET() {
  let dbStatus = 'unknown';
  let dbLatency = 0;
  
  try {
    // Test database connectivity
    const startTime = Date.now();
    const { data, error } = await supabaseClient
      .from('events')
      .select('count')
      .limit(1)
      .single();
    
    dbLatency = Date.now() - startTime;
    dbStatus = error ? 'error' : 'healthy';
  } catch (err) {
    dbStatus = 'error';
  }

  const health = {
    status: dbStatus === 'healthy' ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    version: process.env.npm_package_version || '0.1.0',
    services: {
      api: 'healthy',
      database: {
        status: dbStatus,
        latency: `${dbLatency}ms`
      }
    }
  };

  return NextResponse.json(
    health,
    { status: health.status === 'ok' ? 200 : 503 }
  );
}