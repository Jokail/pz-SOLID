import { OrderController } from '../src/DIP/original/OrderController';
import { OrderService } from '../src/DIP/refactored/OrderService';
import { InMemoryOrderRepository } from '../src/DIP/refactored/InMemoryOrderRepository';
import { EmailNotificationService } from '../src/DIP/refactored/EmailNotificationService';
import { SMSNotificationService } from '../src/DIP/refactored/SMSNotificationService';
import { INotificationService } from '../src/DIP/interfaces/INotificationService';
import { IOrderRepository } from '../src/DIP/interfaces/IOrderRepository';
import { IOrder } from '../src/DIP/interfaces/IOrder';

describe('DIP - Dependency Inversion Principle', () => {
  describe('Original — порушує DIP (залежність від конкретних класів)', () => {
    it('OrderController жорстко прив\'язаний до MySQL та Email', () => {
      const controller = new OrderController();
      // Неможливо підмінити БД або нотифікатор без зміни класу
      expect(() => controller.createOrder('user1', 'Laptop', 999)).not.toThrow();
    });
  });

  describe('Refactored — дотримується DIP (залежність від абстракцій)', () => {
    let repository: InMemoryOrderRepository;
    let notifier: EmailNotificationService;
    let orderService: OrderService;

    beforeEach(() => {
      repository = new InMemoryOrderRepository();
      notifier = new EmailNotificationService();
      orderService = new OrderService(repository, notifier);
    });

    it('повинен створити замовлення та повернути його', () => {
      const order = orderService.createOrder('user1', 'Laptop', 999);
      expect(order.userId).toBe('user1');
      expect(order.product).toBe('Laptop');
      expect(order.price).toBe(999);
      expect(order.id).toBeDefined();
      expect(order.createdAt).toBeInstanceOf(Date);
    });

    it('повинен зберегти та знайти замовлення за id', () => {
      const created = orderService.createOrder('user2', 'Phone', 599);
      const found = orderService.getOrder(created.id);
      expect(found).toEqual(created);
    });

    it('повинен повернути всі замовлення', () => {
      orderService.createOrder('user1', 'Laptop', 999);
      orderService.createOrder('user2', 'Phone', 599);
      expect(orderService.getAllOrders()).toHaveLength(2);
    });

    it('повернути undefined для неіснуючого замовлення', () => {
      expect(orderService.getOrder('nonexistent')).toBeUndefined();
    });

    it('можна замінити Email на SMS без зміни OrderService', () => {
      const smsService = new SMSNotificationService();
      const smsOrderService = new OrderService(repository, smsService);
      expect(() => smsOrderService.createOrder('user1', 'Tablet', 399)).not.toThrow();
    });

    it('демонстрація DIP: mock-залежності дозволяють ізольоване тестування', () => {
      const notifications: string[] = [];
      const savedOrders: IOrder[] = [];

      const mockNotifier: INotificationService = {
        notify: (recipient, message) => notifications.push(`${recipient}: ${message}`),
      };
      const mockRepo: IOrderRepository = {
        save: (order) => savedOrders.push(order),
        findById: (id) => savedOrders.find(o => o.id === id),
        findAll: () => [...savedOrders],
      };

      const service = new OrderService(mockRepo, mockNotifier);
      service.createOrder('user1', 'Book', 29);

      expect(savedOrders).toHaveLength(1);
      expect(savedOrders[0].product).toBe('Book');
      expect(notifications).toHaveLength(1);
      expect(notifications[0]).toContain('user1');
      expect(notifications[0]).toContain('Book');
    });
  });
});
