// ❌ ПОРУШЕННЯ LSP: Penguin розширює Bird, але не може виконати метод fly().
// Підклас порушує контракт базового класу — функція makeBirdFly() ламається
// при передачі Penguin замість Bird. Це пряме порушення принципу Ліскова.

export class Bird {
  constructor(public readonly name: string) {}

  fly(): string {
    return `${this.name} is flying!`;
  }

  eat(): string {
    return `${this.name} is eating.`;
  }
}

export class Eagle extends Bird {
  fly(): string {
    return `${this.name} soars through the sky!`;
  }
}

export class Penguin extends Bird {
  // ❌ Порушення LSP: Penguin не може літати, але змушений реалізовувати fly()
  fly(): string {
    throw new Error(`${this.name} cannot fly! Penguins are flightless birds.`);
  }

  swim(): string {
    return `${this.name} is swimming!`;
  }
}

// Ця функція перестає коректно працювати з Penguin — порушення LSP
export function makeBirdFly(bird: Bird): string {
  return bird.fly(); // Викине помилку для Penguin!
}