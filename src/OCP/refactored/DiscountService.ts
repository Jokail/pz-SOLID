import { IDiscount } from '../interfaces/IDiscount';

// ✅ DiscountService закритий для модифікацій, але відкритий для розширень.
// Нові типи знижок додаються через нові класи IDiscount — без зміни DiscountService.
export class DiscountService {
  constructor(private readonly discount: IDiscount) {}

  applyDiscount(price: number): number {
    const discountAmount = this.discount.calculate(price);
    return price - discountAmount;
  }

  getDiscountInfo(price: number): string {
    const amount = this.discount.calculate(price);
    const finalPrice = (price - amount).toFixed(2);
    return `${this.discount.getDescription()}: -${amount.toFixed(2)} (final price: ${finalPrice})`;
  }
}