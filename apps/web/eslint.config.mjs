import js from '@eslint/js';

export default [
  {
    ignores: ['.next/**', 'node_modules/**'],
  },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        module: 'readonly',
        process: 'readonly',
      },
    },
    rules: {},
  },
];
