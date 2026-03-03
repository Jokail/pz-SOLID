import { IScannable } from '../interfaces/IScannable';

// ✅ Scanner реалізує лише IScannable — тільки те, що підтримує (ISP)
export class Scanner implements IScannable {
  scan(document: string): string {
    return `[Scanner] Scanned: ${document}`;
  }
}
