/**
 * @remarks Ensures that typescript-eslint's type checking only runs on TypeScript files.
 */
module.exports = {
  overrides: [
    {
      extends: [
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      files: ['*.ts', '*.tsx'],
      parser: require.resolve('@typescript-eslint/parser'),
      parserOptions: {
        project: './tsconfig.json',
        // sourceType: 'module',
      },

      rules: {
        // These off-by-default or configurable rules are good and we like having them on
        '@typescript-eslint/non-nullable-type-assertion-style': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',

        // These are no longer necessary now that we have TypeScript
        'react/prop-types': 'off',
        'react/default-props-match-prop-types': 'off',
      },
    },
  ],
};
