// ✅ Абстракція — базовий контракт для всіх типів знижок.
// Нові типи знижок додаються через нові класи, а не через зміну існуючих.
export interface IDiscount {
  calculate(price: number): number;
  getDescription(): string;
}