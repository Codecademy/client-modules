module.exports = {
  overrides: [
    {
      files: [
        '*.tsx',
      ],
      plugins: ['jsx-a11y', 'react', 'react-hooks'],
      rules: {
        'react-hooks/exhaustive-deps': 'error',
        'react-hooks/rules-of-hooks': 'error',
        'react/button-has-type': 'error',
        'react/no-access-state-in-setstate': 'error',
        'react/no-array-index-key': 'error',
        'react/no-danger': 'error',
        'react/no-unused-state': 'error',
        'react/destructuring-assignment': 'off',
        'react/jsx-filename-extension': 'off',
        'react/jsx-no-bind': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-pascal-case': 'off',
        'react/jsx-props-no-spreading': 'off',
        'react/prefer-es6-class': 'off',
        'react/require-default-props': 'off',
        'react/sort-comp': 'off',
        'react/state-in-constructor': 'off',
        'react/static-property-placement': 'off',
        'react/style-prop-object': 'off',
      },
    },
  ],
};
