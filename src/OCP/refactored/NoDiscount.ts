import { IDiscount } from '../interfaces/IDiscount';

export class NoDiscount implements IDiscount {
  calculate(_price: number): number {
    return 0;
  }

  getDescription(): string {
    return 'No discount (0%)';
  }
}