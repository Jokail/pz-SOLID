// ❌ ПОРУШЕННЯ SRP: Клас UserManager відповідає за декілька речей одночасно:
//   1. Управління даними користувачів (CRUD)
//   2. Надсилання email-повідомлень
//   3. Генерація звітів
//   4. Логування подій
// Будь-яка зміна в логіці email вимагає редагування цього класу — порушення SRP.

export class UserManager {
  private users: { id: number; name: string; email: string; role: string }[] = [];

  addUser(name: string, email: string, role: string): void {
    const user = { id: Date.now(), name, email, role };
    this.users.push(user);

    // Логування — це не відповідальність управління користувачами
    console.log(`[LOG] ${new Date().toISOString()} - User added: ${name}`);

    // Надсилання email — це не відповідальність управління користувачами
    console.log(`[EMAIL] Sending welcome email to ${email}: Hello, ${name}!`);

    // Генерація звіту — це не відповідальність управління користувачами
    console.log(`[REPORT] Total users after adding: ${this.users.length}`);
  }

  removeUser(id: number): void {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) throw new Error(`User ${id} not found`);

    const user = this.users[index];
    this.users.splice(index, 1);

    // Знову логування і email — не відповідальність цього класу
    console.log(`[LOG] User removed: ${user.name}`);
    console.log(`[EMAIL] Sending goodbye email to ${user.email}`);
  }

  getUserById(id: number) {
    return this.users.find(u => u.id === id);
  }

  // Генерація звіту — окрема відповідальність, не належить цьому класу
  generateUserReport(): string {
    return (
      `=== User Report ===\nTotal: ${this.users.length}\n` +
      this.users.map(u => `- ${u.name} (${u.email}) [${u.role}]`).join('\n')
    );
  }

  // Надсилання email — окрема відповідальність, не належить цьому класу
  sendBulkEmail(subject: string, body: string): void {
    this.users.forEach(u => {
      console.log(`[EMAIL] To: ${u.email} | Subject: ${subject} | Body: ${body}`);
    });
  }
}