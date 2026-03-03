import { IDiscount } from '../interfaces/IDiscount';

export class RegularDiscount implements IDiscount {
  calculate(price: number): number {
    return price * 0.05;
  }

  getDescription(): string {
    return 'Regular customer discount (5%)';
  }
}