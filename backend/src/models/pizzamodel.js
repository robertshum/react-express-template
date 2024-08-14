import { readFile, writeFile } from './dbStorage.js';

class Pizza {
  constructor({ name, quantity, available }) {
    this.name = name;
    this.quantity = quantity;
    this.available = available;
  }

  static async findAll() {
    const data = await readFile();
    return data.pizzas;
  }

  static async findOne(query) {
    const data = await readFile();
    const foundPizza = data.pizzas.find(pizza => Object.keys(query).every(key => pizza[key] === query[key])) || null;
    return foundPizza;
  }

  static async deleteOne(query) {
    const data = await readFile();

    const oldCount = data.pizzas.length;

    // filter based on query
    // attempts to match kv pair from query
    data.pizzas = data.pizzas.filter(pizza => Object.keys(query).every(key => pizza[key] !== query[key]));

    const newCount = data.pizzas.length;
    
    // only decrement if there are any entries
    if (data.lastPizzaId > 0) {
      data.lastPizzaId = data.lastPizzaId - 1;
    }

    await writeFile(data);
    return oldCount !== newCount;
  }

  static async findOneAndUpdate(idNum, pizza) {
    const data = await readFile();

    // filter based on query
    const existingPizzaIndex = data.pizzas.findIndex(pizza => pizza._id === idNum);

    if (existingPizzaIndex >= 0) {

      // repopulate id
      pizza._id = idNum;
      data.pizzas[existingPizzaIndex] = pizza;
    } else {

      // create ID based on last input
      pizza._id = data.lastPizzaId + 1;
      data.lastPizzaId = data.lastPizzaId + 1;
      data.pizzas.push(pizza);
    }

    await writeFile(data);
    return pizza;
  }

  static async save(pizza) {
    const data = await readFile();
    const existingPizzaIndex = data.pizzas.findIndex(
      p => p.name === pizza.name);

    // if it exists, just update it, but keep the old id
    if (existingPizzaIndex >= 0) {
      pizza._id = data.pizzas[existingPizzaIndex]._id;
      data.pizzas[existingPizzaIndex] = pizza;
    } else {

      // create ID based on last input
      pizza._id = data.lastPizzaId + 1;
      data.lastPizzaId = data.lastPizzaId + 1;
      data.pizzas.push(pizza);
    }
    await writeFile(data);
    return pizza;
  }
}

export default Pizza;
