import { UserClickData } from '@codecademy/tracking';

import { trackUserClick } from '../libs/eventTracking';

export const trackClick = (
  target: string,
  trackingData?: Omit<UserClickData, 'target'>
) => {
  if (trackingData) {
    return trackUserClick({
      ...trackingData,
      target,
    });
  }

  trackUserClick({
    target,
  });
};
