import { IBird } from './IBird';

// ✅ Розширення контракту — лише для птахів, які вміють літати
export interface IFlyingBird extends IBird {
  fly(): string;
}