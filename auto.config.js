const npmOptions = {
  exact: true,
};

/** Auto configuration */
module.exports = function rc() {
  return {
    author: 'Release Bot <dev@codecademy.com>',
    baseBranch: 'main',
    plugins: [
      'all-contributors',
      ['npm', npmOptions],
      'released',
      'first-time-contributor',
    ],
  };
};
