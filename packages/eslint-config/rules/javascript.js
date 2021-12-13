module.exports = {
  overrides: [
    {
      env: {
        browser: true,
        es6: true,
        jest: true,
        node: true,
      },
      files: ['*.js'],
      rules: {
        // Alas, awe cannot use ES modules yet in all tooling as of 2021
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
