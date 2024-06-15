module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/tests/mocks/files.js',
    '\\.svg$': '<rootDir>/src/tests/mocks/svg.js',
    '\\.css$': '<rootDir>/src/tests/mocks/styles.js',
  },
<<<<<<< HEAD
=======
  collectCoverage: true,
  collectCoverageFrom: ['./src/components/**', './src/reducers/**', './src/lib/**', './src/hooks/**'],
  verbose: true,
>>>>>>> main
};
