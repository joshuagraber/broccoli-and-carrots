module.exports = {
  roots: ['<rootDir>/test'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: ['**/__test__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/{!(b-tree),}.ts'],
  transform: {
    '\\.[jt]s': 'ts-jest'
  },
  moduleNameMapper: {
    '(.+)\\.js': '$1'
  },
  extensionsToTreatAsEsm: ['.ts']
};
