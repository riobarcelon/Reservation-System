class CompressionUtil {
    // Run-Length Encoding algorithm
    static compress(data) {
        let compressed = '';
        let count = 1;
        let current = data[0];

        for (let i = 1; i < data.length; i++) {
            if (data[i] === current) {
                count++;
            } else {
                compressed += count + current;
                current = data[i];
                count = 1;
            }
        }
        compressed += count + current;
        return compressed;
    }

    static decompress(data) {
        let decompressed = '';
        for (let i = 0; i < data.length; i += 2) {
            const count = parseInt(data[i]);
            const char = data[i + 1];
            decompressed += char.repeat(count);
        }
        return decompressed;
    }
} 