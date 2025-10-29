import { mkdir } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Ensure the reports directory exists before running tests
await mkdir(join(__dirname, '..', 'reports'), { recursive: true });
