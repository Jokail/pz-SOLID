import { DiscountCalculator } from '../src/OCP/original/DiscountCalculator';
import { DiscountService } from '../src/OCP/refactored/DiscountService';
import { RegularDiscount } from '../src/OCP/refactored/RegularDiscount';
import { PremiumDiscount } from '../src/OCP/refactored/PremiumDiscount';
import { VIPDiscount } from '../src/OCP/refactored/VIPDiscount';
import { EmployeeDiscount } from '../src/OCP/refactored/EmployeeDiscount';
import { NoDiscount } from '../src/OCP/refactored/NoDiscount';
import { IDiscount } from '../src/OCP/interfaces/IDiscount';

describe('OCP - Open/Closed Principle', () => {
  const price = 100;

  describe('Original — порушує OCP (зміна через редагування класу)', () => {
    const calculator = new DiscountCalculator();

    it('повинен порахувати знижку для regular (5%)', () => {
      expect(calculator.calculateDiscount(price, 'regular')).toBe(5);
    });

    it('повинен порахувати знижку для premium (10%)', () => {
      expect(calculator.calculateDiscount(price, 'premium')).toBe(10);
    });

    it('повинен повернути 0 для невідомого типу', () => {
      expect(calculator.calculateDiscount(price, 'unknown')).toBe(0);
    });
  });

  describe('Refactored — дотримується OCP (розширення через нові класи)', () => {
    it('RegularDiscount: знижка 5%, кінцева ціна 95', () => {
      const service = new DiscountService(new RegularDiscount());
      expect(service.applyDiscount(price)).toBe(95);
    });

    it('PremiumDiscount: знижка 10%, кінцева ціна 90', () => {
      const service = new DiscountService(new PremiumDiscount());
      expect(service.applyDiscount(price)).toBe(90);
    });

    it('VIPDiscount: знижка 20%, кінцева ціна 80', () => {
      const service = new DiscountService(new VIPDiscount());
      expect(service.applyDiscount(price)).toBe(80);
    });

    it('EmployeeDiscount: знижка 30%, кінцева ціна 70', () => {
      const service = new DiscountService(new EmployeeDiscount());
      expect(service.applyDiscount(price)).toBe(70);
    });

    it('NoDiscount: знижка 0%, кінцева ціна 100', () => {
      const service = new DiscountService(new NoDiscount());
      expect(service.applyDiscount(price)).toBe(100);
    });

    it('getDiscountInfo повинен містити опис знижки', () => {
      const service = new DiscountService(new VIPDiscount());
      const info = service.getDiscountInfo(price);
      expect(info).toContain('VIP');
      expect(info).toContain('20');
    });

    it('нова знижка додається без зміни DiscountService (демонстрація OCP)', () => {
      // Додаємо "партнерську" знижку 15% — новий клас, без зміни DiscountService
      class PartnerDiscount implements IDiscount {
        calculate(p: number): number { return p * 0.15; }
        getDescription(): string { return 'Partner discount (15%)'; }
      }
      const service = new DiscountService(new PartnerDiscount());
      expect(service.applyDiscount(price)).toBe(85);
    });
  });
});
