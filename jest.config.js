module.exports = {
  preset: 'ts-jest', // This tells Jest to use ts-jest for TypeScript files
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transpile TypeScript files with ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'], // Jest will resolve these file extensions
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignore test files in dist and node_modules
};
