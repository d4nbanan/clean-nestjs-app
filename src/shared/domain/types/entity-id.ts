export type Brand<K, T> = K & { __brand: T };

export class EntityId<TBrand extends string, TValue extends string | number> {
  constructor(public readonly value: Brand<TValue, TBrand>) {}

  get(): TValue {
    return this.value as TValue;
  }

  toString(): string {
    return String(this.value);
  }
}
