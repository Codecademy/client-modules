import { UserClickData } from '@codecademy/tracking';
import { encode } from 'js-base64';

import { trackUserClick } from '../libs/eventTracking';

export const trackClick = (
  target: string,
  trackingData?: Omit<UserClickData, 'target'>
) => trackUserClick({ ...trackingData, target });

export const getCodebyteUrl = (language: string, text: string) => {
  return `https://codecademy.com/codebyte-editor?lang=${language}&text=${encode(
    text
  )}`;
};
