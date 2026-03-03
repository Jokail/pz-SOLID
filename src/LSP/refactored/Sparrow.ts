import { IFlyingBird } from '../interfaces/IFlyingBird';

// ✅ Sparrow реалізує IFlyingBird — горобці справді літають (LSP дотримано)
export class Sparrow implements IFlyingBird {
  constructor(public readonly name: string) {}

  fly(): string {
    return `${this.name} flutters quickly through the trees!`;
  }

  eat(): string {
    return `${this.name} is eating seeds.`;
  }

  makeSound(): string {
    return `${this.name}: Tweet tweet!`;
  }
}