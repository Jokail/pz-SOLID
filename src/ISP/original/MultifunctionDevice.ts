// ❌ ПОРУШЕННЯ ISP: Інтерфейс IAllInOne занадто широкий ("fat interface").
// SimplePrinter змушений реалізовувати методи, які він не підтримує,
// і кидає помилки — це пряме порушення ISP.

export interface IAllInOne {
  print(document: string): void;
  scan(document: string): string;
  fax(document: string, number: string): void;
  photocopy(document: string): string;
  staple(pages: number): void;
}

export class AdvancedPrinter implements IAllInOne {
  print(document: string): void {
    console.log(`[Advanced] Printing: ${document}`);
  }

  scan(document: string): string {
    return `[Advanced] Scanned: ${document}`;
  }

  fax(document: string, number: string): void {
    console.log(`[Advanced] Faxing "${document}" to ${number}`);
  }

  photocopy(document: string): string {
    return `[Advanced] Photocopy of: ${document}`;
  }

  staple(pages: number): void {
    console.log(`[Advanced] Stapling ${pages} pages`);
  }
}

export class SimplePrinter implements IAllInOne {
  print(document: string): void {
    console.log(`[Simple] Printing: ${document}`);
  }

  // ❌ SimplePrinter не може сканувати — але змушений реалізовувати метод
  scan(_document: string): string {
    throw new Error('SimplePrinter does not support scanning!');
  }

  // ❌ Факс не підтримується
  fax(_document: string, _number: string): void {
    throw new Error('SimplePrinter does not support faxing!');
  }

  // ❌ Копіювання не підтримується
  photocopy(_document: string): string {
    throw new Error('SimplePrinter does not support photocopying!');
  }

  // ❌ Скріплення не підтримується
  staple(_pages: number): void {
    throw new Error('SimplePrinter does not support stapling!');
  }
}
