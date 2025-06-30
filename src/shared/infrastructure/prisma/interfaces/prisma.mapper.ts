export interface PrismaMapper<Entity, Model, InsertType> {
  toEntity(raw: Model): Entity;
  toModel(entity: Entity): InsertType;
}
