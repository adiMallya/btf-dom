class MemCache {
    constructor() {
        this.cache = null;
    }

    has(data) {
        return JSON.stringify(data) === JSON.stringify(this.cache);
    }

    set(data) {
        this.cache = data;
    }

    clear() {
        this.cache = null;
    }
}

export default MemCache;