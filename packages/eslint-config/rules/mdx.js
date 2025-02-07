const mdxConfig = {
  plugins: ['unused-imports'],
  files: ['*.mdx'],
  parser: 'eslint-mdx',
  rules: {
    'react/jsx-filename-extension': 'on',
    'react/no-unescaped-entities': 'off',
    'react/react-in-jsx-scope': 'off',
    'unused-imports/no-unused-imports': 'error',
  },
};

module.exports = {
  overrides: [mdxConfig],
};
