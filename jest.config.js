module.exports = {
  testMatch: ['<rootDir>/test/**/*.test.ts'],
  testEnvironment: 'node',
  clearMocks: true,
  preset: 'ts-jest',
  moduleNameMapper: {
    '@test/(.*)': '<rootDir>/test/$1',
  },
  testTimeout: 40000
};