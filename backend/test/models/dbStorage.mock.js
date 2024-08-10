import fs from 'fs/promises';
import path from 'path';

/**
 * MOCK CLASS FOR TESTING - see dbStorage.js
 */
// Manually set __filename and __dirname for this mock
const __filename = __filename || path.resolve('test/models/dbStorage.mock.js');
const __dirname = __dirname || path.dirname(__filename);

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
