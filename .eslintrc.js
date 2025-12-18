module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['unused-imports'],
  rules: {
    'unused-imports/no-unused-imports': 'error', // automatically remove unused imports
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true, varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-explicit-any': 'off', // temporarily ignore any
    'react-hooks/rules-of-hooks': 'off', // ignore react hook errors
    'react-hooks/exhaustive-deps': 'off', // ignore missing deps warnings
  },
};
