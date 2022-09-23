export class BetterStorage {
    key: string;
    readonly storage: Storage; // 只读属性，外部不能修改
    constructor(key?: string) {
        // 设置全局的key
        this.key = key ? key : "";
        this.storage = window.localStorage;
    }
    set(data: any) {
        try {
            if (typeof data === "string") this.storage.setItem(this.key, data);
            this.storage.setItem(this.key, JSON.stringify(data));
        } catch (e) {
            console.error(e);
        }
    }
    get() {
        try {
            const r = this.storage.getItem(this.key);
            if (r) return JSON.parse(r);
            return null;
        } catch (e) {
            console.error(e);
        }
    }
    del() {
        try {
            this.storage.removeItem(this.key);
        } catch (e) {
            console.error(e);
        }
    }
    clear() {
        this.storage.clear();
    }
}
