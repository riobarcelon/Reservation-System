class RateLimiter {
    constructor(maxRequests = 100, timeWindow = 60000) { // Default: 100 requests per minute
        this.requests = new Map();
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
    }

    // Token Bucket algorithm
    isAllowed(clientId) {
        const now = Date.now();
        const clientRequests = this.requests.get(clientId) || [];
        
        // Remove expired timestamps
        const validRequests = clientRequests.filter(
            timestamp => now - timestamp < this.timeWindow
        );

        if (validRequests.length >= this.maxRequests) {
            return false;
        }

        validRequests.push(now);
        this.requests.set(clientId, validRequests);
        return true;
    }
} 