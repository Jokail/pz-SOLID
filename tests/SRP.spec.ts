import { UserRepository } from '../src/SRP/refactored/UserRepository';
import { EmailService } from '../src/SRP/refactored/EmailService';
import { Logger } from '../src/SRP/refactored/Logger';
import { UserService } from '../src/SRP/refactored/UserService';
import { UserReportService } from '../src/SRP/refactored/UserReportService';

describe('SRP - Single Responsibility Principle', () => {
  let repository: UserRepository;
  let emailService: EmailService;
  let logger: Logger;
  let userService: UserService;

  beforeEach(() => {
    repository = new UserRepository();
    emailService = new EmailService();
    logger = new Logger();
    userService = new UserService(repository, emailService, logger);
  });

  describe('UserRepository — відповідальність: зберігання даних', () => {
    it('повинен додати та знайти користувача', () => {
      const user = { id: 1, name: 'Alice', email: 'alice@example.com', role: 'admin' };
      repository.add(user);
      expect(repository.findById(1)).toEqual(user);
    });

    it('повинен видалити користувача', () => {
      repository.add({ id: 2, name: 'Bob', email: 'bob@example.com', role: 'user' });
      repository.remove(2);
      expect(repository.findById(2)).toBeUndefined();
    });

    it('повинен кинути помилку при видаленні неіснуючого користувача', () => {
      expect(() => repository.remove(999)).toThrow('User 999 not found');
    });

    it('повинен повернути всіх користувачів', () => {
      repository.add({ id: 1, name: 'Alice', email: 'a@test.com', role: 'admin' });
      repository.add({ id: 2, name: 'Bob', email: 'b@test.com', role: 'user' });
      expect(repository.findAll()).toHaveLength(2);
    });

    it('findAll повинен повертати копію масиву', () => {
      repository.add({ id: 1, name: 'Alice', email: 'a@test.com', role: 'admin' });
      const all = repository.findAll();
      all.push({ id: 99, name: 'Hacker', email: 'x@x.com', role: 'user' });
      expect(repository.findAll()).toHaveLength(1);
    });
  });

  describe('UserService — відповідальність: оркестрація бізнес-логіки', () => {
    it('повинен додати користувача та повернути його', () => {
      const user = userService.addUser('Alice', 'alice@example.com', 'admin');
      expect(user.name).toBe('Alice');
      expect(user.email).toBe('alice@example.com');
      expect(user.role).toBe('admin');
      expect(user.id).toBeDefined();
    });

    it('повинен знайти користувача за id після додавання', () => {
      const added = userService.addUser('Bob', 'bob@example.com', 'user');
      expect(userService.getUserById(added.id)).toEqual(added);
    });

    it('повинен видалити користувача', () => {
      const user = userService.addUser('Carol', 'carol@example.com', 'user');
      userService.removeUser(user.id);
      expect(userService.getUserById(user.id)).toBeUndefined();
    });

    it('повинен кинути помилку при видаленні неіснуючого користувача', () => {
      expect(() => userService.removeUser(999)).toThrow('User 999 not found');
    });
  });

  describe('UserReportService — відповідальність: генерація звітів', () => {
    it('повинен згенерувати звіт з кількістю користувачів', () => {
      userService.addUser('Alice', 'alice@example.com', 'admin');
      userService.addUser('Bob', 'bob@example.com', 'user');
      const reportService = new UserReportService(repository);
      const report = reportService.generate();
      expect(report).toContain('Total: 2');
      expect(report).toContain('Alice');
      expect(report).toContain('Bob');
    });

    it('повинен згенерувати порожній звіт якщо нема користувачів', () => {
      const reportService = new UserReportService(repository);
      const report = reportService.generate();
      expect(report).toContain('Total: 0');
    });
  });
});
