import { IPrintable } from '../interfaces/IPrintable';

// ✅ SimplePrinter реалізує лише IPrintable — тільки те, що підтримує (ISP)
export class SimplePrinter implements IPrintable {
  print(document: string): void {
    console.log(`[SimplePrinter] Printing: ${document}`);
  }
}
