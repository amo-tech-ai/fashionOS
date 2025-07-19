import * as Sentry from '@sentry/nextjs';
import { CaptureConsole } from '@sentry/integrations';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV,
    
    // Performance Monitoring
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    
    // Session Replay
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    
    // Integrations
    integrations: [
      new CaptureConsole({
        levels: ['error', 'warn']
      }),
    ],
    
    // Filtering
    beforeSend(event, hint) {
      // Filter out non-critical errors
      if (event.level === 'log') return null;
      
      // Add user context
      if (event.user) {
        event.user = {
          ...event.user,
          role: event.user.role || 'guest'
        };
      }
      
      return event;
    },
    
    // Ignore common errors
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'Non-Error promise rejection captured',
      /Failed to fetch/i,
    ],
  });
}

export { Sentry };