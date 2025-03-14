class CacheManager {
    constructor(maxSize = 100) {
        this.cache = new Map();
        this.maxSize = maxSize;
    }

    // LRU (Least Recently Used) Caching algorithm
    set(key, value, ttl = 3600000) { // Default TTL: 1 hour
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }

        this.cache.set(key, {
            value,
            timestamp: Date.now(),
            ttl
        });
    }

    get(key) {
        const data = this.cache.get(key);
        if (!data) return null;

        if (Date.now() - data.timestamp > data.ttl) {
            this.cache.delete(key);
            return null;
        }

        return data.value;
    }

    clear() {
        this.cache.clear();
    }
} 