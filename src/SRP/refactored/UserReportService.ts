import { IUserRepository } from '../interfaces/IUserRepository';

// ✅ Відповідальність: лише генерація звітів про користувачів
export class UserReportService {
  constructor(private readonly repository: IUserRepository) {}

  generate(): string {
    const users = this.repository.findAll();
    const lines = users.map(u => `- ${u.name} (${u.email}) [${u.role}]`).join('\n');
    return `=== User Report ===\nTotal: ${users.length}\n${lines}`;
  }
}