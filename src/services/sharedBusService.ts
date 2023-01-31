type SharedBusMethod<M> = M[keyof M];

export class SharedBusService<M extends Record<keyof M, SharedBusMethod<M>>> {
  private readonly _sharedBusMethods: Record<keyof M, SharedBusMethod<M>>;
  constructor() {
    this._sharedBusMethods = {} as Record<keyof M, SharedBusMethod<M>>;
  }

  get methods() {
    return this._sharedBusMethods;
  }

  public addMethod = (key: keyof M, method: SharedBusMethod<M>) => {
    if (!this._sharedBusMethods[key]) {
      this._sharedBusMethods[key] = method;
    }
  };
}
