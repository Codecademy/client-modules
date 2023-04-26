import { INpmConfig } from '@auto-it/npm';
import { AutoRc } from 'auto';

const npmOptions: INpmConfig = {
  exact: true,
};

/** Auto configuration */
export default function rc(): AutoRc {
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
}
