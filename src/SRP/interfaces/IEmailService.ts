export interface IEmailService {
  sendWelcome(email: string, name: string): void;
  sendGoodbye(email: string, name: string): void;
  sendBulk(emails: string[], subject: string, body: string): void;
}