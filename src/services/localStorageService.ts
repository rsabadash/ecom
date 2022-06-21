export class LocalStorageService {
    static getItem<V>(key: string): V | null {
        return localStorage.getItem(key) as V | null;
    };

    static setItem<V extends string>(key: string, value: V): void {
        return localStorage.setItem(key, value);
    };

    static removeItem(key: string): void {
        return localStorage.retItem(key);
    };
}