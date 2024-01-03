const crypto = require('crypto');

// 1. Hashing Example
const hash = crypto.createHash('sha256');
hash.update('Hello, crypto!');
const hashValue = hash.digest('hex');
console.log('Hash:', hashValue);

// 2. Random Values Example
const randomBytes = crypto.randomBytes(16);
console.log('Random Bytes:', randomBytes.toString('hex'));

// 3. Encryption and Decryption Example
const algorithm = 'aes-256-cbc';
const key = 'mySecretKey';

const cipher = crypto.createCipher(algorithm, key);
let encrypted = cipher.update('Hello, crypto!', 'utf8', 'hex');
encrypted += cipher.final('hex');

const decipher = crypto.createDecipher(algorithm, key);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');

console.log('Encrypted:', encrypted);
console.log('Decrypted:', decrypted);

// 4. HMAC (Hash-based Message Authentication Code) Example
const secretKey = 'mySecretKey';
const data = 'Hello, HMAC!';

const hmac = crypto.createHmac('sha256', secretKey);
const hmacValue = hmac.update(data).digest('hex');

console.log('HMAC:', hmacValue);
