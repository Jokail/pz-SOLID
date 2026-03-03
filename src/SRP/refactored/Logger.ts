import { ILogger } from '../interfaces/ILogger';

// ✅ Відповідальність: лише логування подій
export class Logger implements ILogger {
  log(message: string): void {
    console.log(`[LOG ${new Date().toISOString()}] ${message}`);
  }

  error(message: string): void {
    console.error(`[ERROR ${new Date().toISOString()}] ${message}`);
  }
}