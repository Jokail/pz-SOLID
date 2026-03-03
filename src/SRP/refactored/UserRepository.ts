import { IUser } from '../interfaces/IUser';
import { IUserRepository } from '../interfaces/IUserRepository';

// ✅ Відповідальність: лише зберігання та пошук користувачів (CRUD)
export class UserRepository implements IUserRepository {
  private users: IUser[] = [];

  add(user: IUser): void {
    this.users.push(user);
  }

  remove(id: number): void {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error(`User ${id} not found`);
    this.users.splice(index, 1);
  }

  findById(id: number): IUser | undefined {
    return this.users.find(u => u.id === id);
  }

  findAll(): IUser[] {
    return [...this.users];
  }
}