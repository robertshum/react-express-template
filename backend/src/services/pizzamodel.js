import PizzaModel from '../models/pizzamodel.js';
import DatabaseError from '../models/error.js';

class PizzaModelService {
  static async list() {
    try {
      return PizzaModel.findAll();
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async get(id) {
    try {
      const idNum = Number(id);
      return await PizzaModel.findOne({ _id: idNum });
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async create(data) {
    try {
      const obj = new PizzaModel(data);
      await PizzaModel.save(obj);
      return obj;
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async update(id, data) {
    try {
      const idNum = Number(id);
      return await PizzaModel.findOneAndUpdate(idNum, data);
    } catch (err) {
      throw new DatabaseError(err);
    }
  }

  static async delete(id) {
    try {
      const idNum = Number(id);
      const result = await PizzaModel.deleteOne({ _id: idNum });
      return (result);
    } catch (err) {
      throw new DatabaseError(err);
    }
  }
}

export default PizzaModelService;
