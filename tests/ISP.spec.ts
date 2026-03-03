import { SimplePrinter as OriginalSimplePrinter } from '../src/ISP/original/MultifunctionDevice';
import { SimplePrinter } from '../src/ISP/refactored/SimplePrinter';
import { Scanner } from '../src/ISP/refactored/Scanner';
import { AllInOnePrinter } from '../src/ISP/refactored/AllInOnePrinter';
import { IPrintable } from '../src/ISP/interfaces/IPrintable';
import { IScannable } from '../src/ISP/interfaces/IScannable';

describe('ISP - Interface Segregation Principle', () => {
  describe('Original — порушує ISP (fat interface змушує реалізовувати непотрібні методи)', () => {
    it('OriginalSimplePrinter може друкувати', () => {
      const printer = new OriginalSimplePrinter();
      expect(() => printer.print('Test doc')).not.toThrow();
    });

    it('OriginalSimplePrinter кидає помилку при скануванні — порушення ISP', () => {
      const printer = new OriginalSimplePrinter();
      expect(() => printer.scan('Test doc')).toThrow('does not support scanning');
    });

    it('OriginalSimplePrinter кидає помилку при факсуванні — порушення ISP', () => {
      const printer = new OriginalSimplePrinter();
      expect(() => printer.fax('Test doc', '555-1234')).toThrow('does not support faxing');
    });

    it('OriginalSimplePrinter кидає помилку при копіюванні — порушення ISP', () => {
      const printer = new OriginalSimplePrinter();
      expect(() => printer.photocopy('Test doc')).toThrow('does not support photocopying');
    });
  });

  describe('Refactored — дотримується ISP (малі та специфічні інтерфейси)', () => {
    it('SimplePrinter реалізує лише IPrintable та працює коректно', () => {
      const printer = new SimplePrinter();
      expect(() => printer.print('Hello World')).not.toThrow();
      expect('scan' in printer).toBe(false);
      expect('fax' in printer).toBe(false);
    });

    it('Scanner реалізує лише IScannable та повертає результат', () => {
      const scanner = new Scanner();
      const result = scanner.scan('Document.pdf');
      expect(result).toContain('Scanned');
      expect('print' in scanner).toBe(false);
    });

    it('AllInOnePrinter реалізує всі інтерфейси без помилок', () => {
      const device = new AllInOnePrinter();
      expect(() => device.print('Doc')).not.toThrow();
      expect(device.scan('Doc')).toContain('Scanned');
      expect(() => device.fax('Doc', '555-1234')).not.toThrow();
      expect(device.photocopy('Doc')).toContain('Photocopy');
      expect(() => device.staple(5)).not.toThrow();
    });

    it('всі IPrintable пристрої взаємозамінні', () => {
      const printers: IPrintable[] = [new SimplePrinter(), new AllInOnePrinter()];
      printers.forEach(p => {
        expect(() => p.print('Test document')).not.toThrow();
      });
    });

    it('всі IScannable пристрої взаємозамінні', () => {
      const scanners: IScannable[] = [new Scanner(), new AllInOnePrinter()];
      scanners.forEach(s => {
        const result = s.scan('Test document');
        expect(result).toContain('Scanned');
      });
    });
  });
});
