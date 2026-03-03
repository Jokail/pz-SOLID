import { ISwimmingBird } from '../interfaces/ISwimmingBird';

// ✅ Penguin реалізує ISwimmingBird, а не IFlyingBird — жодних помилок, жодних порушень (LSP)
export class Penguin implements ISwimmingBird {
  constructor(public readonly name: string) {}

  swim(): string {
    return `${this.name} is swimming gracefully underwater!`;
  }

  eat(): string {
    return `${this.name} is eating squid.`;
  }

  makeSound(): string {
    return `${this.name}: Squawk!`;
  }
}