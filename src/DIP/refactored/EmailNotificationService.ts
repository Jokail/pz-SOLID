import { INotificationService } from '../interfaces/INotificationService';

// ✅ Конкретна реалізація — Email нотифікації
export class EmailNotificationService implements INotificationService {
  notify(recipient: string, message: string): void {
    console.log(`[Email] To: ${recipient} | ${message}`);
  }
}
