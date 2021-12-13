module.exports = {
  overrides: [
    {
      files: ['*.js'],
      rules: {
        // Alas, awe cannot use ES modules yet in all tooling as of 2021
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
