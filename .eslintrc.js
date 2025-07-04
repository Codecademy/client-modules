/**
 * @remarks
 * This is the ESLint configuration used *internally* for client-modules.
 * See the eslint-config package for the shared config used in consuming repositories.
 */
module.exports = {
  root: true,

  extends: [require.resolve('./packages/eslint-config')],

  overrides: [
    {
      files: ['**/typings/*', '*.d.ts'],
      rules: {
        '@typescript-eslint/no-namespace': 'off',
      },
    },
    {
      //   // We need to override them here, because as a result of the `extends` command pulling
      //   // in additional plugins, the base rules settings of turning this rules off were NOT
      //   // being respected. By moving them into this override definition, they are properly
      //   // being applied to subsequent plugin imports/extensions. Wild.
      files: ['*.tsx', '*.ts'],
      rules: {
        //     // These rules could be useful, but we haven't gotten around to enabling them here
        //     // See WEB-2 for general tracking.
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/restrict-plus-operands': 'off',
        '@typescript-eslint/restrict-template-expressions': 'off',
      },
    },
  ],
};
