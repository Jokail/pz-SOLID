// ❌ ПОРУШЕННЯ DIP: OrderController напряму залежить від конкретних реалізацій
// MySQLDatabase та EmailNotifier. Модуль вищого рівня (OrderController) залежить
// від модулів нижчого рівня (MySQL, Email) — порушення DIP.
// Для зміни БД чи сервісу нотифікацій треба редагувати OrderController.

class MySQLDatabase {
  save(table: string, data: object): void {
    console.log(`[MySQL] INSERT INTO ${table}: ${JSON.stringify(data)}`);
  }

  find(table: string, id: string): object | null {
    console.log(`[MySQL] SELECT FROM ${table} WHERE id=${id}`);
    return { id, table };
  }
}

class EmailNotifier {
  notify(email: string, message: string): void {
    console.log(`[Email] To: ${email} | Message: ${message}`);
  }
}

// ❌ Модуль вищого рівня залежить від конкретних класів нижчого рівня
export class OrderController {
  private db = new MySQLDatabase();       // ❌ Пряма залежність від конкретного класу
  private notifier = new EmailNotifier(); // ❌ Пряма залежність від конкретного класу

  createOrder(userId: string, product: string, price: number): void {
    const order = {
      id: Date.now().toString(),
      userId,
      product,
      price,
      createdAt: new Date(),
    };
    this.db.save('orders', order);
    this.notifier.notify(userId, `Your order for ${product} ($${price}) has been created!`);
  }

  getOrder(orderId: string): object | null {
    return this.db.find('orders', orderId);
  }
}
