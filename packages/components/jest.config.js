/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterFramework: [],
  moduleNameMapper: {
    '\\.scss$': '<rootDir>/src/__mocks__/styleMock.js',
    '^@tokens/(.*)$': '<rootDir>/../tokens/dist/$1',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        jsx: 'react-jsx',
        strict: true,
        esModuleInterop: true,
        allowSyntheticDefaultImports: true,
      },
    }],
  },
  testMatch: [
    '**/*.test.ts',
    '**/*.test.tsx',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/__mocks__/**',
    '!src/index.ts',
  ],
  coverageThreshold: {
    global: { branches: 60, functions: 65, lines: 70, statements: 70 },
  },
};
