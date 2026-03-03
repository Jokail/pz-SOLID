import { Eagle as OriginalEagle, Penguin as OriginalPenguin, makeBirdFly as originalMakeBirdFly } from '../src/LSP/original/Bird';
import { Eagle } from '../src/LSP/refactored/Eagle';
import { Sparrow } from '../src/LSP/refactored/Sparrow';
import { Penguin } from '../src/LSP/refactored/Penguin';
import { makeBirdFly, makeBirdSwim } from '../src/LSP/refactored/BirdUtils';
import { IFlyingBird } from '../src/LSP/interfaces/IFlyingBird';
import { ISwimmingBird } from '../src/LSP/interfaces/ISwimmingBird';

describe('LSP - Liskov Substitution Principle', () => {
  describe('Original — порушує LSP (підклас ламає контракт базового)', () => {
    it('Eagle може літати — працює коректно', () => {
      const eagle = new OriginalEagle('Golden Eagle');
      expect(() => originalMakeBirdFly(eagle)).not.toThrow();
    });

    it('Penguin кидає помилку при виклику fly() — пряме порушення LSP', () => {
      const penguin = new OriginalPenguin('Emperor');
      expect(() => originalMakeBirdFly(penguin)).toThrow('cannot fly');
    });
  });

  describe('Refactored — дотримується LSP (підкласи замінюють базовий без помилок)', () => {
    it('Eagle реалізує IFlyingBird та коректно літає', () => {
      const eagle = new Eagle('Golden Eagle');
      expect(makeBirdFly(eagle)).toContain('soars');
    });

    it('Sparrow реалізує IFlyingBird та коректно літає', () => {
      const sparrow = new Sparrow('House Sparrow');
      expect(makeBirdFly(sparrow)).toContain('flutters');
    });

    it('Penguin реалізує ISwimmingBird та коректно плаває', () => {
      const penguin = new Penguin('Emperor');
      expect(makeBirdSwim(penguin)).toContain('swimming');
    });

    it('всі IFlyingBird можна передати в makeBirdFly без помилок', () => {
      const flyingBirds: IFlyingBird[] = [
        new Eagle('Eagle'),
        new Sparrow('Sparrow'),
      ];
      flyingBirds.forEach(bird => {
        expect(() => makeBirdFly(bird)).not.toThrow();
        expect(makeBirdFly(bird)).toBeTruthy();
      });
    });

    it('всі ISwimmingBird можна передати в makeBirdSwim без помилок', () => {
      const swimmingBirds: ISwimmingBird[] = [new Penguin('Penguin')];
      swimmingBirds.forEach(bird => {
        expect(() => makeBirdSwim(bird)).not.toThrow();
      });
    });

    it('всі птахи реалізують eat() та makeSound()', () => {
      const birds = [
        new Eagle('Eagle'),
        new Sparrow('Sparrow'),
        new Penguin('Penguin'),
      ];
      birds.forEach(bird => {
        expect(bird.eat()).toBeTruthy();
        expect(bird.makeSound()).toBeTruthy();
      });
    });
  });
});
