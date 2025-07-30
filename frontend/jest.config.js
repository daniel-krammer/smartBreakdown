module.exports = {
  preset: 'jest-preset-angular',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'html', 'js', 'json'],
  moduleNameMapper: {
    'shared/(.*)': '<rootDir>/../shared/$1',
  } 
};