const npmOptions = {
  exact: true,
};

/** Auto configuration */
module.exports = function rc() {
  return {
    author: 'Release Bot <dev@codecademy.com>',
    baseBranch: 'main',
    plugins: [
      [
        'all-contributors',
        {
          exclude: ['dependabot', 'codecademydev'],
        },
      ],
      ['npm', npmOptions],
      [
        'released',
        {
          label: ':shipit:',
        },
      ],
      'first-time-contributor',
    ],
    noDefaultLabels: true,
    labels: [
      {
        name: 'release/major',
        changelogTitle: '💥 Breaking Change',
        description: 'Increment the major version when merged',
        releaseType: 'major',
        color: '#C5000B',
      },
      {
        name: 'release/minor',
        changelogTitle: '🚀 Enhancement',
        description: 'Increment the minor version when merged',
        releaseType: 'minor',
        color: '#F1A60E',
      },
      {
        name: 'release/patch',
        changelogTitle: '🐛 Bug Fix',
        description: 'Increment the patch version when merged',
        releaseType: 'patch',
        color: '#870048',
      },
      {
        name: 'release/skip',
        description: 'Preserve the current version when merged',
        releaseType: 'skip',
        color: '#bf5416',
      },
      {
        name: 'release',
        description: 'Create a release when this pr is merged',
        releaseType: 'release',
        color: '#007f70',
      },
      {
        name: 'release/internal',
        changelogTitle: '🏠 Internal',
        description: 'Changes only affect the internal API',
        releaseType: 'none',
        color: '#696969',
      },
      {
        name: 'release/documentation',
        changelogTitle: '📝 Documentation',
        description: 'Changes only affect the documentation',
        releaseType: 'none',
        color: '#cfd3d7',
      },
      {
        name: 'release/tests',
        changelogTitle: '🧪 Tests',
        description: 'Add or improve existing tests',
        releaseType: 'none',
        color: '#ffd3cc',
      },
      {
        name: 'release/dependencies',
        changelogTitle: '🔩 Dependency Updates',
        description: 'Update one or more dependencies version',
        releaseType: 'patch',
        color: '#8732bc',
      },
      {
        name: 'release/performance',
        changelogTitle: '🏎 Performance',
        description: 'Improve performance of an existing feature',
        releaseType: 'patch',
        color: '#f4b2d8',
      },
    ],
  };
};
