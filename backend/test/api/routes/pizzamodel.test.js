import supertest from 'supertest';
import { jest } from '@jest/globals'; // eslint-disable-line

import app from '../../../src/app.js';
import PizzaModelService from '../../../src/services/pizzamodel.js';
import UserService from '../../../src/services/user.js';

jest.mock('../../../src/services/pizzamodel.js');
jest.mock('../../../src/services/user.js');

UserService.authenticateWithToken = jest.fn().mockResolvedValue({ email: 'test@example.com' });

describe('/api/v1/pizza-model/', () => {
  test('anonymous requests are blocked', async () => {
    const req = supertest(app);
    const res = await req.get('/api/v1/pizza-model');
    expect(res.status).toBe(401);
  });

  test('GET lists all the models', async () => {
    const data = [{ name: 'First' }, { name: 'Second' }];
    PizzaModelService.list = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get('/api/v1/pizza-model')
      .set('Authorization', 'token abc');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(data);
    expect(PizzaModelService.list).toHaveBeenCalled();
  });

  test('POST creates a new PizzaModel', async () => {
    const data = {
      name: 'test',
      quantity: 42,
      available: true,
    };

    PizzaModelService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post('/api/v1/pizza-model')
      .set('Authorization', 'token abc')
      .send(data);

    expect(res.body).toEqual(data);
    expect(res.status).toBe(201);
    expect(PizzaModelService.create).toHaveBeenCalledWith(data);
  });

  test('creating a new PizzaModel without required attributes fails', async () => {
    const data = {};

    PizzaModelService.create = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .post('/api/v1/pizza-model')
      .set('Authorization', 'token abc')
      .send(data);

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
    expect(PizzaModelService.create).not.toHaveBeenCalled();
  });
});

describe('/api/v1/pizza-model/:id', () => {
  test('getting a single result succeeds for authorized user', async () => {
    const data = { email: 'test@example.com' };
    PizzaModelService.get = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/pizza-model/123`)
      .set('Authorization', 'token abc');

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(PizzaModelService.get).toHaveBeenCalledWith('123');
  });

  test('getting a single result fails for anonymous user', async () => {
    const req = supertest(app);
    const res = await req.get('/api/v1/pizza-model/123');
    expect(res.status).toBe(401);
  });

  test('request for nonexistent object returns 404', async () => {
    const id = '123';
    PizzaModelService.get = jest.fn().mockResolvedValue(null);
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/pizza-model/${id}`)
      .set('Authorization', 'token abc');

    expect(res.status).toBe(404);
    expect(PizzaModelService.get).toHaveBeenCalled();
  });

  test('request with incorrectly-formatted ObjectId fails', async () => {
    PizzaModelService.get = jest.fn();
    const req = supertest(app);

    const res = await req
      .get(`/api/v1/pizza-model/bogus`)
      .set('Authorization', 'token abc');

    expect(res.status).toBe(400);
    expect(PizzaModelService.get).not.toHaveBeenCalled();
  });

  test('PizzaModel update', async () => {
    const data = {
      name: 'test',
      quantity: 42,
      available: true,
    };
    PizzaModelService.update = jest.fn().mockResolvedValue(data);
    const req = supertest(app);

    const res = await req
      .put(`/api/v1/pizza-model/123`)
      .send(data)
      .set('Authorization', 'token abc');

    expect(res.body).toEqual(data);
    expect(res.status).toBe(200);
    expect(PizzaModelService.update).toHaveBeenCalledWith('123', data);
  });

  test('PizzaModel deletion', async () => {
    PizzaModelService.delete = jest.fn().mockResolvedValue(true);
    const req = supertest(app);

    const res = await req
      .delete(`/api/v1/pizza-model/123`)
      .set('Authorization', 'token abc');

    expect(res.status).toBe(204);
    expect(PizzaModelService.delete).toHaveBeenCalledWith('123');
  });
});
