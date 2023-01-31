export class LocalStorageService {
  static getItem<V>(key: string): V | null {
    return localStorage.getItem(key) as V | null;
  }

  static setItem<V extends string>(key: string, value: V): void {
    localStorage.setItem(key, value);
  }

  static removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
