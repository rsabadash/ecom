export class SessionStorageService {
  static getItem<V>(key: string): V | null {
    return sessionStorage.getItem(key) as V | null;
  }

  static setItem<V extends string>(key: string, value: V): void {
    sessionStorage.setItem(key, value);
  }

  static removeItem(key: string): boolean {
    const value = sessionStorage.getItem(key);

    if (value) {
      sessionStorage.removeItem(key);

      return true;
    } else {
      return false;
    }
  }
}
