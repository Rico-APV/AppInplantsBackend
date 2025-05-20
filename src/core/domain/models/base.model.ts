export abstract class BaseModel {
  protected _createdAt: Date;
  protected _updatedAt: Date;
  protected _deletedAt: Date | null;
  protected _uuid: string;

  constructor() {
    this._createdAt = new Date();
    this._updatedAt = new Date();
  }

  public toJSON() {
    return {
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      deletedAt: this._deletedAt,
      uuid: this._uuid,
    };
  }

  get createdAt() {
    return this._createdAt;
  }
  get updatedAt() {
    return this._updatedAt;
  }
  get deletedAt() {
    return this._deletedAt;
  }
  get uuid() {
    return this._uuid;
  }
}
