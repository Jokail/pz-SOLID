import { IFlyingBird } from '../interfaces/IFlyingBird';
import { ISwimmingBird } from '../interfaces/ISwimmingBird';

// ✅ Кожна функція приймає правильний тип — LSP гарантовано дотримано.
// Будь-який IFlyingBird можна передати в makeBirdFly без помилок.
export function makeBirdFly(bird: IFlyingBird): string {
  return bird.fly();
}

export function makeBirdSwim(bird: ISwimmingBird): string {
  return bird.swim();
}