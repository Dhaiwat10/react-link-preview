const rules = {
  ON: 2,
  OFF: 0,
  WARN: 1,
};

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['react-hooks'],
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier/@typescript-eslint',
    'eslint-config-prettier',
  ],
  rules: {
    '@typescript-eslint/camelcase': rules.OFF,
    '@typescript-eslint/explicit-function-return-type': rules.OFF,
    '@typescript-eslint/explicit-member-accessibility': rules.OFF,
    '@typescript-eslint/no-non-null-assertion': rules.OFF,
    '@typescript-eslint/no-unused-vars': rules.OFF,
    '@typescript-eslint/array-type': rules.OFF,
    '@typescript-eslint/no-explicit-any': rules.OFF,
    '@typescript-eslint/no-empty-interface': rules.OFF,
    '@typescript-eslint/no-empty-function': rules.OFF,
    '@typescript-eslint/no-use-before-define': rules.OFF,
    '@typescript-eslint/no-object-literal-type-assertion': rules.OFF,
    'react/no-deprecated': rules.OFF,
    'react/prop-types': rules.OFF,
    'react-hooks/rules-of-hooks': rules.ON,
    'react-hooks/exhaustive-deps': rules.WARN,
    'prefer-spread': rules.WARN,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
