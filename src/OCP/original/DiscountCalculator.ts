// ❌ ПОРУШЕННЯ OCP: Щоразу, коли потрібно додати новий тип знижки,
// доводиться редагувати існуючий клас DiscountCalculator.
// Клас НЕ закритий для модифікацій — порушення OCP.

export class DiscountCalculator {
  calculateDiscount(price: number, customerType: string): number {
    if (customerType === 'regular') {
      return price * 0.05;
    } else if (customerType === 'premium') {
      return price * 0.10;
    } else if (customerType === 'vip') {
      return price * 0.20;
    } else if (customerType === 'employee') {
      return price * 0.30;
    }
    // ❌ Щоб додати 'partner' — треба змінювати цей клас. Порушення OCP!
    return 0;
  }

  getDiscountDescription(customerType: string): string {
    switch (customerType) {
      case 'regular':  return 'Regular discount (5%)';
      case 'premium':  return 'Premium discount (10%)';
      case 'vip':      return 'VIP discount (20%)';
      case 'employee': return 'Employee discount (30%)';
      default:         return 'No discount';
    }
  }
}