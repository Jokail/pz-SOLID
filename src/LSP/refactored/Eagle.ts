import { IFlyingBird } from '../interfaces/IFlyingBird';

// ✅ Eagle реалізує IFlyingBird — може замінити будь-який IFlyingBird без помилок (LSP)
export class Eagle implements IFlyingBird {
  constructor(public readonly name: string) {}

  fly(): string {
    return `${this.name} soars majestically through the sky!`;
  }

  eat(): string {
    return `${this.name} is eating a fish.`;
  }

  makeSound(): string {
    return `${this.name}: Screech!`;
  }
}