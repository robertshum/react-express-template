import { randomBytes } from 'crypto';
import isEmail from 'validator/lib/isEmail.js';
import {
  generatePasswordHash,
  validatePassword,
  isPasswordHash
} from '../utils/password.js';
import { readFile, writeFile } from './dbStorage.js';

const generateRandomToken = () => randomBytes(48).toString('base64').replace(/[+/]/g, '.');

class User {
  constructor({ email, 
    password, 
    name, 
    token, 
    createdAt, 
    lastLoginAt,
    role, 
    isActive }) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.token = token || generateRandomToken();
    this.createdAt = createdAt || new Date();
    this.lastLoginAt = lastLoginAt || new Date();
    this.role = role || 0;
    this.isActive = isActive !== undefined ? isActive : true;
  }

  toJSON() {
    const { password, ...user } = this;
    return user;
  }

  async setPassword(password) {
    this.password = await generatePasswordHash(password);
  }

  regenerateToken() {
    this.token = generateRandomToken();
  }

  static async findAll() {
    const data = await readFile();
    return data.users;
  }

  static async findOne(query) {
    const data = await readFile();
    const user = data.users.find(user => Object.keys(query).every(key => user[key] === query[key])) || null;

    // We do not have ability to create user atm, so generate a new token once when searching for the first time (to mimic user creation)
    // user.token = generateRandomToken();

    return user;
  }

  // currently not used.  Need to increment and use id correctly
  static async save(user) {
    const data = await readFile();
    const existingUserIndex = data.users.findIndex(u => u.email === user.email);
    if (existingUserIndex >= 0) {
      data.users[existingUserIndex] = user;
    } else {
      data.users.push(user);
    }
    await writeFile(data);
    return user;
  }

  // returns the user with the matching email, password
  // new user has updated lastLogin date
  static async authenticateWithPassword(email, password) {
    const user = await this.findOne({ email });
    
    if (!user) return null;

    const passwordValid = await validatePassword(password, user.password);
    if (!passwordValid) return null;

    user.lastLoginAt = new Date();
    await this.save(user);

    return user;
  }

  static async authenticateWithToken(token) {
    return await this.findOne({ token });
  }
}

export default User;
