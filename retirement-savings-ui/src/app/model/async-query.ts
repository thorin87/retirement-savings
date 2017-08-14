export class AsyncQuery<T> {
  private _result: T;

  public isFetching = true;
  set result(value: T) {
    this._result = value;
    this.isFetching = false;
  }
  get result(): T {
    return this._result;
  }
}
