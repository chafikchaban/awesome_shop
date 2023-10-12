import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from './tsconfig.json';

const esModules: string[] = [
  'react-native',
  '@react-native',
  '@react-native-community',
  '@react-navigation',
];

export default <JestConfigWithTsJest> {
  preset: 'react-native',
  setupFiles: ['<rootDir>/.jest/setup.ts'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>' }),
  transformIgnorePatterns: [`node_modules/(?!${esModules.join('|')})`],
  testMatch: [
    '<rootDir>/src/service/**/*.spec.(ts|tsx)',
    '<rootDir>/src/ui/scenes/**/*.spec.(ts|tsx)',
  ],
  collectCoverageFrom: [
    '<rootDir>/src/service/**/*.(ts|tsx)',
    '<rootDir>/src/ui/scenes/**/*.(ts|tsx)',
  ],
  coverageDirectory: '<rootDir>/.jest/coverage',
};
