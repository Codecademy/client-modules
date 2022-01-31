const path = require('path');
const { configs } = require('@codecademy/webpack-config');

// https://github.com/storybookjs/storybook/issues/12262#issuecomment-681953346
// make a shallow copy of an object, rejecting keys that match /emotion/
function emotionless<T extends Record<string, unknown>>(object: T) {
  let result = {} as T;
  for (let key in object) {
    if (!/emotion/.test(key)) {
      result[key] = object[key];
    }
  }
  return result;
}

module.exports = {
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    'storybook-addon-designs',
  ],
  stories: ['../stories/**/*.stories.mdx'],
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
    },
  },

  webpackFinal: (config: any) => {
    const commonRules = configs.css().module.rules; /* Codecademy configs */
    config.module.rules = config.module.rules.concat([
      { ...commonRules[0], include: [/node_modules\/@codecademy/] },
      commonRules[1],
    ]);

    config.resolve = {
      ...config.resolve,
      alias: emotionless(config.resolve.alias),
    };

    return config;
  },
};
