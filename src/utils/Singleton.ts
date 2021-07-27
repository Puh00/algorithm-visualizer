export function Singleton<T>() {
  class Singleton {
    private static instance: any;

    protected constructor() {}

    static getInstance(): T {
      return this.instance ? this.instance : (this.instance = new this());
    }
  }

  return Singleton;
}
