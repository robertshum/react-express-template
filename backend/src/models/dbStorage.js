import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Temporary in-memory DB for quick prototyping
// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'db.json');

const readFile = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return { users: [], pizzas: [] };
    }
    throw error;
  }
};

const writeFile = async (data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    throw error;
  }
};

export { readFile, writeFile };
