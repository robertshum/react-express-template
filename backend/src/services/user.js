import { randomBytes } from 'crypto';
import User from '../models/user.js';
import DatabaseError from '../models/error.js';
import { generatePasswordHash, validatePassword } from '../utils/password.js';

// Token generated when user is created, or when a user logs out.
const generateRandomToken = () => randomBytes(48).toString('base64').replace(/[+/]/g, '.');

class UserService {
  static async list() {
    try {
      return User.find();
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      return User.findOne({ _id: id });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, data) {
    try {
      return User.findOneAndUpdate({ _id: id }, data, { new: true, upsert: false });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async delete(id) {
    try {
      const result = await User.deleteOne({ _id: id });
      return (result.deletedCount === 1);
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async authenticateWithPassword(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) return null;

      const passwordValid = await validatePassword(password, user.password);
      if (!passwordValid) return null;

      user.lastLoginAt = Date.now();
      const updatedUser = await User.save(user);
      return updatedUser;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  // returns the user if a token match is found
  static async authenticateWithToken(token) {
    try {
      return User.findOne({ token });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  // currently not used, need to make sure id and count is used and incremented
  static async createUser({ password, ...userData }) {
    const hash = await generatePasswordHash(password);

    try {
      const user = new User({
        ...userData,
        password: hash,
      });

      user = await User.save(user);
      return user;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async setPassword(user, password) {

    try {
      if (user) {
        user.password = await generatePasswordHash(password);
        const updatedUser = await User.save(user);
        return updatedUser;
      }
      return false;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async regenerateToken(user) {

    try {
      if (user) {
        user.token = generateRandomToken(); // eslint-disable-line
        const updatedUser = await User.save(user);
        return updatedUser;
      }
      return false;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default UserService;
