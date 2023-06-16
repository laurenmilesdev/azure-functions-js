module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  plugins: ['jest', 'promise'],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'plugin:jest/recommended',
    'plugin:promise/recommended',
    'prettier',
  ],
  rules: {
    // Use function hoisting to improve code readability
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    'import/extensions': ['error', 'ignorePackages'],
    'class-methods-use-this': 'off',
    'no-return-await': 'off',
  },
};
