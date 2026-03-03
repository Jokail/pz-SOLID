import { IEmailService } from '../interfaces/IEmailService';

// ✅ Відповідальність: лише надсилання email-повідомлень
export class EmailService implements IEmailService {
  sendWelcome(email: string, name: string): void {
    console.log(`[EMAIL] Welcome to ${email}: Hello, ${name}! Welcome aboard.`);
  }

  sendGoodbye(email: string, name: string): void {
    console.log(`[EMAIL] Goodbye to ${email}: Farewell, ${name}!`);
  }

  sendBulk(emails: string[], subject: string, body: string): void {
    emails.forEach(email => {
      console.log(`[EMAIL] To: ${email} | Subject: ${subject} | ${body}`);
    });
  }
}