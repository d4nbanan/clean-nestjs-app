import { EntityId } from '../types/entity-id';

export interface IEntity<TId extends EntityId<any, any>> {
  id?: TId;
}
