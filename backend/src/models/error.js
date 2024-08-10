class DatabaseError extends Error {
  constructor(error) {
    super(error.message || 'Database error');
    this.code = error.code || 'DatabaseError';
    this.details = error.details || [];
  }

  isClientError() {
    return this.code === 'ValidationError';
  }
}

export default DatabaseError;
