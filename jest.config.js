module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: ['**/__test__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/{!(index),}.ts'],
  transform: {
    '\\.[jt]s': 'ts-jest'
  },
  extensionsToTreatAsEsm: ['.ts']
};
