// ✅ Базовий контракт для всіх птахів — лише те, що вміє кожен птах
export interface IBird {
  name: string;
  eat(): string;
  makeSound(): string;
}