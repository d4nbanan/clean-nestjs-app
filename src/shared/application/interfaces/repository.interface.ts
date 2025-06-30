export interface IRepository<E> {
  create(entity: E): Promise<E>;
}
