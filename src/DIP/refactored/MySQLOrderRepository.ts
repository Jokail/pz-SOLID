import { IOrder } from '../interfaces/IOrder';
import { IOrderRepository } from '../interfaces/IOrderRepository';

// ✅ MySQL реалізація — для production середовища
// Легко замінити на PostgreSQL без зміни OrderService
export class MySQLOrderRepository implements IOrderRepository {
  save(order: IOrder): void {
    console.log(`[MySQL] INSERT INTO orders: ${JSON.stringify(order)}`);
  }

  findById(id: string): IOrder | undefined {
    console.log(`[MySQL] SELECT * FROM orders WHERE id='${id}'`);
    return undefined; // Симуляція запиту до БД
  }

  findAll(): IOrder[] {
    console.log('[MySQL] SELECT * FROM orders');
    return []; // Симуляція запиту до БД
  }
}
