// AES Encryption algorithm
class SecurityUtil {
    static async encryptData(data, key) {
        const encoder = new TextEncoder();
        const encodedData = encoder.encode(data);
        
        const cryptoKey = await window.crypto.subtle.importKey(
            "raw",
            encoder.encode(key),
            { name: "AES-GCM" },
            false,
            ["encrypt"]
        );
        
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const encryptedData = await window.crypto.subtle.encrypt(
            { name: "AES-GCM", iv: iv },
            cryptoKey,
            encodedData
        );
        
        return {
            data: Array.from(new Uint8Array(encryptedData)),
            iv: Array.from(iv)
        };
    }

    static async decryptData(encryptedData, key, iv) {
        const cryptoKey = await window.crypto.subtle.importKey(
            "raw",
            new TextEncoder().encode(key),
            { name: "AES-GCM" },
            false,
            ["decrypt"]
        );
        
        const decryptedData = await window.crypto.subtle.decrypt(
            { name: "AES-GCM", iv: new Uint8Array(iv) },
            cryptoKey,
            new Uint8Array(encryptedData)
        );
        
        return new TextDecoder().decode(decryptedData);
    }
} 