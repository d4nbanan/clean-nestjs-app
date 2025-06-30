import { IsInt, Max, Min, ValidationOptions } from 'class-validator';
import { applyDecorators } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import { EntityId } from '../../domain/types/entity-id';

type EntityIdConstructor = new (value: any) => EntityId<any, any>;
const IdConstructor = Number;

export function IsIntDbId(
  entityIdClass: EntityIdConstructor,
  validationOptions?: ValidationOptions,
) {
  return applyDecorators(
    IsInt({ each: validationOptions?.each }),
    Min(1, { each: validationOptions?.each }),
    Max(2147483647, { each: validationOptions?.each }),
    Type(() => IdConstructor),
    Transform(({ value }) => {
      return new entityIdClass(value);
    }),
  );
}
