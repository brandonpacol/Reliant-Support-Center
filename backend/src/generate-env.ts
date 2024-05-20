import { randomBytes } from 'crypto';
import { writeFileSync } from 'fs';
import { join } from 'path';

// Generate a random session secret
const sessionSecret = randomBytes(64).toString('hex');

// Write to env file
const envFilePath = join(__dirname, '.env');
const envContent = `SESSION_SECRET=${sessionSecret}\n`;
writeFileSync(envFilePath, envContent, { flag: 'w' });

console.log("Successfully generated .env file");
