export function createId(): string {
    let internalCounter = 0;

    // 1. Static Prefix
    const prefix = 'c';

    // 2. Timestamp: Base-36 timestamp padded/sliced to exactly 8 characters
    const timestamp = Date.now().toString(36).padEnd(8, '0').slice(-8);

    // 3. Counter: Rolling counter converted to base-36, padded to 4 characters
    internalCounter = (internalCounter + 1) % 1679616; // 1679616 is 36^4 (max 4-digit base36)
    const counter = internalCounter.toString(36).padStart(4, '0');

    // 4. Fingerprint: Hardcoded or derived host block (4 characters)
    // '9999' or a pseudo pid-based string mimics the system host block safely
    const fingerprint = 'judo'; 

    // 5. Random Block: Generated using standard math/entropy to fill 8 characters
    const generateRandomBlock = (length: number): string => {
        let result = '';
        while (result.length < length) {
        result += Math.random().toString(36).substring(2);
        }
        return result.slice(0, length);
    };
    const randomBlock = generateRandomBlock(8);

    // 6. Assemble the legacy structure (Total: 25 characters)
    return `${prefix}${timestamp}${counter}${fingerprint}${randomBlock}`.toLowerCase();
}