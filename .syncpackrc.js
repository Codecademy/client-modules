// @ts-check

/**
 * Syncpack configuration file
 * Controls version management and package.json formatting across the monorepo
 * @see https://github.com/JamieMason/syncpack
 * @type {import("syncpack").RcFile}
 */
const config = {
  /**
   * Glob patterns for package.json files to process
   * Includes root, apps, libs, and tools directories
   */
  source: ['package.json', 'packages/*/package.json'],

  /**
   * Fields to sort alphabetically in package.json
   */
  sortAz: [
    'contributors',
    'dependencies',
    'devDependencies',
    'keywords',
    'peerDependencies',
    'resolutions',
    'scripts',
  ],

  /**
   * Fields that should appear first in package.json, in this order
   */
  sortFirst: ['name', 'description', 'version', 'author'],

  /**
   * Version management rules for different package groups
   */
  versionGroups: [
    {
      /** Ignore version syncing for peer dependencies */
      label: 'ignore peer dependencies',
      packages: ['**'],
      dependencyTypes: ['peer'],
      isIgnored: true,
    },
    // {
    //   /** Align all package versions with those defined in @mono/root */
    //   packages: ['**'],
    //   dependencies: ['**'],
    //   dependencyTypes: ['dev', 'prod', 'overrides', 'resolutions'],
    //   snapTo: ['client-modules'],
    // },
  ],
};

module.exports = config;
