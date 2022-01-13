const path = require('path');

module.exports = (packageName) => ({
  clearMocks: true,
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'ts', 'tsx', 'd.ts'],
  transform: {
    '\\.(j|t)sx?$': [
      'babel-jest',
      {
        configFile: require.resolve(path.join(__dirname, './babel.config.js')),
      },
    ],
  },
  transformIgnorePatterns: ['./disable-transform-ignoring-for-node_modules'],
  testRegex: `packages\\/${packageName}\\/.+(\\.|-)test\\.[jt]sx?$`,
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleDirectories: ['node_modules'],
  collectCoverageFrom: ['<rootDir>/**/*.{js,jsx,ts,tsx}'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/../../script/jest/fileMock',
    '\\.(css|scss)$': '<rootDir>/../../script/jest/styleMock',
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/stories/',
    '/vendor/',
    '/dist/',
    '/tmp/',
    '/example/',
    '/typings/',
  ],
  reporters: process.env.CI ? ['default', 'jest-junit'] : ['default'],
  coverageReporters: ['json', 'text', 'clover'],
  coverageDirectory: process.env.CI ? '/tmp/test-results/jest' : './coverage',
  collectCoverage: !!process.env.CI,
});