const localExtends = [
  // ugh
  './rules/gamut',
  './rules/jest',
  './rules/mdx',
  './rules/react',
  './rules/typescript',
];

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:jsx-a11y/strict',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    ...localExtends.map(require.resolve),
  ],

  overrides: [
    // TODO: move into mdx
    // Stories generally have empty functions and other syntax shenanigans for code examples
    {
      files: ['*.stories.*'],
      rules: {
        // TODO: investigate requiring people using storybook actions?
        '@typescript-eslint/no-empty-function': 'off',
      },
    },
  ],

  // pluginsProvidingAdditionalRules
  // "these are now available to you"
  plugins: ['import', 'simple-import-sort'],

  rules: {
    // These off-by-default or configurable rules are good and we like having them on
    '@typescript-eslint/array-type': 'error',
    eqeqeq: 'error',
    'no-console': 'error',
    'no-eval': 'error',
    'no-global-assign': 'error',
    'prefer-destructuring': [
      'error',
      {
        object: true,
        array: false,
      },
    ],
    'prefer-promise-reject-errors': 'error',
    'simple-import-sort/imports': 'error',

    // These functional rules are annoying and we generally don't want them on
    // Note that these are only the rules we don't want in *any* consuming repository
    // Rules to be temporarily disabled for convenience should be done so in those repositories
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-type-alias': 'off',
    '@typescript-eslint/typedef': 'off',
    'arrow-body-style': 'off',
    camelcase: 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    'func-names': 'off',
    'global-require': 'off',
    'import/export': 'off',
    'import/extensions': 'off',
    'import/no-default-export': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'lines-between-class-members': 'off',
    'max-classes-per-file': 'off',
    'no-bitwise': 'off',
    'no-case-declarations': 'off',
    'no-continue': 'off',
    'no-empty': 'off',
    'no-fallthrough': 'off',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'no-multi-assign': 'off',
    'no-restricted-syntax': 'off',
    'no-return-assign': 'off',
    'no-return-await': 'off',
    'no-shadow': 'off',
    'no-sparse-arrays': 'off',
    'no-template-curly-in-string': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'prefer-template': 'off',
    strict: 'off',
  },

  settings: {
    react: {
      version: 'detect',
    },
  },
};
