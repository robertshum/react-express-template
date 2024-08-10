export default {
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
