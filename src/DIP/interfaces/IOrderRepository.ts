import { IOrder } from './IOrder';

export interface IOrderRepository {
  save(order: IOrder): void;
  findById(id: string): IOrder | undefined;
  findAll(): IOrder[];
}
