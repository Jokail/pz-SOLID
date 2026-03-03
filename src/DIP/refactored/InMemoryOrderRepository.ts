import { IOrder } from '../interfaces/IOrder';
import { IOrderRepository } from '../interfaces/IOrderRepository';

// ✅ In-memory реалізація — ідеальна для тестів і прототипування
export class InMemoryOrderRepository implements IOrderRepository {
  private orders: IOrder[] = [];

  save(order: IOrder): void {
    this.orders.push(order);
  }

  findById(id: string): IOrder | undefined {
    return this.orders.find(o => o.id === id);
  }

  findAll(): IOrder[] {
    return [...this.orders];
  }
}
