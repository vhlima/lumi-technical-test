import type {Config} from 'jest';

const config: Config = {
  rootDir: './',
  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
  ],
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};

export default config;