import { IOrder } from '../interfaces/IOrder';
import { IOrderRepository } from '../interfaces/IOrderRepository';
import { INotificationService } from '../interfaces/INotificationService';

// ✅ OrderService залежить від АБСТРАКЦІЙ (інтерфейсів), а не від конкретних класів.
// Конкретні реалізації передаються ззовні через конструктор (Dependency Injection).
// Зміна БД чи каналу нотифікацій — нульові зміни в цьому класі.
export class OrderService {
  constructor(
    private readonly repository: IOrderRepository,
    private readonly notifier: INotificationService,
  ) {}

  createOrder(userId: string, product: string, price: number): IOrder {
    const order: IOrder = {
      id: Date.now().toString(),
      userId,
      product,
      price,
      createdAt: new Date(),
    };
    this.repository.save(order);
    this.notifier.notify(userId, `Order for "${product}" ($${price}) created successfully!`);
    return order;
  }

  getOrder(id: string): IOrder | undefined {
    return this.repository.findById(id);
  }

  getAllOrders(): IOrder[] {
    return this.repository.findAll();
  }
}
