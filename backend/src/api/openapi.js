import swaggerJsDoc from 'swagger-jsdoc';

import {
  loginSchema,
  changePasswordSchema,
  userSchema
} from './schemas/auth.js';
import pizzaModelSchema from './schemas/pizzamodel.js';

export const definition = {
  openapi: "3.0.0",
  info: {
    title: "Demo Project",
    version: "0.0.1",
    description: "Personal template for FS applications.",
  },
  servers: [
    {
      url: "/api/v1",
      description: "API v1"
    }
  ],
  components: {
    schemas: {
      PizzaModel: pizzaModelSchema,
      loginSchema,
      changePasswordSchema,
      User: userSchema,
    },
    securitySchemes: {
      BearerAuth: {
        type: "http",
        description: "Simple bearer token",
        scheme: "bearer",
        bearerFormat: "simple"
      }
    },
  },
};

const options = {
  definition,
  apis: ['./src/api/routes/*.js'],
};

const spec = swaggerJsDoc(options);

export default spec;
