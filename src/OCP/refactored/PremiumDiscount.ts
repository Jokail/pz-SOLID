import { IDiscount } from '../interfaces/IDiscount';

export class PremiumDiscount implements IDiscount {
  calculate(price: number): number {
    return price * 0.10;
  }

  getDescription(): string {
    return 'Premium customer discount (10%)';
  }
}