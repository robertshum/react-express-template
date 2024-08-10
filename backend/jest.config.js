// swaps out mock file
// 1 dbStorage uses import.meta.url, because we are using ES modules. (__dirname not available by default)

export default {
  moduleNameMapper: {
      '.*dbStorage.js': '<rootDir>/test/models/dbStorage.mock.js',
  },
}