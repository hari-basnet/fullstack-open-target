import globals from 'globals';
import pluginJs from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  {
    files: ['**/*.js', '**/*.mjs'], // Include both .js and .mjs files
    languageOptions: {
      sourceType: 'commonjs', // Use 'module' for ES modules
      globals: {
        ...globals.browser, // Add browser globals
      },
    },
    plugins: {
      prettier: prettierPlugin, // Add Prettier plugin
    },
    rules: {
      ...prettierConfig.rules, // Disable conflicting ESLint rules
      'prettier/prettier': 'error', // Run Prettier as an ESLint rule
      'no-undef': 'error',
      'no-unused-vars': [
        'error',
        {
          vars: 'all', // Check all variables
          args: 'after-used', // Check arguments after the last used argument
          ignoreRestSiblings: true, // Ignore rest siblings in destructuring
          argsIgnorePattern: '^_', // Ignore variables starting with _
          varsIgnorePattern: '^_', // Ignore variables starting with _
        },
      ],
      quotes: ['error', 'single'], // Enforce single quotes
      'max-len': ['error', { code: 120 }], // Enforce max line length
    },
  },
  pluginJs.configs.recommended, // Add recommended rules from @eslint/js
];
