/**
 * Smart logging utility that conditionally logs based on environment
 * Only logs in development mode or when explicitly enabled
 */

const isDevelopment = import.meta.env.DEV;
const isDebugEnabled = localStorage.getItem('debug') === 'true';

class Logger {
  private shouldLog = isDevelopment || isDebugEnabled;

  log(...args: any[]) {
    if (this.shouldLog) {
      console.log(...args);
    }
  }

  info(...args: any[]) {
    if (this.shouldLog) {
      console.info(...args);
    }
  }

  warn(...args: any[]) {
    // Always show warnings in production
    console.warn(...args);
  }

  error(...args: any[]) {
    // Always show errors in production
    console.error(...args);
  }

  debug(...args: any[]) {
    if (this.shouldLog) {
      console.log('🔍 Debug:', ...args);
    }
  }
}

export const logger = new Logger();