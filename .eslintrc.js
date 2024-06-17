module.exports = {
  extends: 'airbnb',
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'react/prop-types': 'off',
    'no-console': 'off',
    'max-len': 'off',
    radix: 'off',
    'react/button-has-type': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'react/jsx-filename-extension': 'off',
    'no-nested-ternary': 'off',
    'no-case-declarations': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-no-useless-fragment': 'off',
  },
};
