import { IUser } from '../interfaces/IUser';
import { IUserRepository } from '../interfaces/IUserRepository';
import { IEmailService } from '../interfaces/IEmailService';
import { ILogger } from '../interfaces/ILogger';

// ✅ Відповідальність: оркестрація бізнес-операцій з користувачами.
// Кожна залежність — окремий клас із власною відповідальністю.
export class UserService {
  constructor(
    private readonly repository: IUserRepository,
    private readonly emailService: IEmailService,
    private readonly logger: ILogger,
  ) {}

  addUser(name: string, email: string, role: string): IUser {
    const user: IUser = { id: Date.now(), name, email, role };
    this.repository.add(user);
    this.logger.log(`User added: ${name}`);
    this.emailService.sendWelcome(email, name);
    return user;
  }

  removeUser(id: number): void {
    const user = this.repository.findById(id);
    if (!user) throw new Error(`User ${id} not found`);
    this.repository.remove(id);
    this.logger.log(`User removed: ${user.name}`);
    this.emailService.sendGoodbye(user.email, user.name);
  }

  getUserById(id: number): IUser | undefined {
    return this.repository.findById(id);
  }
}