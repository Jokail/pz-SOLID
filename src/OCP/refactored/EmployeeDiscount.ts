import { IDiscount } from '../interfaces/IDiscount';

export class EmployeeDiscount implements IDiscount {
  calculate(price: number): number {
    return price * 0.30;
  }

  getDescription(): string {
    return 'Employee discount (30%)';
  }
}