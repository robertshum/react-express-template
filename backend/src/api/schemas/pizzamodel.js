export const pizzaModelSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    quantity: { type: 'integer' },
    available: { type: 'boolean' },
  },
  required: [
    'name',
    'quantity',
    'available',
  ],
  additionalProperties: false,
};

export const pizzaArraySchema = {
  type: 'array',
  items: pizzaModelSchema, // Reference the pizzaModelSchema
  minItems: 1, // Optional: Ensure at least one item in the array
};
