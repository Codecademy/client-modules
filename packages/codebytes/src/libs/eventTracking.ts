import { createTracker } from '@codecademy/tracking';

const IS_DEV = process.env.NODE_ENV === 'development';

// TODO: confirm tracking details and implementation DISC-447
// the window.location.origin will match what the iframe url is which in forums is https://www.codecademy.com
const tracker = createTracker({
  apiBaseUrl:
    typeof window === undefined
      ? 'https://www.codecademy.com'
      : window.location.origin,
  verbose: IS_DEV,
});

export const {
  click: trackUserClick,
  visit: trackUserVisit,
  impression: trackUserImpression,
} = tracker;
