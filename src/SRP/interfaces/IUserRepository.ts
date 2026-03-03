import { IUser } from './IUser';

export interface IUserRepository {
  add(user: IUser): void;
  remove(id: number): void;
  findById(id: number): IUser | undefined;
  findAll(): IUser[];
}