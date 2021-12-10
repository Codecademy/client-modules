module.exports = {
  overrides: [
    {
      files: [
        '*-test.*',
        '*.spec.*',
        '*.test.*',
        '**/__fixtures__/*',
        '**/__tests__/*',
      ],
      plugins: ['no-only-tests', 'jest', 'jest-react'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],
        'no-only-tests/no-only-tests': 'error',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/require-await': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/unbound-method': 'off',
      },
    },
  ],
};
