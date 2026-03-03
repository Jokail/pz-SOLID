import { IDiscount } from '../interfaces/IDiscount';

export class VIPDiscount implements IDiscount {
  calculate(price: number): number {
    return price * 0.20;
  }

  getDescription(): string {
    return 'VIP customer discount (20%)';
  }
}