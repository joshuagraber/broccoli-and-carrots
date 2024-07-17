module.exports = {
  roots: ['<rootDir>'],
  testEnvironment: 'node',
  preset: 'ts-jest',
  testMatch: ['**/__test__/**/*.+(ts|js)', '**/?(*.)+(spec|test).+(ts|js)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  // globals: {
  //   'ts-jest': {
  //     tsconfig: 'tsconfig.json'
  //   }
  // },
  // // collectCoverage: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/{!(index),}.ts'],
  transform: {
    '\\.[jt]s': 'ts-jest'
  },
  moduleNameMapper: {
    '(.+)\\.js': '$1'
  },
  extensionsToTreatAsEsm: ['.ts']
};
