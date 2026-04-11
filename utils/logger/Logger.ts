import { v4 as uuidv4 } from 'uuid';

/** Structured log entry */
interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'STEP' | 'WARN' | 'ERROR' | 'DEBUG';
  correlationId: string;
  action: string;
  input?: string;
  result?: string;
  message?: string;
}

/**
 * Enterprise-grade structured logger.
 * Every instance carries a correlation ID for traceability across a single test run.
 */
export class Logger {
  private readonly correlationId: string;
  private readonly logs: LogEntry[] = [];

  constructor(correlationId?: string) {
    this.correlationId = correlationId ?? uuidv4();
  }

  getCorrelationId(): string {
    return this.correlationId;
  }

  /** Collect all log entries for later attachment */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /** Get formatted log output as string */
  getFormattedLogs(): string {
    return this.logs
      .map(
        (e) =>
          `[${e.timestamp}] [${e.level}] [${e.correlationId}] ${e.action}${e.input ? ` | input: ${e.input}` : ''}${e.result ? ` | result: ${e.result}` : ''}${e.message ? ` | ${e.message}` : ''}`,
      )
      .join('\n');
  }

  info(action: string, input?: string, result?: string): void {
    this.log('INFO', action, input, result);
  }

  step(action: string, input?: string, result?: string): void {
    this.log('STEP', action, input, result);
  }

  warn(action: string, message?: string): void {
    this.log('WARN', action, undefined, undefined, message);
  }

  error(action: string, message?: string): void {
    this.log('ERROR', action, undefined, undefined, message);
  }

  debug(action: string, input?: string, result?: string): void {
    this.log('DEBUG', action, input, result);
  }

  private log(
    level: LogEntry['level'],
    action: string,
    input?: string,
    result?: string,
    message?: string,
  ): void {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      correlationId: this.correlationId,
      action,
      input,
      result,
      message,
    };
    this.logs.push(entry);

    const line = `[${entry.timestamp}] [${entry.level}] [${entry.correlationId}] ${entry.action}${input ? ` | input: ${input}` : ''}${result ? ` | result: ${result}` : ''}${message ? ` | ${message}` : ''}`;
    if (level === 'ERROR') {
      console.error(line);
    } else if (level === 'WARN') {
      console.warn(line);
    } else {
      console.log(line);
    }
  }
}
