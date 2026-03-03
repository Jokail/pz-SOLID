import { IPrintable } from '../interfaces/IPrintable';
import { IScannable } from '../interfaces/IScannable';
import { IFaxable } from '../interfaces/IFaxable';
import { IPhotocopiable } from '../interfaces/IPhotocopiable';
import { IStapleable } from '../interfaces/IStapleable';

// ✅ AllInOnePrinter реалізує всі інтерфейси, бо справді підтримує всі функції.
// Кожен інтерфейс — малий і специфічний (ISP).
export class AllInOnePrinter implements IPrintable, IScannable, IFaxable, IPhotocopiable, IStapleable {
  print(document: string): void {
    console.log(`[AllInOne] Printing: ${document}`);
  }

  scan(document: string): string {
    return `[AllInOne] Scanned: ${document}`;
  }

  fax(document: string, recipientNumber: string): void {
    console.log(`[AllInOne] Faxing "${document}" to ${recipientNumber}`);
  }

  photocopy(document: string): string {
    return `[AllInOne] Photocopy of: ${document}`;
  }

  staple(pages: number): void {
    console.log(`[AllInOne] Stapling ${pages} pages`);
  }
}
