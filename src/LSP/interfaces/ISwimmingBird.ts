import { IBird } from './IBird';

// ✅ Розширення контракту — лише для птахів, які вміють плавати
export interface ISwimmingBird extends IBird {
  swim(): string;
}