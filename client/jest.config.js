globalThis.ngJest = {
  skipNgcc: true,
  tsconfig: 'tsconfig.spec.json', // this is the project root tsconfig
};

/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest', // Only transform .ts files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!flat)/', // Exclude modules except 'flat' from transformation
  ],
  moduleDirectories: ['node_modules', 'src'],
  fakeTimers: {
    enableGlobally: true,
  },
  moduleNameMapper: {
    '@components': '<rootDir>/src/app/components/$1',
    '@directives': '<rootDir>/src/app/directives/$1',
    '@environment': '<rootDir>/src/environments/$1',
    '@services': '<rootDir>/src/app/services/$1',
    '@types': '<rootDir>/src/app/types/$1',
  },
};
