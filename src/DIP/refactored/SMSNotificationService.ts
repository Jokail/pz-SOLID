import { INotificationService } from '../interfaces/INotificationService';

// ✅ Конкретна реалізація — SMS нотифікації.
// Додається без жодних змін у OrderService — це і є перевага DIP.
export class SMSNotificationService implements INotificationService {
  notify(recipient: string, message: string): void {
    console.log(`[SMS] To: ${recipient} | ${message}`);
  }
}
